import {
  AccessError,
  InvalidInputError,
  NonExistantDataError,
} from "../src/errors"
import { Note } from "../src/models"
import { NotesService } from "../src/services"

describe("NotesService", () => {
  const createMockNote = (id: number, createdBy: number): Note => ({
    id,
    createdBy,
    createdOn: new Date(),
    title: "title",
    contents: "contents",
  })

  const mockRepo: any = {
    name: "mockRepo",
    getNotes: (userId: number) => {
      const notes = Object.values(mockTable).filter(
        (n) => n.createdBy === userId
      )
      return Promise.resolve(notes)
    },
    getNote: (id: number) => {
      const note = mockTable[id]
      return Promise.resolve(note)
    },
    createNote: (userId: number, note: Note) => {
      const ids = Object.keys(mockTable).map((k) => +k)
      const id = Math.max(...ids) + 1
      mockTable[id] = {
        id,
        createdBy: userId,
        ...(note as any),
      }
      return Promise.resolve()
    },
    updateNote: (id: number, { title, contents }: Note) => {
      const note = mockTable[id!]
      console.log(`${id}`, note)
      note.title = title
      note.contents = contents
      return Promise.resolve()
    },
    deleteNote: (id: number) => {
      delete mockTable[id]
      return Promise.resolve()
    },
  }
  const notesService = new NotesService(mockRepo)

  let mockTable: { [key: number]: Note }

  beforeEach(() => {
    mockTable = {
      1: createMockNote(1, 1),
      2: createMockNote(2, 1),
      3: createMockNote(3, 2),
      4: createMockNote(4, 2),
    }
  })

  it("getNotes should return notes for a user", async () => {
    let thrownErr: unknown

    try {
      const notes = await notesService.getNotes(1)
      expect(notes).not.toBeUndefined()
      expect(notes.length).toBe(2)
      for (const note of notes) {
        expect(note.createdBy).toBe(1)
      }
    } catch (e) {
      thrownErr = e
    }

    expect(thrownErr).toBeUndefined()
  })

  it("getNote should throw input error if id is not a number", async () => {
    let thrownErr: unknown

    try {
      await notesService.getNote(1, "a" as any)
    } catch (e) {
      thrownErr = e
    }

    expect(thrownErr).toBeInstanceOf(InvalidInputError)
  })

  it("getNote should throw non existant data error if note does not exist", async () => {
    let thrownErr: unknown

    try {
      await notesService.getNote(1, 5)
    } catch (e) {
      thrownErr = e
    }

    expect(thrownErr).toBeInstanceOf(NonExistantDataError)
  })

  it("getNote should throw access error if note is not owned by user", async () => {
    let thrownErr: unknown

    try {
      await notesService.getNote(1, 3)
    } catch (e) {
      thrownErr = e
    }

    expect(thrownErr).toBeInstanceOf(AccessError)
  })

  it("getNote should return note if note exists", async () => {
    let thrownErr: unknown

    try {
      const note = await notesService.getNote(1, 1)
      expect(note).not.toBeUndefined()
      expect(note.id).toBe(1)
      expect(note.createdBy).toBe(1)
    } catch (e) {
      thrownErr = e
    }

    expect(thrownErr).toBeUndefined()
  })

  it("createNote should throw invalid input error if body is invalid", async () => {
    let thrownErr: unknown

    try {
      await notesService.createNote(1, { not: "a note" } as any)
    } catch (e) {
      thrownErr = e
    }

    expect(thrownErr).toBeInstanceOf(InvalidInputError)
  })

  it("createNote should create note if body is valid", async () => {
    let thrownErr: unknown

    try {
      await notesService.createNote(1, createMockNote(5, 1))
      const note = await notesService.getNote(1, 5)
      expect(note).not.toBeUndefined()
      expect(note.id).toBe(5)
      expect(note.createdBy).toBe(1)
    } catch (e) {
      thrownErr = e
    }

    expect(thrownErr).toBeUndefined()
  })

  it("updateNote should throw invalid input error if id is not a number", async () => {
    let thrownErr: unknown

    try {
      await notesService.updateNote(1, "a" as any, {} as any)
    } catch (e) {
      thrownErr = e
    }

    expect(thrownErr).toBeInstanceOf(InvalidInputError)
  })

  it("updateNote should throw invalid input error if body is invalid", async () => {
    let thrownErr: unknown

    try {
      await notesService.updateNote(1, 1, { not: "a note" } as any)
    } catch (e) {
      thrownErr = e
    }

    expect(thrownErr).toBeInstanceOf(InvalidInputError)
  })

  it("updateNote should throw non existant data error if note does not exist", async () => {
    let thrownErr: unknown

    try {
      await notesService.updateNote(1, 5, createMockNote(5, 1))
    } catch (e) {
      thrownErr = e
    }

    expect(thrownErr).toBeInstanceOf(NonExistantDataError)
  })

  it("updateNote should throw access error if note is not owned by user", async () => {
    let thrownErr: unknown

    try {
      await notesService.updateNote(1, 3, createMockNote(3, 1))
    } catch (e) {
      thrownErr = e
    }

    expect(thrownErr).toBeInstanceOf(AccessError)
  })

  it("updateNote should update Note if input is valid", async () => {
    let thrownErr: unknown

    try {
      const updates = { title: "new title", contents: "new contents" }
      await notesService.updateNote(1, 1, updates)
      const updatedNote = await notesService.getNote(1, 1)
      expect(updatedNote).not.toBeUndefined()
      expect(updatedNote.title).toBe(updates.title)
      expect(updatedNote.contents).toBe(updates.contents)
    } catch (e) {
      thrownErr = e
    }

    expect(thrownErr).toBeUndefined()
  })

  it("deleteNote should throw invalid input error if id is not a number", async () => {
    let thrownErr: unknown

    try {
      await notesService.updateNote(1, "a" as any, {} as any)
    } catch (e) {
      thrownErr = e
    }

    expect(thrownErr).toBeInstanceOf(InvalidInputError)
  })

  it("deleteNote should throw non existant data error if note does not exist", async () => {
    let thrownErr: unknown

    try {
      await notesService.deleteNote(1, 5)
    } catch (e) {
      thrownErr = e
    }

    expect(thrownErr).toBeInstanceOf(NonExistantDataError)
  })

  it("deleteNote should throw access error if note is not owned by user", async () => {
    let thrownErr: unknown

    try {
      await notesService.deleteNote(1, 3)
    } catch (e) {
      thrownErr = e
    }

    expect(thrownErr).toBeInstanceOf(AccessError)
  })

  it("deleteNote should delete note if input is valid", async () => {
    let thrownErr: unknown
    await notesService.deleteNote(1, 1)

    try {
      await notesService.getNote(1, 1)
    } catch (e) {
      thrownErr = e
    }

    expect(thrownErr).toBeInstanceOf(NonExistantDataError)
  })
})
