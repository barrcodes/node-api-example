import cors from "cors"
import express from "express"
import { originHandler, errorHandler } from "./handlers"
import { NotesController } from "./controllers"

export const createApp = (port: number, allowList: string[]) => {
  const app = express()

  app.use(express.json())

  app.use(
    cors((req, callback) => {
      const origin = req.header("origin")

      callback(null, {
        origin: originHandler(allowList, origin),
      })
    })
  )

  app.use("/notes", NotesController)

  app.use(errorHandler)

  app.listen(port, () => {
    console.log(`API running on port ${port}.`)
  })

  return app
}
