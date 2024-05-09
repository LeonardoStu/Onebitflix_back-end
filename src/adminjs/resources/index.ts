import { ResourceWithOptions } from "adminjs";
import { Category, Course, Episode, User } from "../../models";
import { categoryResourcesOptions } from "./category";
import { courseResourceFeatures, courseResourceOptions } from "./Course";
import { episodeResourceFeatures, episodeResourceOptions } from "./episode";
import { userResourceOptions } from "./user";

export const adminJsResources: ResourceWithOptions[] = [
    {
        resource: Category,
        options: categoryResourcesOptions
    },
    {
        resource: Course,
        options: courseResourceOptions,
        features: courseResourceFeatures
    },
    {
        resource: Episode,
        options: episodeResourceOptions,
        features: episodeResourceFeatures
    },
    {
        resource: User,
        options: userResourceOptions
    }
]