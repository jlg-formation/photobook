import express from "express";
import session from "express-session";
import morgan from "morgan";
import { crudity } from "crudity";
import { createServer } from "http";
import { auth, checkAuth } from "./auth";
import { upload } from "./upload/upload.router";

declare module "express-session" {
  interface SessionData {
    user?: { displayName: string };
  }
}

const port = 3000;
const publicDir = "./public";

const app = express();
const server = createServer(app);

app.use(morgan("tiny"));

app.use(
  session({
    name: "photobook.sid",
    secret: "do not change this secret or all session will be reset...",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(express.json());

app.use("/api", (req, res, next) => {
  setTimeout(() => {
    next();
  }, 2000);
});
app.use("/api/auth", auth);
app.use("/api/upload", checkAuth, upload);

app.use(
  "/api/articles",
  checkAuth,
  crudity(server, "articles", {
    pageSize: 100,
  })
);
app.use(express.static(publicDir));

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
