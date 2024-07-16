import { initMongoDb } from "./src/daos/mongodb/connection.js";
import express from "express";
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import handlebars from "express-handlebars";
import productRouter from "./src/routes/productsRouter.js";
import cartRouter from "./src/routes/cartRouter.js";
import userRouter from "./src/routes/user.router.js";
 import viewsRouter from "./src/routes/views.router.js";
 import { errorHandler } from "./src/middlewares/errorHandler.js";
import { __dirname } from "./src/path.js";
import passport from "passport";
/* import './passport/localStrategy.js'
import './passport/githubStrategy.js' */
import cors from 'cors'
import 'dotenv/config'
import config from 
'./config.js'
console.log(config)

const storeConfig = {
    store: MongoStore.create({
        mongoUrl: config.MONGO_URL,
        crypto: { secret: config.SECRET_KEY },
        ttl: 180,
    }),
    secret: config.SECRET_KEY,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 180000 }
};

const app = express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session(storeConfig));


app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");


 app.use(passport.initialize());
app.use(passport.session()); 

app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/api/users", userRouter);
app.use("/", viewsRouter);

app.use(errorHandler);

initMongoDb();

const PORT = config.PORT ;
const MODE = config.NODE_ENV
app.listen(PORT, () => console.log(`SERVER OK in port: ${PORT} Mode: ${MODE}`));


  