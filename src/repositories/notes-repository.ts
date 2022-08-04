import { NonExistantDataError } from "../errors"
import { Note } from "../models"
import { PgRepo } from "./postgres-repository"
import { injectable } from "tsyringe"

@injectable()
export class NotesRepository extends PgRepo {
  protected name = "Notes"

  public getNotes(userId: number) {
    return this.withClient(async (client) => {
      const sql = 'SELECT * FROM notes WHERE "createdBy" = $1;'
      const values = [userId]
      const result = await client.query(sql, values)
      return result.rows as Note[]
    })
  }

  public getNote(id: number) {
    return this.withClient(async (client) => {
      const sql = "SELECT * FROM notes WHERE id = $1;"
      const values = [id]
      const result = await client.query(sql, values)

      if (result.rowCount === 0) {
        return undefined
      }

      const note: Note = result.rows[0]
      note.createdOn = new Date(note.createdOn)
      return note
    })
  }

  public createNote(userId: number, { title, contents }: Note) {
    return this.withClient(async (client) => {
      const sql =
        'INSERT INTO notes("createdBy", "createdOn", title, contents) VALUES ($1, $2, $3, $4);'
      const values = [userId, new Date(), title, contents]
      await client.query(sql, values)
    })
  }

  public updateNote(id: number, { title, contents }: Note) {
    return this.withClient(async (client) => {
      const sql = "UPDATE notes SET (title, contents) = ($1, $2) WHERE id = $3;"
      const values = [title, contents, id]
      await client.query(sql, values)
    })
  }

  public deleteNote(id: number) {
    return this.withClient(async (client) => {
      const sql = "DELETE FROM notes WHERE id = $1;"
      const values = [id]
      await client.query(sql, values)
    })
  }
}

export const NotesRepo = new NotesRepository()
