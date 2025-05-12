type Programs = {
  gradient?: WebGLProgram | null;
  circle?: WebGLProgram | null;
  blur?: WebGLProgram | null;
  flowField?: WebGLProgram | null;
  grain?: WebGLProgram | null;
};

// Global WebGL variables
let gl: WebGL2RenderingContext;
let canvas: HTMLCanvasElement | null;
let programs: Programs = {};
let fbos: Record<string, { fbo: WebGLFramebuffer; texture: WebGLTexture }> = {};
let quadBuffer: WebGLBuffer;
let time = 0;
let mousePos = { x: 0.5, y: 0.5 }; // Actual mouse position
let animatedMousePos = { x: 0.5, y: 0.5 }; // Smoothed mouse position for animation
let resolution = { x: window.innerWidth, y: window.innerHeight };
let hasFloatLinear = false; // To check float texture filtering support
let initialCircleCenter1 = { x: 0.3324, y: 1.0 - 0.7567 }; // Default positions
let initialCircleCenter2 = { x: 0.6652, y: 1.0 - 0.3113 };
let enableGrain = false; // Set to false to disable the grain/noise effect for better performance

const isReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;
const timeMultiplier = isReducedMotion ? 0 : 1;

// --- Shader Sources (Unchanged GLSL code from high-quality version) ---

// Layer 1: Gradient VS/FS
const gradientVS = `#version 300 es
    precision mediump float;
    in vec3 aVertexPosition;
    uniform mat4 uMVMatrix;
    uniform mat4 uPMatrix;
    out vec2 vTextureCoord;
    void main() {
        gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
        vTextureCoord = (aVertexPosition.xy + 1.0) * 0.5;
    }`;
const gradientFS = `#version 300 es
    precision highp float;
    in vec2 vTextureCoord;
    uniform float uTime; // Time uniform received from JS (already scaled)
    uniform vec2 uMousePos;
    uniform vec2 uResolution;
    vec3 colors[4];
    float rand(vec2 co) { return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453); }
    vec3 linear_from_srgb(vec3 rgb) { return pow(rgb, vec3(2.2)); }
    vec3 srgb_from_linear(vec3 lin) { return pow(lin, vec3(1.0/2.2)); }
    vec3 oklab_mix(vec3 lin1, vec3 lin2, float a) {
        const mat3 kCONEtoLMS = mat3( 0.4121656120, 0.2118591070, 0.0883097947, 0.5362752080, 0.6807189584, 0.2818474174, 0.0514575653, 0.1074065790, 0.6302613616);
        const mat3 kLMStoCONE = mat3( 4.0767245293, -1.2681437731, -0.0041119885, -3.3072168827, 2.6093323231, -0.7034763098, 0.2307590544, -0.3411344290, 1.7068625689);
        vec3 lms1 = pow( kCONEtoLMS*lin1, vec3(1.0/3.0) ); vec3 lms2 = pow( kCONEtoLMS*lin2, vec3(1.0/3.0) );
        vec3 lms = mix( lms1, lms2, a ); lms *= 1.0 + 0.025 * a * (1.0-a);
        return kLMStoCONE * (lms * lms * lms);
    }
    vec3 getGradientColor(float position) {
        position = clamp(position, 0.0, 1.0);
        for (int i = 0; i < 3; i++) {
            float colorPosition = float(i) / 3.0; float nextColorPosition = float(i + 1) / 3.0;
            if (position <= nextColorPosition) {
                float mixFactor = (position - colorPosition) / (nextColorPosition - colorPosition);
                vec3 linStart = linear_from_srgb(colors[i]); vec3 linEnd = linear_from_srgb(colors[i + 1]);
                vec3 mixedLin = oklab_mix(linStart, linEnd, mixFactor); return srgb_from_linear(mixedLin);
            }
        } return colors[3];
    }
    out vec4 fragColor;
    void main() {
        colors[0] = vec3(0.0078, 0.2039, 0.0745); colors[1] = vec3(0.5411, 0.0196, 0.8588);
        colors[2] = vec3(0.8705, 0.2156, 0.8000); colors[3] = vec3(0.9058, 0.9333, 0.6156);
        vec2 uv = vTextureCoord;
        float position = uv.x;
        // Apply animation speed based on received uTime (which is already scaled in JS)
        // Original speed factor from JSON was 0.01 * 0.25 = 0.0025
        position -= (uTime * 0.0025); // This uses the scaled time from JS
        float cycle = floor(position); bool reverse = int(cycle) % 2 == 0;
        float animatedPos = reverse ? 1.0 - fract(position) : fract(position);
        vec3 color = getGradientColor(animatedPos);
        float dither = rand(gl_FragCoord.xy * uTime) * (1.0/255.0) * 0.2; color += dither;
        fragColor = vec4(color, 1.0);
    }`;

// Layer 2 & 3: Circles VS/FS
const circleVS = `#version 300 es
    precision mediump float;
    in vec3 aVertexPosition;
    uniform mat4 uMVMatrix;
    uniform mat4 uPMatrix;
    uniform vec2 uMousePos; // This will receive the *animated* mouse pos
    out vec2 vTextureCoord;
    void main() {
        gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
        vTextureCoord = (aVertexPosition.xy + 1.0) * 0.5;
    }`;
const circleFS = `#version 300 es
    precision mediump float;
    in vec2 vTextureCoord;
    uniform vec2 uResolution;
    uniform vec2 uMousePos; // Receives the *animated* mouse pos
    uniform sampler2D uPreviousLayerTexture;
    uniform vec3 uFillColor;
    uniform float uTrackMouse;
    uniform float uCircleRadius;
    uniform vec2 uCircleCenter; // Base center (randomized on load)
    vec3 blendOverlay(vec3 base, vec3 blend) {
        return vec3(
            (base.x <= 0.5) ? (2.0 * base.x * blend.x) : (1.0 - 2.0 * (1.0 - base.x) * (1.0 - blend.x)),
            (base.y <= 0.5) ? (2.0 * base.y * blend.y) : (1.0 - 2.0 * (1.0 - base.y) * (1.0 - blend.y)),
            (base.z <= 0.5) ? (2.0 * base.z * blend.z) : (1.0 - 2.0 * (1.0 - base.z) * (1.0 - blend.z))
        );
    }
    out vec4 fragColor;
    void main() {
        vec2 uv = vTextureCoord;
        // Use the animated mouse position passed via uniform
        vec2 mouseOffset = (uMousePos - 0.5) * uTrackMouse;
        vec2 effectiveCenter = uCircleCenter - mouseOffset; // Apply offset to base center
        float dist = distance(uv, effectiveCenter);
        float edgeSoftness = 0.01 * (0.5 / uCircleRadius);
        float circleMask = smoothstep(uCircleRadius, uCircleRadius - edgeSoftness, dist);
        vec3 shapeCol = uFillColor * circleMask;
        vec4 previousColor = texture(uPreviousLayerTexture, vTextureCoord);
        vec3 blendedColor = blendOverlay(previousColor.rgb, shapeCol);
        fragColor = vec4(mix(previousColor.rgb, blendedColor, circleMask), previousColor.a);
    }`;

// Layer 4: Blur VS/FS
const blurVS = `#version 300 es
    precision mediump float;
    in vec3 aVertexPosition;
    uniform mat4 uMVMatrix;
    uniform mat4 uPMatrix;
    out vec2 vTextureCoord;
    void main() {
        gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
        vTextureCoord = (aVertexPosition.xy + 1.0) * 0.5;
    }`;
const blurFS = `#version 300 es
    precision highp float;
    in vec2 vTextureCoord;
    uniform sampler2D uTexture;
    uniform vec2 uResolution;
    uniform float uBlurAmount;
    uniform vec2 uBlurDirection;
    const int KERNEL_RADIUS = 7;
    float weights[KERNEL_RADIUS + 1] = float[](
        0.199471, 0.176033, 0.120985, 0.064759, 0.027099, 0.008764, 0.002198, 0.000421
    );
    out vec4 fragColor;
    void main() {
        vec2 texelSize = 1.0 / uResolution;
        vec4 result = texture(uTexture, vTextureCoord) * weights[0];
        for (int i = 1; i <= KERNEL_RADIUS; ++i) {
            float weight = weights[i];
            vec2 offset = uBlurDirection * float(i) * texelSize * uBlurAmount;
            result += texture(uTexture, vTextureCoord + offset) * weight;
            result += texture(uTexture, vTextureCoord - offset) * weight;
        }
        fragColor = result;
    }`;

// Layer 5: Flow Field VS/FS
const flowFieldVS = blurVS;
const flowFieldFS = `#version 300 es
    precision highp float;
    in vec2 vTextureCoord;
    uniform sampler2D uTexture;
    uniform float uTime; // Time uniform received from JS (already scaled)
    uniform vec2 uMousePos;
    uniform vec2 uResolution;
    vec3 hash33(vec3 p3) {
        p3 = fract(p3 * vec3(0.1031, 0.11369, 0.13787));
        p3 += dot(p3, p3.yxz + 19.19);
        return -1.0 + 2.0 * fract(vec3( (p3.x + p3.y) * p3.z, (p3.x + p3.z) * p3.y, (p3.y + p3.z) * p3.x ));
     }
    float perlin_noise(vec3 p) {
         vec3 pi = floor(p); vec3 pf = p - pi;
        vec3 w = pf * pf * (3.0 - 2.0 * pf);
        float n000 = dot(pf-vec3(0.,0.,0.), hash33(pi+vec3(0.,0.,0.))); float n100 = dot(pf-vec3(1.,0.,0.), hash33(pi+vec3(1.,0.,0.)));
        float n010 = dot(pf-vec3(0.,1.,0.), hash33(pi+vec3(0.,1.,0.))); float n110 = dot(pf-vec3(1.,1.,0.), hash33(pi+vec3(1.,1.,0.)));
        float n001 = dot(pf-vec3(0.,0.,1.), hash33(pi+vec3(0.,0.,1.))); float n101 = dot(pf-vec3(1.,0.,1.), hash33(pi+vec3(1.,0.,1.)));
        float n011 = dot(pf-vec3(0.,1.,1.), hash33(pi+vec3(0.,1.,1.))); float n111 = dot(pf-vec3(1.,1.,1.), hash33(pi+vec3(1.,1.,1.)));
        float nx00 = mix(n000, n100, w.x); float nx01 = mix(n001, n101, w.x);
        float nx10 = mix(n010, n110, w.x); float nx11 = mix(n011, n111, w.x);
        float nxy0 = mix(nx00, nx10, w.y); float nxy1 = mix(nx01, nx11, w.y);
        return mix(nxy0, nxy1, w.z);
    }
    const float MAX_ITERATIONS = 24.;
    vec2 flow(in vec2 st) {
        float aspectRatio = uResolution.x / uResolution.y;
        float sprd = (0.2100 + 0.01) / ((aspectRatio + 1.) / 2.);
        float amt = 0.5900 * 0.006;
        if(amt <= 0.) return st;
        vec2 current_st = st;
        for (float i = 0.; i < MAX_ITERATIONS; i++) {
            vec2 scaled_uv = (current_st - 0.5) * vec2(aspectRatio, 1.0);
            // Use uTime directly as it's pre-scaled in JS
            float noise_val = perlin_noise(vec3(scaled_uv * (5. * sprd), 0.0100*5. + uTime)) - 0.5;
            float ang = (noise_val * (360. * (0.5000 * 6.))) * 3.1415926535 / 180.;
            current_st += vec2(cos(ang), sin(ang)) * amt;
            current_st = clamp(current_st, 0., 1.);
        } return current_st;
    }
    out vec4 fragColor;
    void main() {
        vec2 uv = vTextureCoord;
        vec2 flowed_uv = flow(uv);
        fragColor = texture(uTexture, flowed_uv);
    }`;

// Layer 6: Grain VS/FS
const grainVS = blurVS;
const grainFS = `#version 300 es
    precision highp float;
    in vec2 vTextureCoord;
    uniform sampler2D uTexture;
    uniform float uTime; // Time uniform received from JS (already scaled)
    uniform vec2 uResolution;
    uniform float uGrainAmount;
    uint fibonacciHash(uint x) {
         const uint FIB_HASH = 2654435769u;
        uint hash = x * FIB_HASH;
        hash ^= hash >> 16; hash *= 0x85ebca6bu;
        hash ^= hash >> 13; hash *= 0xc2b2ae35u;
        hash ^= hash >> 16; return hash;
     }
    float randFibo(vec2 xy) {
         uint x_bits = floatBitsToUint(xy.x);
        uint y_bits = floatBitsToUint(xy.y);
        uint y_hash = fibonacciHash(y_bits);
        uint x_xor_y = x_bits ^ y_hash;
        uint final_hash = fibonacciHash(x_xor_y);
        return float(final_hash) / float(0xffffffffu);
     }
    out vec4 fragColor;
    void main() {
        vec2 uv = vTextureCoord;
        vec4 color = texture(uTexture, uv);
        if(color.a == 0.0) { fragColor = vec4(0.0); return; }
        vec2 st = uv * uResolution;
        // Use uTime directly for grain animation speed control
        float delta = fract(uTime);
        float grainValue = randFibo(st + delta) - 0.5;
        color.rgb += grainValue * uGrainAmount;
        fragColor = clamp(color, 0.0, 1.0);
    }`;

// --- WebGL Helper Functions ---

function compileShader(source: string, type: number) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(
      `Error compiling ${
        type === gl.VERTEX_SHADER ? "vertex" : "fragment"
      } shader: ${gl.getShaderInfoLog(shader)}`
    );
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function createProgram(vsSource: string, fsSource: string) {
  const vertexShader = compileShader(vsSource, gl.VERTEX_SHADER);
  const fragmentShader = compileShader(fsSource, gl.FRAGMENT_SHADER);
  if (!vertexShader || !fragmentShader) return null;
  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error(
      "Error linking shader program: " + gl.getProgramInfoLog(program)
    );
    gl.deleteProgram(program);
    return null;
  }
  gl.deleteShader(vertexShader);
  gl.deleteShader(fragmentShader);
  return program;
}

function createFramebuffer(width: number, height: number) {
  if (!gl.getExtension("EXT_color_buffer_float")) {
    console.warn(
      "Floating point textures rendering not supported. Falling back to UNSIGNED_BYTE."
    );
    return createFramebufferUint8(width, height);
  }
  hasFloatLinear = gl.getExtension("OES_texture_float_linear") != null;

  const fbo = gl.createFramebuffer();
  gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texImage2D(
    gl.TEXTURE_2D,
    0,
    gl.RGBA16F,
    width,
    height,
    0,
    gl.RGBA,
    gl.HALF_FLOAT,
    null
  );
  const filter = hasFloatLinear ? gl.LINEAR : gl.NEAREST;
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, filter);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, filter);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_R, gl.CLAMP_TO_EDGE);
  gl.framebufferTexture2D(
    gl.FRAMEBUFFER,
    gl.COLOR_ATTACHMENT0,
    gl.TEXTURE_2D,
    texture,
    0
  );
  if (gl.checkFramebufferStatus(gl.FRAMEBUFFER) !== gl.FRAMEBUFFER_COMPLETE) {
    console.error(
      "RGBA16F Framebuffer incomplete! Status: " +
        gl.checkFramebufferStatus(gl.FRAMEBUFFER)
    );
    gl.deleteTexture(texture);
    gl.deleteFramebuffer(fbo);
    console.warn("Falling back to UNSIGNED_BYTE FBO due to RGBA16F failure.");
    return createFramebufferUint8(width, height);
  }
  gl.bindTexture(gl.TEXTURE_2D, null);
  gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  return { fbo, texture };
}

function createFramebufferUint8(width: number, height: number) {
  const fbo = gl.createFramebuffer();
  gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texImage2D(
    gl.TEXTURE_2D,
    0,
    gl.RGBA,
    width,
    height,
    0,
    gl.RGBA,
    gl.UNSIGNED_BYTE,
    null
  );
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_R, gl.CLAMP_TO_EDGE);
  gl.framebufferTexture2D(
    gl.FRAMEBUFFER,
    gl.COLOR_ATTACHMENT0,
    gl.TEXTURE_2D,
    texture,
    0
  );
  if (gl.checkFramebufferStatus(gl.FRAMEBUFFER) !== gl.FRAMEBUFFER_COMPLETE) {
    console.error("Fallback Framebuffer (UNSIGNED_BYTE) incomplete!");
  }
  gl.bindTexture(gl.TEXTURE_2D, null);
  gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  return { fbo, texture };
}

function createQuadBuffer() {
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  const positions = [
    -1, -1, 0, 1, -1, 0, -1, 1, 0, -1, 1, 0, 1, -1, 0, 1, 1, 0,
  ];
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
  return buffer;
}

function drawQuad(program: WebGLProgram, inputTexture: WebGLTexture) {
  const positionAttributeLocation = gl.getAttribLocation(
    program,
    "aVertexPosition"
  );
  gl.enableVertexAttribArray(positionAttributeLocation);
  gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
  gl.vertexAttribPointer(positionAttributeLocation, 3, gl.FLOAT, false, 0, 0);
  const mvMatrix = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
  const pMatrix = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
  let uMVMatrixLoc = gl.getUniformLocation(program, "uMVMatrix");
  if (uMVMatrixLoc) gl.uniformMatrix4fv(uMVMatrixLoc, false, mvMatrix);
  let uPMatrixLoc = gl.getUniformLocation(program, "uPMatrix");
  if (uPMatrixLoc) gl.uniformMatrix4fv(uPMatrixLoc, false, pMatrix);
  if (inputTexture) {
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, inputTexture);
    const texUniformLoc =
      gl.getUniformLocation(program, "uTexture") ||
      gl.getUniformLocation(program, "uPreviousLayerTexture");
    if (texUniformLoc) gl.uniform1i(texUniformLoc, 0);
  }
  gl.drawArrays(gl.TRIANGLES, 0, 6);
  gl.disableVertexAttribArray(positionAttributeLocation);
}

// Linear interpolation function
function lerp(start: number, end: number, amount: number) {
  return start + (end - start) * amount;
}

// --- Main Setup and Render Loop ---
function setup() {
  canvas = document.getElementById("background-canvas") as HTMLCanvasElement;
  try {
    gl = canvas.getContext("webgl2", {
      antialias: false,
    }) as WebGL2RenderingContext;
  } catch (e) {
    /* ... error handling ... */
    console.error("WebGL 2 not available", e);
    document.body.innerHTML =
      "Sorry, your browser does not support WebGL 2, which is required for this animation.";
    return;
  }
  if (!gl) {
    /* ... error handling ... */
    console.error("WebGL 2 not available");
    document.body.innerHTML =
      "Sorry, your browser does not support WebGL 2, which is required for this animation.";
    return;
  }

  // --- Randomize initial circle positions ---
  // Define bounds to keep circles mostly visible
  const margin = 0.2; // Prevent spawning exactly at the edge
  initialCircleCenter1.x = Math.random() * (1 - 2 * margin) + margin;
  initialCircleCenter1.y = Math.random() * (1 - 2 * margin) + margin;
  initialCircleCenter2.x = Math.random() * (1 - 2 * margin) + margin;
  initialCircleCenter2.y = Math.random() * (1 - 2 * margin) + margin;
  // Ensure initial animated mouse pos matches actual start
  animatedMousePos = { ...mousePos };

  handleResize(); // Set initial size and create FBOs

  programs.gradient = createProgram(gradientVS, gradientFS);
  programs.circle = createProgram(circleVS, circleFS);
  programs.blur = createProgram(blurVS, blurFS);
  programs.flowField = createProgram(flowFieldVS, flowFieldFS);
  programs.grain = createProgram(grainVS, grainFS);

  if (
    !programs.gradient ||
    !programs.circle ||
    !programs.blur ||
    !programs.flowField ||
    !programs.grain
  ) {
    console.error("Failed to create one or more shader programs. Aborting.");
    return;
  }
  quadBuffer = createQuadBuffer();

  window.addEventListener("mousemove", (e) => {
    mousePos.x = e.clientX / window.innerWidth;
    mousePos.y = 1.0 - e.clientY / window.innerHeight;
  });
  window.addEventListener("resize", handleResize);

  renderLoop(0);

  canvas.classList.add("-loaded");
}

function handleResize() {
  if (!canvas) return;
  resolution.x = window.innerWidth;
  resolution.y = window.innerHeight;

  const dpr = window.devicePixelRatio || 1;
  canvas.width = resolution.x * dpr;
  canvas.height = resolution.y * dpr;
  gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
  if (fbos.A) {
    gl.deleteTexture(fbos.A.texture);
    gl.deleteFramebuffer(fbos.A.fbo);
  }
  if (fbos.B) {
    gl.deleteTexture(fbos.B.texture);
    gl.deleteFramebuffer(fbos.B.fbo);
  }
  fbos.A = createFramebuffer(gl.drawingBufferWidth, gl.drawingBufferHeight);
  fbos.B = createFramebuffer(gl.drawingBufferWidth, gl.drawingBufferHeight);
}

let lastTimestamp = 0;
function renderLoop(timestamp: number) {
  time = timestamp * 0.001;
  const deltaTime = time - lastTimestamp; // Calculate time since last frame
  lastTimestamp = time;

  // --- Update animated mouse position ---
  const dampingFactor = 0.05; // Lower value = more sluggishness (honey-like)
  animatedMousePos.x = lerp(animatedMousePos.x, mousePos.x, dampingFactor);
  animatedMousePos.y = lerp(animatedMousePos.y, mousePos.y, dampingFactor);

  if (
    !programs.gradient ||
    !programs.circle ||
    !programs.blur ||
    !programs.flowField ||
    !programs.grain
  ) {
    console.error("Failed to create one or more shader programs. Aborting.");
    return;
  }

  // --- Render Pass 1: Gradient -> FBO A ---
  // Renders the base animated gradient.
  gl.bindFramebuffer(gl.FRAMEBUFFER, fbos.A.fbo);
  gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
  gl.useProgram(programs.gradient);
  gl.uniform1f(
    gl.getUniformLocation(programs.gradient, "uTime"),
    time * 0.1 * timeMultiplier
  );
  gl.uniform2f(
    gl.getUniformLocation(programs.gradient, "uMousePos"),
    mousePos.x,
    mousePos.y
  ); // Gradient doesn't use mouse here
  gl.uniform2f(
    gl.getUniformLocation(programs.gradient, "uResolution"),
    gl.drawingBufferWidth,
    gl.drawingBufferHeight
  );
  // @ts-ignore
  drawQuad(programs.gradient, null);

  // --- Render Pass 2: Circle 1 (Input A -> Output B) ---
  // Renders the first circle, blended over the gradient, using sluggish mouse pos.
  gl.bindFramebuffer(gl.FRAMEBUFFER, fbos.B.fbo);
  gl.useProgram(programs.circle);
  gl.uniform1f(gl.getUniformLocation(programs.circle, "uTime"), time);
  gl.uniform2f(
    gl.getUniformLocation(programs.circle, "uMousePos"),
    animatedMousePos.x,
    animatedMousePos.y
  ); // Use animated pos
  gl.uniform2f(
    gl.getUniformLocation(programs.circle, "uResolution"),
    gl.drawingBufferWidth,
    gl.drawingBufferHeight
  );
  gl.uniform3f(
    gl.getUniformLocation(programs.circle, "uFillColor"),
    0.9019,
    0.7568,
    0.0
  );
  gl.uniform1f(gl.getUniformLocation(programs.circle, "uTrackMouse"), -0.15);
  gl.uniform1f(gl.getUniformLocation(programs.circle, "uCircleRadius"), 0.25);
  gl.uniform2f(
    gl.getUniformLocation(programs.circle, "uCircleCenter"),
    initialCircleCenter1.x,
    initialCircleCenter1.y
  ); // Use randomized start
  drawQuad(programs.circle, fbos.A.texture);

  // --- Render Pass 3: Circle 2 (Input B -> Output A) ---
  // Renders the second circle, blended over previous result, using sluggish mouse pos.
  gl.bindFramebuffer(gl.FRAMEBUFFER, fbos.A.fbo);
  gl.uniform3f(
    gl.getUniformLocation(programs.circle, "uFillColor"),
    0.4196,
    0.8235,
    1.0
  );
  gl.uniform1f(gl.getUniformLocation(programs.circle, "uTrackMouse"), 0.22);
  gl.uniform1f(gl.getUniformLocation(programs.circle, "uCircleRadius"), 0.3);
  gl.uniform2f(
    gl.getUniformLocation(programs.circle, "uCircleCenter"),
    initialCircleCenter2.x,
    initialCircleCenter2.y
  ); // Use randomized start
  gl.uniform2f(
    gl.getUniformLocation(programs.circle, "uMousePos"),
    animatedMousePos.x,
    animatedMousePos.y
  ); // Use animated pos again
  drawQuad(programs.circle, fbos.B.texture);

  // --- Render Pass 4: Blur (Ping-Pong A <-> B) ---
  // Applies multiple passes of Gaussian blur for a smooth effect.
  const blurAmount = 40;
  const blurIterations = 4;
  let currentInputFBO = fbos.A;
  let currentOutputFBO = fbos.B;
  gl.useProgram(programs.blur); // Set program once before loop
  gl.uniform2f(
    gl.getUniformLocation(programs.blur, "uResolution"),
    gl.drawingBufferWidth,
    gl.drawingBufferHeight
  );
  gl.uniform1f(gl.getUniformLocation(programs.blur, "uBlurAmount"), blurAmount);

  for (let i = 0; i < blurIterations; i++) {
    // Horizontal Blur Pass
    gl.bindFramebuffer(gl.FRAMEBUFFER, currentOutputFBO.fbo);
    gl.uniform2f(
      gl.getUniformLocation(programs.blur, "uBlurDirection"),
      1.0,
      0.0
    );
    drawQuad(programs.blur, currentInputFBO.texture);
    [currentInputFBO, currentOutputFBO] = [currentOutputFBO, currentInputFBO];

    // Vertical Blur Pass
    gl.bindFramebuffer(gl.FRAMEBUFFER, currentOutputFBO.fbo);
    gl.uniform2f(
      gl.getUniformLocation(programs.blur, "uBlurDirection"),
      0.0,
      1.0
    );
    drawQuad(programs.blur, currentInputFBO.texture);
    [currentInputFBO, currentOutputFBO] = [currentOutputFBO, currentInputFBO];
  }
  // Result of blur is now in currentInputFBO

  // --- Render Pass 5: Flow Field (Input Blur -> Output B) ---
  // Distorts the blurred image based on animated noise.
  gl.bindFramebuffer(gl.FRAMEBUFFER, currentOutputFBO.fbo);
  gl.useProgram(programs.flowField);
  gl.uniform1f(
    gl.getUniformLocation(programs.flowField, "uTime"),
    time * 0.025 * timeMultiplier
  );
  gl.uniform2f(
    gl.getUniformLocation(programs.flowField, "uMousePos"),
    mousePos.x,
    mousePos.y
  ); // Flow field doesn't use mouse here
  gl.uniform2f(
    gl.getUniformLocation(programs.flowField, "uResolution"),
    gl.drawingBufferWidth,
    gl.drawingBufferHeight
  );
  drawQuad(programs.flowField, currentInputFBO.texture);
  [currentInputFBO, currentOutputFBO] = [currentOutputFBO, currentInputFBO];
  // Result of flow field is in currentInputFBO

  // --- Render Pass 6: Grain (Input Flow -> Output Screen) ---
  // Adds final grain effect to the result before displaying.
  gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);

  gl.useProgram(programs.grain);
  gl.uniform1f(
    gl.getUniformLocation(programs.grain, "uTime"),
    time * 0.15 * timeMultiplier
  );
  gl.uniform2f(
    gl.getUniformLocation(programs.grain, "uResolution"),
    gl.drawingBufferWidth,
    gl.drawingBufferHeight
  );
  gl.uniform1f(
    gl.getUniformLocation(programs.grain, "uGrainAmount"),
    enableGrain ? 0.04 : 0.0
  );
  drawQuad(programs.grain, currentInputFBO.texture);

  requestAnimationFrame(renderLoop);
}

export default setup;
