import { Request, Response } from "express";
import { Category } from "../models";
import { categoryServices } from "../services/categoryServices";
import { getPaginationParams } from "../helpers/getPaginationParams";

export const categoriesController = {
    index: async(req: Request, res: Response) => {
        const [page, perPage] = getPaginationParams(req.query)

        try {
           const paginatedCategories = await categoryServices.findAllPaginate(page, perPage)
            
            return res.json(paginatedCategories)
            
        } catch (err) {
            if(err instanceof Error){
                return res.status(400).json({message: err.message})
            }
        }
    },

    show: async(req: Request, res: Response) => {
        const { id } = req.params

        try {
            const category = await categoryServices.findeByIdWithCourses(id)
            return res.json(category)
        } catch (err) {
            if(err instanceof Error){
                return res.status(400).json({message: err.message})
            }
        }
    }
}