import { Request, Response } from "express";
import { userService } from "../services/userServises";
import { jwtServices } from "../services/jwtServices";

export const authController = {
    // POST auth/register
    register: async(req: Request, res: Response) => {
        const { firstName, lastName, phone, birth, email, password } = req.body

        try {
            const userAlreadyExists = await userService.findByEmail(email)

            if(userAlreadyExists){
                throw new Error('Esse email ja existe')
            }

            const user = await userService.create({
                firstName,
                lastName,
                phone,
                birth,
                email,
                password,
                role: 'user'
            })

            return res.status(201).json(user)
        } catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message })
            }
        }
    },
    
    // POST /auth/login
    login: async (req: Request, res: Response) => {
        const { email, password } = req.body
    
        try {
          const user = await userService.findByEmail(email)
    
          if (!user) {
            return res.status(401).json({ message: 'E-mail não registrado' })
          }
    
          user.checkPassword(password, (err, isSame) => {
            if (err) {
              return res.status(400).json({ message: err.message })
            }
    
            if (!isSame) {
              return res.status(401).json({ message: 'Senha incorreta' })
            }
    
            const payload = {
              id: user.id,
              firstName: user.firstName,
              email: user.email
            }
    
            const token = jwtServices.singToken(payload, '1d')
    
            return res.json({ authenticated: true, ...payload, token })
          })
        } catch (err) {
          if (err instanceof Error) {
            return res.status(400).json({ message: err.message })
          }
        }
    }
}