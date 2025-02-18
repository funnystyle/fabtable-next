import { useTranslation } from 'next-i18next'

export default function LanguageSwitcher() {
  const { i18n } = useTranslation()

  const changeLanguage = (lang) => () => {
    console.log('changeLanguage', lang)
    i18n.changeLanguage(lang)
  }

  return (
    <div>
      <button onClick={changeLanguage('en')}>English</button>
      <button onClick={changeLanguage('ko')}>Korean</button>
    </div>
  )
}
