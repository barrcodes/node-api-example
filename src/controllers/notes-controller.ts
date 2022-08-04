import express from "express"
import { container } from "tsyringe"
import { NotesService } from "../services"
import { AuthService } from "../services/auth-service"

export const NotesController = express.Router()

NotesController.get("/", async (req, res, next) => {
  try {
    const authService = container.resolve(AuthService)
    const user = await authService.authenticateUser(req)
    const service = container.resolve(NotesService)
    const notes = await service.getNotes(user.id)
    res.send(notes)
  } catch (e) {
    next(e)
  }
})

NotesController.get("/:id", async (req, res, next) => {
  try {
    const authService = container.resolve(AuthService)
    const user = await authService.authenticateUser(req)
    const service = container.resolve(NotesService)
    const note = await service.getNote(user.id, +req.params.id)
    res.send(note)
  } catch (e) {
    next(e)
  }
})

NotesController.post("/", async (req, res, next) => {
  try {
    const authService = container.resolve(AuthService)
    const user = await authService.authenticateUser(req)
    const service = container.resolve(NotesService)
    await service.createNote(user.id, req.body)
    res.sendStatus(201)
  } catch (e) {
    next(e)
  }
})

NotesController.patch("/:id", async (req, res, next) => {
  try {
    const authService = container.resolve(AuthService)
    const user = await authService.authenticateUser(req)
    const service = container.resolve(NotesService)
    await service.updateNote(user.id, +req.params.id, req.body)
    res.sendStatus(204)
  } catch (e) {
    next(e)
  }
})

NotesController.delete("/:id", async (req, res, next) => {
  try {
    const authService = container.resolve(AuthService)
    const user = await authService.authenticateUser(req)
    const service = container.resolve(NotesService)
    await service.deleteNote(user.id, +req.params.id)
    res.sendStatus(204)
  } catch (e) {
    next(e)
  }
})
