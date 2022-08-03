import { originHandler } from "../src/app"

describe("app", () => {
  it("should allow origin if there is no whitelist", () => {
    const allowed = originHandler([], "https://test.com")
    expect(allowed).toBe(true)
  })

  it("should allow whitelisted origin", () => {
    const allowed = originHandler(
      ["https://allowed.com", "https://test.com"],
      "https://test.com"
    )
    expect(allowed).toBe(true)
  })

  it("should block origin that is not whitelisted", () => {
    const allowed = originHandler(["https://allowed.com"], "https://test.com")
    expect(allowed).toBe(false)
  })
})
