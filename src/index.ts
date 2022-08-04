import "reflect-metadata"
import dotenv from "dotenv"
import { createApp } from "./app"
dotenv.config()

const port = +(process.env.PORT ?? 8080)

if (isNaN(port)) {
  console.log(`invalid port: ${process.env.PORT}`)
  process.exit(1)
}

const allowList = (process.env.ALLOW_LIST?.split(",") ?? [])
  .map((url) => url.trim())
  .filter((url) => Boolean(url))

const app = createApp(port, allowList)
