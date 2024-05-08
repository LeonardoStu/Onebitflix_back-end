import { ResourceWithOptions } from "adminjs";
import { Category } from "../../models";
import { categoryResourcesOptions } from "./category";

export const adminJsResources: ResourceWithOptions[] = [
    {
        resource: Category,
        options: categoryResourcesOptions
    }
]