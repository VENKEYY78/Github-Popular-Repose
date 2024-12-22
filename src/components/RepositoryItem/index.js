import './index.css'

const RepositoryItem = props => {
  const {eachLanguageDetails} = props
  const {
    imageUrl,
    forksCount,
    issuesCount,
    name,
    starsCount,
  } = eachLanguageDetails
  return (
    <li className="each-language-item">
      <img src={imageUrl} alt={name} className="language-img" />
      <h1 className="name-heading">{name}</h1>
      <div className="ratings-container">
        <div className="container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
            alt="stars"
            className="star-img"
          />
          <p className="stars-count">{starsCount} stars</p>
        </div>
        <div className="container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
            alt="forks"
            className="forks-img"
          />
          <p className="forks-count">{forksCount} forks</p>
        </div>
        <div className="container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
            alt="open issues"
            className="open-issus-img"
          />
          <p className="issues-count">{issuesCount} open issues</p>
        </div>
      </div>
    </li>
  )
}

export default RepositoryItem
