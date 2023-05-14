import { useState } from "react"
import User from "../../domain/user"
import { emptyUser } from "../../shared/user"
import "./loginForm.scss"
import { useTranslation } from "react-i18next"

const LoginForm: React.FC = () => {
  const { t } = useTranslation();
  const [user, setUser] = useState<User>(new User(emptyUser, []))

  const handleLogin = (): void => {
    const userUpdated: User = user.checkLoginFormErrors()
    setUser(userUpdated)
    user.login()
  }

  const handleFillForm = (key: string, value: string): void => {
    const userUpdated: User = user.fillFormFields(key, value)
    setUser(userUpdated)
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
                className={user.selectClass("email")}
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
                className={user.selectClass("password")}
              />
            </label>
          </fieldset>

          <fieldset className="fieldset">
            {user.hasMissingFields() && <label className="fielset-sublabel">error message</label>}
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
