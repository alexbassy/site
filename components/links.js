const links = [
  ['LinkedIn', 'https://www.linkedin.com/in/alex-bass-56a28761/'],
  ['GitHub', 'https://github.com/alexbassy'],
  ['Twitter', 'https://twitter.com/alexbassy'],
]

export default () => (
  <div>
    <h4>Find me on...</h4>
    <ul>
      {links.map(([name, url]) => <li key={name}><a href={url}>{name}</a></li>)}
    </ul>
    <style jsx>{`
      div {
        display: flex;
        flex-direction: column;
        flex: 1;
        background: #fff;
        padding: .1rem var(--margin);;
      }
      h4 {
        margin: 1rem 0 1rem 0;
      }
      ul {
        list-style: none;
        padding-left: 0;
        margin: 0 0 20px;
      }
      li {
        display: inline-block;
        margin-right: 1rem;
      }
    `}</style>
  </div>
)
