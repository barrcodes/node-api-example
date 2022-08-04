export class AuthorizationError implements Error {
  public name = "AuthorizationError"
  public message: string

  constructor() {
    this.message = "client is unauthorized"
  }
}
