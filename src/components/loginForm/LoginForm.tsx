import { useState } from "react"
import { emptyUser } from "../../shared/auth"
import { useTranslation } from "react-i18next"
import { LoginCredentials } from "../../types/auth"
import "./loginForm.scss"

const LoginForm: React.FC = () => {
  const { t } = useTranslation();
  const [user, setUser] = useState<LoginCredentials>(emptyUser)
  const [missingFields, setMissingFields] = useState<Array<string>>([])

  const handleLogin = (): void => {
    checkLoginFormErrors()
  }

  const checkLoginFormErrors = (): void => {
    const { email, password } = user
    const emptyMissingFields: Array<string> = []

    if (email == "") emptyMissingFields.push("email")
    if (password == "") emptyMissingFields.push("password")

    setMissingFields(emptyMissingFields)
  }

  const handleFillForm = (key: string, value: string): void => {
    checkErrors(key)
    setUser({
      ...user,
      [key]: value
    })
  }

  const checkErrors = (key: string): Array<string> => {
    return missingFields.filter((field) => key != field)
  }

  const selectClass = (key: string): string => {
    let result: string = "fieldset-input"
    if (hasError(key)) result += "-error"
    return result
  }

  const hasError = (key: string): boolean => {
    return missingFields.some((field) => field == key)
  }

  const hasMissingFields = (): boolean => {
    return missingFields.length > 0
  }

  return (
    <div className="loginform">
      <div className="loginform-image"></div>

      <div className="loginform-content">
        <p className="loginform-content__title">{t('login.login')}</p>

        <form className="loginform-content__form">
          <fieldset className="fieldset">
            <label className="fieldset-label">
            {t('login.user')}
              <input
                onChange={(e) => {
                  handleFillForm("email", e.target.value)
                }}
                type="text"
                className={selectClass("email")}
              />
            </label>
          </fieldset>

          <fieldset className="fieldset">
            <label className="fieldset-label">
            {t('login.password')}
              <input
                onChange={(e) => {
                  handleFillForm("password", e.target.value)
                }}
                type="password"
                className={selectClass("password")}
              />
            </label>
          </fieldset>

          <fieldset className="fieldset">
            {hasMissingFields() && <label className="fielset-sublabel">error message</label>}
          </fieldset>

          <button onClick={handleLogin} type="button" className="button">
            {t('login.login')}
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginForm
