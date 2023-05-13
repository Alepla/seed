import { emptyUser } from "../shared/user"
import { LoginCredentials } from "../types/user"

export default class User {
  private user: LoginCredentials = emptyUser
  private missingFields: Array<string> = []

  constructor(user: LoginCredentials, missingFields: Array<string>) {
    this.user = user
    this.missingFields = missingFields
  }

  public fillFormFields(key: string, value: string): User {
    this.user[key as keyof LoginCredentials] = value
    const updatedMissingFields = this.checkErrors(key)

    return new User(this.user, updatedMissingFields)
  }

  public login(): void {}

  public checkLoginFormErrors(): User {
    const { email, password } = this.user
    this.missingFields = []

    if (email == "") this.missingFields.push("email")
    if (password == "") this.missingFields.push("password")

    return new User(this.user, this.missingFields)
  }

  private checkErrors(key: string): Array<string> {
    return this.missingFields.filter((field) => key != field)
  }

  public selectClass(key: string): string {
    let result: string = "fieldset-input"
    if (this.hasError(key)) result += "-error"
    return result
  }

  private hasError(key: string): boolean {
    return this.missingFields.some((field) => field == key)
  }

  public hasMissingFields(): boolean {
    return this.missingFields.length > 0
  }
}
