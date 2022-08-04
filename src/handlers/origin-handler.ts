export const originHandler = (allowList: string[], origin?: string) => {
  let allowOrigin = false

  if (!allowList || allowList.length === 0) {
    allowOrigin = true
  } else if (origin && allowList.includes(origin)) {
    allowOrigin = true
  } else {
    console.log(`Blocking origin: ${origin}`)
  }

  return allowOrigin
}
