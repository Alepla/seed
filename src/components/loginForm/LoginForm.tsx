import "./loginForm.scss"

const LoginForm: React.FC = () => {
  return (
    <div className="loginform">
      <div className="loginform-image">
      </div>

      <div className="loginform-content">
        <p className="loginform-content__title">Iniciar sesión</p>

        <form className="loginform-content__form">
          <fieldset className="fieldset">
            <label className="fieldset-label">Usuario</label>
            <input type="text" className="fieldset-input" />
          </fieldset>

          <fieldset className="fieldset">
            <label className="fieldset-label">Contraseña</label>
            <input type="password" className="fieldset-input" />
          </fieldset>

          <fieldset className="fieldset">
            <label className="fielset-sublabel"></label>
            <label className="fielset-sublabel"></label>
          </fieldset>

          <button type="button" className="button">Iniciar sesión</button>
        </form>
      </div>
    </div>
  )
}

export default LoginForm
