import { LoginCredentials } from "../../src/types/user"

export default class UserFixture {
  static readonly emailKey: string = "email"
  static readonly passwordKey: string = "password"

  static readonly anEmail: string = "an email"

  static readonly loginCredentialsWithEmail: LoginCredentials = {
    email: this.anEmail,
    password: "",
  }

  static readonly classNameWithError: string = "fieldset-input-error"
  static readonly classNameWithoutError: string = "fieldset-input"
}
