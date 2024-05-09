import AdminJS, { PageHandler } from "adminjs"
import { Category, Course, Episode, User } from "../models"

export const dashboardOptions: {
    handler?: PageHandler,
    component?: string
} = {
    component: AdminJS.bundle('./components/Dashboard'),
        handler: async (req, res, context) => {
            const courses = await Course.count()
            const episodes = await Episode.count()
            const category = await Category.count()
            const users = await User.count({where: {role: 'user'}})

            res.json({
                'Cursos': courses,
                'Episodios': episodes,
                'Categorias': category,
                'Usuários': users
            })
        }
}