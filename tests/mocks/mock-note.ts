import { Note } from "../../src/models"

export const createMockNote = (id: number, createdBy: number): Note => ({
  id,
  createdBy,
  createdOn: new Date(),
  title: "title",
  contents: "contents",
})
