import Settings from "../infrastructure/settings";
import SuperFetch, { JSONRecord } from "../infrastructure/superFetch";
import { decode } from "../helpers/decodeToken";
import { emptyCredentials } from "../shared/auth";
import { AuthInfo, LoginData } from "../types/auth";

export default class Auth {
  static async login(data: LoginData): Promise<AuthInfo> {
    const endpoint: string = Settings.apiUrl() + "/auth/login"
    const body: JSONRecord = data
    let result: AuthInfo

    try {
      const response: JSONRecord = await SuperFetch.post(endpoint, body)
      result = this.convertToCredentials(response)
    } catch {
      result = emptyCredentials
    }

    return result
  }

  private static convertToCredentials(response: JSONRecord): AuthInfo{
    const jwtToken: string = String(response.jwtToken)
    const credentials: JSONRecord = decode(jwtToken)
    return {
      jwtToken: jwtToken,
      name: String(credentials.name),
      email: String(credentials.email),
      locale: String(credentials.locale),
    }
  }
}