import React from 'react'

export default function withPoseInitialEntry([start, end], PoseElement) {
  return props => <PoseElement initialPose={start} pose={end} {...props} />
}
