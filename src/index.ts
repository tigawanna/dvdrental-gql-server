import 'reflect-metadata'
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from 'cors';
import { logError, logNormal } from "./utils/helpers";
import { AppDataSource } from "./typeorm";
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'
import { helloResolver } from "./resolvers/hello";
import { MyContext } from "./types/general";
import { FilmResolver } from "./resolvers/film/film_resolver";

const PORT = 5000;

const startServer = async () => {
  dotenv.config();

  const app: Express = express();
  const port = process.env.PORT ? process.env.PORT : PORT;
  const allowedOrigins = ['http://localhost:3000', 'https://studio.apollographql.com'];
  const corsOptions = {
    credentials: true,
    origin: function (origin: any, callback: any) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        var msg = 'The CORS policy for this site does not ' +
          'allow access from the specified Origin.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    }
  }
  app.use(cors(corsOptions))
  app.use(express.json());
  app.use(express.static("public"));

  app.get("/", (_: Request, res: Response) => {
    res.json({ message: "Hello World!" });
  });


  AppDataSource.initialize().then(async () => {

    const apolloServer = new ApolloServer({
      schema: await buildSchema({
        resolvers: [helloResolver,FilmResolver],
        validate: false
      }),
      context: ({ req, res }): MyContext => ({ req, res })
    });

    await apolloServer.start()
    apolloServer.applyMiddleware({ app, cors: corsOptions });
    app.listen(port, () => {
      logNormal(`⚡️[server]: Server is running at http://localhost:${PORT}`);
    });
    console.log("Data Source has been initialized!")
  })
    .catch((err) => {
      console.error("Error during Data Source initialization", err)
    })
  // AppDataSource.initialize()
  //   .then(() => {
  //     console.log("Data Source has been initialized!")
  //     app.listen(port, () => {
  //       logNormal(`⚡️[server]: Server is running at http://localhost:${PORT}`);
  //     });
  //   })
  //   .catch((err) => {
  //     console.error("Error during Data Source initialization", err)
  //   })


};
startServer().catch((e) => logError("error starting server======== ", e));
