import cleanNonSet from "../helpers/cleanNonSet"

export type JSONRecord = Record<string, unknown>
export default class SuperFetch {
  protected static jwtToken?: string

  static async post(baseUrl: string, payload: JSONRecord): Promise<JSONRecord> {
    return await SuperFetch.call("POST", baseUrl, payload)
  }

  private static async call(
    method: string,
    endpoint: string,
    body?: JSONRecord
  ): Promise<JSONRecord> {
    const response: Response = await fetch(endpoint, SuperFetch.requestOptions(method, body))
    if (response.status >= 400) throw new Error()
    return await response.json()
  }

  private static requestOptions(method: string, body?: JSONRecord): JSONRecord {
    const options: JSONRecord = {
      method,
      headers: SuperFetch.headers(),
      body: JSON.stringify(body),
    }
    return cleanNonSet(options)
  }

  private static headers(): Record<string, string> {
    const result: Record<string, string> = {
      "content-type": "application/json;charset=UTF-8",
    }
    if (SuperFetch.jwtToken) {
      result.Authorization = "Bearer " + SuperFetch.jwtToken
    }
    return result
  }
}
