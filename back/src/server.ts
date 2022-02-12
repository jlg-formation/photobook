import express from "express";
import session from "express-session";
import morgan from "morgan";
import { auth } from "./auth";

declare module "express-session" {
  interface SessionData {
    user?: { displayName: string };
  }
}

const port = 3000;
const publicDir = "./public";

const app = express();

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
app.use(express.static(publicDir));

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
