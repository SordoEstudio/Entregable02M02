import dotenv from 'dotenv'
const ENV = process.argv.slice(2)[0]
dotenv.config({path: ENV === 'prod'? './.env.prod':'./.env.dev'}) 

export default {
    NODE_ENV: process.env.NODE_ENV ,
    PORT: process.env.PORT,
    PERSISTENCE: process.env.PERSISTENCE,
    MONGO_URL: process.env.MONGO_URL,
    SECRET_KEY: process.env.SECRET_KEY,
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET:process.env.CLIENT_SECRET,
    CALLBACK_URL: process.env.CALLBACK_URL,
    
}