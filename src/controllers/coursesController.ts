import { Request, Response } from "express";
import { courseServices } from "../services/courseService";
import { getPaginationParams } from "../helpers/getPaginationParams";

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

    // GET /courses/:id
    show: async (req: Request, res: Response) => {
        const { id } = req.params

        try {
            const course = await courseServices.findByIdWithEpisodes(id)
            return res.json(course)
        } catch (err) {
            if(err instanceof Error){
                return res.status(400).json({message: err.message})
            }
        }
    }
}