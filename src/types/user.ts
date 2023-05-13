export interface UserCredentials extends LoginCredentials {
  name: string
  surname: string
}

export type LoginCredentials = {
  email: string
  password: string
}
