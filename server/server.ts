import express, { Express } from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";

import { mongoURI } from "./src/config/mongo";

import conversationRoutes from "./src/routes/conversation";
import mutation from "./src/routes/mutation";
import testRoutes from "./src/routes/test";

const app: Express = express();

const PORT: string | number = process.env.PORT || 3001;

var allowedOrigins = ["http://localhost:3000"];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin
      // (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        var msg =
          "The CORS policy for this site does not " +
          "allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  })
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({}));

app.use(conversationRoutes);
app.use(mutation);
app.use(testRoutes);

mongoose
  .connect(mongoURI)
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) => console.log(error));
