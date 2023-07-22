import dotenv from 'dotenv'

dotenv.config()
dotenv.config({ path: '../.env'})

export const PORT: string = process.env.PORT!
export const MYSQL_PORT: string = process.env.MYSQL_PORT!
export const MYSQL_HOST: string = process.env.MYSQL_HOST!
export const MYSQL_USER: string = process.env.MYSQL_USER!
export const MYSQL_ROOT_PASSWORD: string = process.env.MYSQL_ROOT_PASSWORD!
export const MYSQL_DATABASE: string = process.env.MYSQL_DATABASE!
export const MYSQL_ROOT_USER: string = process.env.MYSQL_ROOT_USER!             // for local db managemnt 
export const MYSQL_ADMIN_DATABASE: string = process.env.MYSQL_ADMIN_DATABASE!   // scripts only.
export const JWT_SECRET: string = process.env.JWT_SECRET!
 