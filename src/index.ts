import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import  cors  from 'cors';
import { logError, logNormal, logSuccess } from "./utils/helpers";

const PORT = 5000;

const startServer = async () => {
  dotenv.config();

  const app: Express = express();
  const port = process.env.PORT ? process.env.PORT : PORT;
  const allowedOrigins = ['http://localhost:3000','https://studio.apollographql.com'];
  const corsOptions = {
    credentials: true,
    origin: function (origin: any, callback:any) {
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

  app.get("/", (req: Request, res: Response) => {
    res.json({ message: "Hello World!" });
  });



  app.listen(port, () => {
  logNormal(`⚡️[server]: Server is running at http://localhost:${PORT}`);
  });
};
startServer().catch((e) => logError("error starting server======== ", e));
