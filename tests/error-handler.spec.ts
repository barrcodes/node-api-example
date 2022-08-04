import { NextFunction, Request, Response } from "express"
import {
  AccessError,
  AuthorizationError,
  InvalidInputError,
  NonExistantDataError,
} from "../src/errors"
import { errorHandler } from "../src/handlers"

describe("errorHandler", () => {
  let req: Request
  let res: Response
  let next: NextFunction
  let mockSendStatus: jest.Mock

  beforeAll(() => {
    req = {} as any as Request
    res = {} as any as Response
    next = () => {}
  })

  beforeEach(() => {
    mockSendStatus = jest.fn((status: number) => status)
    res.sendStatus = mockSendStatus
  })

  it("should send status 400 on invlalid input", () => {
    const allowed = errorHandler(
      new InvalidInputError("test", "test"),
      req,
      res,
      next
    )
    expect(mockSendStatus.mock.calls[0][0]).toBe(400)
  })

  it("should send status 404 on non-existant data", () => {
    const allowed = errorHandler(
      new NonExistantDataError("test", 1),
      req,
      res,
      next
    )
    expect(mockSendStatus.mock.calls[0][0]).toBe(404)
  })

  it("should send status 401 on unauthorized", () => {
    const allowed = errorHandler(new AuthorizationError(), req, res, next)
    expect(mockSendStatus.mock.calls[0][0]).toBe(401)
  })

  it("should send status 401 on access error", () => {
    const allowed = errorHandler(new AccessError(1, "test", 1), req, res, next)
    expect(mockSendStatus.mock.calls[0][0]).toBe(401)
  })

  it("should send status 500 on unknown error", () => {
    const allowed = errorHandler(new Error("test"), req, res, next)
    expect(mockSendStatus.mock.calls[0][0]).toBe(500)
  })
})
