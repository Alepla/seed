import User from "../../src/domain/user"
import UserFixture from "./fixtures/user"

describe("User", () => {
  it("returns a errors list from login form", () => {
    const user = new User()

    const errors = user.checkLoginFormErrors(UserFixture.formFields)

    expect(errors).toHaveLength(2)
    expect(errors[0]).toBe("email")
    expect(errors[1]).toBe("password")
  })
})