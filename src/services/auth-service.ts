import { injectable } from "tsyringe"
import { Service } from "./service"
import { User } from "../models"
import { Request } from "express"
import { AuthorizationError } from "../errors"

const usersByIdToken: { [key: string]: User } = {
  token1: { id: 1 },
  token2: { id: 2 },
}

/**
 * I've far over-simplified here, because auth is way out of scope.
 * Suffice it to say that we would likely have an auth service, or be using a third-party auth service.
 * My assumption here is that we would have jwt authentication with auth and id tokens.
 *
 * Tests for this class are also out of scope
 */
@injectable()
export class AuthService extends Service {
  protected name = "Auth"

  public async authenticateUser(req: Request) {
    const token = await this.getToken(req)
    if (!(await this.tokenIsAuthorized(token))) {
      throw new AuthorizationError()
    }
    return await this.getUser(token)
  }

  public async getToken(req: Request) {
    const authHeader = req.header("Authorization")?.split(" ") ?? [""]
    if (authHeader.length < 2) {
      throw new AuthorizationError()
    }
    return authHeader[1]
  }

  public async tokenIsAuthorized(token: string) {
    return Object.keys(usersByIdToken).includes(token)
  }

  public async getUser(token: string) {
    return usersByIdToken[token]
  }
}
