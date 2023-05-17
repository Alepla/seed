import { useState } from "react"
import { emptyRegisterData } from "../../../shared/auth"
import { RegisterData, RegisterDataErrors } from "../../../types/auth"

const RegisterForm: React.FC = () => {
  const [registerData, setRegisterData] = useState<RegisterData>(emptyRegisterData)
  const [missingFields, setMissingFields] = useState<Array<string>>([])

  const handleFillForm = (key: string, value: string): void => {
    setRegisterData({
      ...registerData,
      [key]: value
    })
  }

  const handleRegister = () => {
    checkRegisterFormErrors()
  }

  const checkRegisterFormErrors = () => {
    const { name, surname, email, password } = registerData
    const emptyMissingFields: Array<string> = []

    if (name == "") emptyMissingFields.push("name")
    if (surname == "") emptyMissingFields.push("surname")
    if (email == "") emptyMissingFields.push("email")
    if (password == "") emptyMissingFields.push("password")

    setMissingFields(emptyMissingFields)
  }

  const selectClass = (key: string): string => {
    let result: string = "fieldset-input"
    if (hasError(key)) result += "-error"
    return result
  }

  const hasError = (key: string): boolean => {
    return missingFields.some((field) => field == key)
  }

  const hasMissingFields = (): boolean => {
    return missingFields.length > 0
  }

  const invalidFieldErrorMessage = (field: string): string => {
    return errorsList[field as keyof RegisterDataErrors]
  }

  const errorsList: RegisterDataErrors = {
    "name": "name no vacio",
    "surname": "surname no vacio",
    "email": "email no vacio",
    "password": "password no vacia",
  }

  return (
    <div>
      <label>
        Name:
        <input 
          onChange={(e) => 
            handleFillForm("name", e.target.value)
          } 
          type="text" 
          className={selectClass("name")}
        />
      </label>
      <label>
        Surname:
        <input 
          onChange={(e) => 
            handleFillForm("surname", e.target.value)
          } 
          type="text"
          className={selectClass("surname")}
        />
      </label>
      <label>
        Email:
        <input 
          onChange={(e) => 
            handleFillForm("email", e.target.value)
          } 
          type="text"
          className={selectClass("email")}
        />
      </label>
      <label>
        Password:
        <input 
          onChange={(e) => 
            handleFillForm("password", e.target.value)
          } 
          type="password"
          className={selectClass("password")}
        />
      </label>
      <fieldset className="fieldset">
        {hasMissingFields() && missingFields.map((field) => (
          <label key={field} className="fielset-sublabel">{invalidFieldErrorMessage(field)}</label>
        ))}
      </fieldset>
      <button onClick={handleRegister}>Send</button>
    </div>
  )
}

export default RegisterForm