import {Component} from 'react'

import Loader from 'react-loader-spinner'

import LanguageFilterItem from '../LanguageFilterItem'

import RepositoryItem from '../RepositoryItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

class GithubPopularRepos extends Component {
  state = {
    languagesList: [],
    activeTabId: languageFiltersData[0].id,
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getGithubPopularRepos()
  }

  getGithubPopularRepos = async () => {
    const {activeTabId} = this.state
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const ApiUrl = `https://apis.ccbp.in/popular-repos?language=${activeTabId}`
    const response = await fetch(ApiUrl)
    if (response.ok) {
      const data = await response.json()
      const formattedData = data.popular_repos.map(eachItem => ({
        id: eachItem.id,
        imageUrl: eachItem.avatar_url,
        forksCount: eachItem.forks_count,
        issuesCount: eachItem.issues_count,
        name: eachItem.name,
        starsCount: eachItem.stars_count,
      }))
      this.setState({
        languagesList: formattedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoadingView = () => (
    <div data-testid="loader" className="loader">
      <Loader color="#0284c7" height={80} type="ThreeDots" width={80} />
    </div>
  )

  renderLoadingFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-view"
      />
      <h1 className="heading">Something Went Wrong</h1>
    </div>
  )

  renderRepositoriesListView = () => {
    const {languagesList} = this.state
    return (
      <ul className="list-of-languages">
        {languagesList.map(eachLanguageItem => (
          <RepositoryItem
            eachLanguageDetails={eachLanguageItem}
            key={eachLanguageItem.id}
          />
        ))}
      </ul>
    )
  }

  updateActiveTabId = id => {
    this.setState(
      {
        activeTabId: id,
      },
      this.getGithubPopularRepos,
    )
  }

  renderLanguageFilterItem = () => {
    const {activeTabId} = this.state
    return (
      <ul className="laguage-filter-container">
        {languageFiltersData.map(eachLanguageTab => (
          <LanguageFilterItem
            eachLanguageTab={eachLanguageTab}
            key={eachLanguageTab.id}
            updateActiveTabId={this.updateActiveTabId}
            isActive={activeTabId === eachLanguageTab.id}
          />
        ))}
      </ul>
    )
  }

  renderRepositories = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderRepositoriesListView()
      case apiStatusConstants.failure:
        return this.renderLoadingFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <div className="app-main-container">
          <h1 className="main-heading">Popular</h1>
          {this.renderLanguageFilterItem()}
          {this.renderRepositories()}
        </div>
      </>
    )
  }
}

export default GithubPopularRepos
