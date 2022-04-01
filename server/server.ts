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

app.use(cors());

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
