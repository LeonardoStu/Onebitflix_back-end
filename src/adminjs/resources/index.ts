import { ResourceWithOptions } from "adminjs";
import { Category, Course } from "../../models";
import { categoryResourcesOptions } from "./category";
import { courseResourceOptions } from "./Course";

export const adminJsResources: ResourceWithOptions[] = [
    {
        resource: Category,
        options: categoryResourcesOptions
    },
    {
        resource: Course,
        options: courseResourceOptions
    }
]