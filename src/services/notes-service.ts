import { Service } from "./service"
import { NotesRepository } from "../repositories"
import { CreateNoteViewModel, UpdateNoteViewModel } from "../view-models"
import {
  AccessError,
  InvalidInputError,
  NonExistantDataError,
  validateOrRejectInvalidInput,
} from "../errors"
import { Note } from "../models"
import { injectable } from "tsyringe"

@injectable()
export class NotesService extends Service {
  protected name = "Notes"

  public constructor(private notesRepository: NotesRepository) {
    super()
  }

  public async getNotes(userId: number) {
    return await this.notesRepository.getNotes(userId)
  }

  public async getNote(userId: number, id: number) {
    if (isNaN(id)) {
      throw new InvalidInputError("id", id)
    }
    const note = await this.notesRepository.getNote(id)

    if (!note) {
      throw new NonExistantDataError(this.name, id)
    }

    if (note.createdBy !== userId) {
      throw new AccessError(userId, this.name, id)
    }

    return note
  }

  public async createNote(userId: number, note: CreateNoteViewModel) {
    note = new CreateNoteViewModel(note)
    await validateOrRejectInvalidInput(note)
    await this.notesRepository.createNote(userId, note as Note)
  }

  public async updateNote(
    userId: number,
    noteId: number,
    note: UpdateNoteViewModel
  ) {
    if (isNaN(noteId)) {
      throw new InvalidInputError("noteId", noteId)
    }

    note = new UpdateNoteViewModel(note)
    await validateOrRejectInvalidInput(note)
    const existingNote = await this.notesRepository.getNote(noteId)

    if (!existingNote) {
      throw new NonExistantDataError(this.name, noteId)
    }

    if (existingNote.createdBy !== userId) {
      throw new AccessError(userId, this.name, noteId)
    }

    await this.notesRepository.updateNote(noteId, note as Note)
  }

  public async deleteNote(userId: number, noteId: number) {
    if (isNaN(noteId)) {
      throw new InvalidInputError("noteId", noteId)
    }

    const existingNote = await this.notesRepository.getNote(noteId)

    if (!existingNote) {
      throw new NonExistantDataError(this.name, noteId)
    }

    if (existingNote.createdBy !== userId) {
      throw new AccessError(userId, this.name, noteId)
    }

    await this.notesRepository.deleteNote(noteId)
  }
}
