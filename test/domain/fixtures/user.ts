import { LoginCredentials } from "../../../src/types/user"

export default class UserFixture {
  static readonly formFields: LoginCredentials = { email: "", password: "" }
}
