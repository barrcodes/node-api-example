import { Client } from "pg"

export abstract class PgRepo {
  protected abstract name: string

  protected async withClient<T>(
    cb: (client: Client) => Promise<T>
  ): Promise<T> {
    const client = await this.getClient()
    let result: T = await cb(client)
    await client.end()
    return result
  }

  private async getClient() {
    const connectionString = `postgres://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}/${process.env.PGDB}`
    const client = new Client({
      connectionString,
      ssl: false,
    })
    await client.connect()
    return client
  }
}
