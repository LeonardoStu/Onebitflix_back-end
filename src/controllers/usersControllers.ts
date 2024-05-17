import { Response } from "express"
import { AuthenticatedRequest } from "../middlewares/auth"
import { userService } from "../services/userServises"

export const usersController = {
  // GET /users/current
  show: async(req: AuthenticatedRequest, res: Response) => {
    const currentUser = req.user!

    try {
      return res.json(currentUser)
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message })
      }
    }
  },

  // PUT /usurs/current
  update: async(req: AuthenticatedRequest, res: Response) => {
    const { id } = req.user!
    const { firstName, lastName, phone, email, birth } = req.body

    try {
      const updatedUsers = await userService.update(id, {
        firstName,
        lastName,
        phone,
        email,
        birth
      })

      return res.json(updatedUsers)
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message })
      }
    }
  },

  // GET /users/current/watching
  watching: async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.user!

    try {
      const watching = await userService.getKeepWatchingList(id)
      return res.json(watching)
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message })
      }
    }
  },
}