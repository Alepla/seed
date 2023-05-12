import { LoginCredentials } from "../types/user"

export default class User {
  constructor() {}
  
  public login(credentials: LoginCredentials): void {
    const isValid = this.validate(credentials)
  }

  private validate(credentials: LoginCredentials): boolean {
    const isFormValid = this.validateLoginForm(credentials).length === 0
    if(isFormValid) return true
    return false
  }

  public validateLoginForm(credentials: LoginCredentials): Array<string> {
    const { email, password } = credentials
    const missingFields: Array<string> = []

    if(email == "") missingFields.push("email")
    if(password == "") missingFields.push("password")

    return missingFields
  }
}