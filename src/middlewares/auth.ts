import { NextFunction, Request, Response } from "express"
import { jwtServices } from "../services/jwtServices"
import { userService } from "../services/userServises"
import { JwtPayload } from "jsonwebtoken"
import { UserInstance } from "../models/User"

export interface AuthenticatedRequest extends Request {
    user?: UserInstance | null
}

export function ensureAuth(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const authorizationHeader = req.headers.authorization

    if(!authorizationHeader) return res.status(401).json({
        message: 'Não autorizado: nenhum token foi encontrado.'
    })

    const token = authorizationHeader.replace(/Bearer /, '')

    jwtServices.verifyToken(token, async(err, decoded) => {
        if(err || typeof decoded === 'undefined') return res.status(401).json({
            message: 'Não autorizado: token inválido.'
        })

        const user = await userService.findByEmail((decoded as JwtPayload).email).then(user => {
            req.user = user
            next()
        })
    })
}

export function ensureAuthViaQuery(req: AuthenticatedRequest, res: Response, next: NextFunction){
    const { token } = req.query

    if(!token) return res.status(401).json({
        message: 'Não autorizado: Nenhum token fo encontrado'
    })

    if(typeof token !== 'string') return res.status(401).json({
        message: 'O parâmetro token deve ser do tipo string.'
    })

    jwtServices.verifyToken(token, async(err, decoded) => {
        if(err || typeof decoded === 'undefined') return res.status(401).json({
            message: 'Não autorizado: token inválido.'
        })

        const user = await userService.findByEmail((decoded as JwtPayload).email)
        req.user = user
        next()
    })

}