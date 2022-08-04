import { Note } from "../../src/models"
import { MockTable } from "./mock-table"

export class MockNotesRepository {
  constructor(private mockTable: MockTable<Note>) {}

  public getNotes(userId: number) {
    const notes = Object.values(this.mockTable).filter(
      (n) => n.createdBy === userId
    )
    return Promise.resolve(notes)
  }

  public getNote(id: number) {
    const note = this.mockTable[id]
    return Promise.resolve(note)
  }

  public createNote(userId: number, note: Note) {
    const ids = Object.keys(this.mockTable).map((k) => +k)
    const id = Math.max(...ids) + 1
    this.mockTable[id] = {
      id,
      createdBy: userId,
      ...(note as any),
    }
    return Promise.resolve()
  }

  public updateNote(id: number, { title, contents }: Note) {
    const note = this.mockTable[id!]
    console.log(`${id}`, note)
    note.title = title
    note.contents = contents
    return Promise.resolve()
  }

  public deleteNote(id: number) {
    delete this.mockTable[id]
    return Promise.resolve()
  }
}
