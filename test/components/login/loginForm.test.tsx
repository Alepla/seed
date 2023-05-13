import React from "react"
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import LoginForm from "../../../src/components/loginForm/LoginForm"
import LoginFormFixture from "../../fixtures/loginForm"

describe("LoginForm", () => {
  it("show error when validate is incorrect", async () => {
    SUT.render()

    await SUT.fillEmailInput()
    await waitFor(async () => {
      await SUT.clickButton()
    })

    expect(SUT.errorMessage()).toBeInTheDocument()
  })
})

class SUT {
  static render(): void {
    render(<LoginForm />)
  }

  static emailInput(): HTMLElement {
    return screen.getByRole("textbox", { name: "Usuario" })
  }

  static async fillEmailInput(): Promise<void> {
    await userEvent.type(SUT.emailInput(), LoginFormFixture.anEmail)
  }

  static passwordInput(): HTMLElement {
    return screen.getByRole("textbox", { name: "Password" })
  }

  static async fillPasswordInput(): Promise<void> {
    await userEvent.type(SUT.passwordInput(), LoginFormFixture.aPassword)
  }

  static button(): HTMLElement {
    return screen.getByRole("button", { name: "Iniciar sesión" })
  }

  static async clickButton(): Promise<void> {
    await userEvent.click(SUT.button())
  }

  static errorMessage(): HTMLElement {
    return screen.getByText("error message")
  }
}
