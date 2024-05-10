import { Request, Response } from "express";
import { courseServices } from "../services/courseService";

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