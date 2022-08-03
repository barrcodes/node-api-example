import cors from "cors"
import express from "express"

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

export const createApp = (port: number, allowList: string[]) => {
  const app = express()

  app.listen(port, () => {
    console.log(`API running on port ${port}.`)
  })

  app.use(express.json())

  app.use(
    cors((req, callback) => {
      const origin = req.header("origin")

      callback(null, {
        origin: originHandler(allowList, origin),
      })
    })
  )

  app.get("/", (req, res) => {
    res.sendStatus(200)
  })

  return app
}
