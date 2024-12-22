import './index.css'

const LanguageFilterItem = props => {
  const {eachLanguageTab, updateActiveTabId, isActive} = props
  const {language, id} = eachLanguageTab

  // console.log(isActive)

  const onClickLanguageTab = () => {
    updateActiveTabId(id)
  }

  const ifTabIsActive = isActive ? 'activeTab' : 'normalTab'

  return (
    <li className="language-list-item">
      <button
        className={ifTabIsActive}
        type="button"
        onClick={onClickLanguageTab}
      >
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
