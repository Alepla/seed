import React from "react"
import { render, screen } from "@testing-library/react"
import LoginForm from "../../../src/components/loginForm/LoginForm"

describe("LoginForm", () => {
  it("true should be truthy", () => {
    SUT.render()

    expect(true).toBeTruthy()
  })

  it("contains Hello ", () => {
    SUT.render()

    expect(SUT.loginFormTitle()).toBeInTheDocument()
  })
})

class SUT {
  public static render(): void {
    render(<LoginForm />)
  }

  public static loginFormTitle(): HTMLElement {
    return screen.getByText("Hello")
  }
}
