const Typeform = () => <a href='https://www.typeform.com/' target='_blank'>Typeform</a>

export default () => (
  <div>
    <h1>Alex Bass</h1>
    <p>Front-end developer</p>
    <p>Killing forms @ <Typeform/></p>
    <style jsx>{`
      div {
        display: flex;
        flex-direction: column;
        flex: 1;
        justify-content: flex-end;
        padding: 0 var(--margin) var(--margin);
      }
      h1 {
        font-size: 3rem;
        line-height: 1rem;
      }
      @media (min-width: 640px) {
        h1 {
          font-size: 4.6rem;
        }
      }
      p {
        font-size: 1.2rem;
        line-height: 1.2rem;
        margin: .5rem 0;
      }
    `}</style>
  </div>
)
