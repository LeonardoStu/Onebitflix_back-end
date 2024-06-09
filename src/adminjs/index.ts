import AdminJS from "adminjs";
import AdminJSExpress from '@adminjs/express'
import session from "express-session"
import connectSession from "connect-session-sequelize"
import AdminJSSequelize from '@adminjs/sequelize'
import { sequelize } from "../database";
import { adminJsResources } from "./resources";
import { locale } from "./locale";
import { dashboardOptions } from "./dashboard";
import { brandingOptions } from "./branding";
import { authenticationOptions } from "./authentication";
import { ADMINJS_COOKIE_PASSWORD } from "../config/environment";

const SequelizeStore = connectSession(session.Store)
const store = new SequelizeStore({ db: sequelize})
store.sync()

AdminJS.registerAdapter(AdminJSSequelize)

export const adminjs = new AdminJS({
    databases: [sequelize],
    rootPath: '/admin',
    resources: adminJsResources,
    branding: brandingOptions,
    locale: locale,
    dashboard: dashboardOptions
})

export const adminJsRouter = AdminJSExpress.buildAuthenticatedRouter(adminjs,
    authenticationOptions, 
     null, 
    {
        resave: false, 
        saveUninitialized: false,
        store: store,
        secret: ADMINJS_COOKIE_PASSWORD
    }
)