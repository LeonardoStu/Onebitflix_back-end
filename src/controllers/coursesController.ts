import { Request, Response } from "express";
import { courseServices } from "../services/courseServices";
import { getPaginationParams } from "../helpers/getPaginationParams";
import { AuthenticatedRequest } from "../middlewares/auth";
import { likeService } from "../services/likeServices";
import { favoriteService } from "../services/favoriteServices";

export const coursesController = {
    // GET /courses/featured
    featured: async (req: Request, res: Response) => {
        try {
           const featuredCourses = await courseServices.getRandomFeaturedCourses()
            return res.json(featuredCourses)
        } catch (err) {
            if(err instanceof Error){
                return res.status(400).json({message: err.message})
            }
        }
    },

    // GET /courses/newest
    newest: async (req: Request, res: Response) => {
        try {
            const newestCourses = await courseServices.getTopNewest()
            return res.json(newestCourses)
        } catch (err) {
            if(err instanceof Error){
                return res.status(400).json({message: err.message})
            }
        }
    },

    // GET /courses/search?=name
    search: async (req: Request, res: Response) => {
        const { name } = req.query
        const [page, perPage] = getPaginationParams(req.query)

        try {
            if(typeof name !== 'string') throw new Error('name params must be of type string')
            const courses = await courseServices.findByName(name, page, perPage)
            return res.json(courses)
        } catch (err) {
            if(err instanceof Error){
                return res.status(400).json({message: err.message})
            }
        }
    },

    // GET /courses/popular
    popular: async(req: Request, res: Response) => {
        try {
            const topTen = await courseServices.getTopTenByLikes()
            return res.json(topTen)
        } catch (err) {
            if(err instanceof Error){
                return res.status(400).json({message: err.message})
            }
        }
    },

    // GET /courses/:id
    show: async (req: AuthenticatedRequest, res: Response) => {
        const userId = req.user!.id
        const courseId = req.params.id

        try {
            const course = await courseServices.findByIdWithEpisodes(courseId)

            if(!course) return res.status(400).json({message: 'Cursou não encontrado'})

            const liked = await likeService.isLiked(userId, Number(courseId))
            const favorite = await favoriteService.isFavorite(userId, Number(courseId))
            return res.json({...course.get(), favorite, liked})
            
        } catch (err) {
            if(err instanceof Error){
                return res.status(400).json({message: err.message})
            }
        }
    }
}