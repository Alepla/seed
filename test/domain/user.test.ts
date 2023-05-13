import User from "../../src/domain/user"
import { emptyUser } from "../../src/shared/user"
import UserFixture from "../fixtures/user"

describe("User", () => {
  it("can return class without error", () => {
    const user = new User(emptyUser, [])

    const className = user.selectClass(UserFixture.emailKey)

    expect(className).toBe(UserFixture.classNameWithoutError)
  })

  it("can return class with error", () => {
    const user = new User(emptyUser, [UserFixture.emailKey])

    const className = user.selectClass(UserFixture.emailKey)

    expect(className).toBe(UserFixture.classNameWithError)
  })

  it("can return true if there are missing fields", () => {
    const user = new User(emptyUser, [UserFixture.emailKey])

    const hasMissingFields = user.hasMissingFields()

    expect(hasMissingFields).toBeTruthy()
  })

  it("can return false if there are not missing fields", () => {
    const user = new User(emptyUser, [])

    const hasMissingFields = user.hasMissingFields()

    expect(hasMissingFields).toBeFalsy()
  })

  it("can update the login fields ", () => {
    const user = new User(emptyUser, [])
    const userWithEmail = new User(UserFixture.loginCredentialsWithEmail, [])

    const userUpdated = user.fillFormFields(UserFixture.emailKey, UserFixture.anEmail)

    expect(userUpdated).toEqual(userWithEmail)
  })

  it("can update the missing fields ", () => {
    const user = new User(UserFixture.loginCredentialsWithEmail, [])
    const userWithMissingField = new User(UserFixture.loginCredentialsWithEmail, [
      UserFixture.passwordKey,
    ])

    const userUpdated = user.checkLoginFormErrors()

    expect(userUpdated).toEqual(userWithMissingField)
  })
})
