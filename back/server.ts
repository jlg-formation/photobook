import express from "express";
import session from "express-session";

declare module "express-session" {
  interface SessionData {
    user?: { displayName: string };
  }
}

const port = 3000;

const app = express();

app.use(
  session({
    name: "photobook.sid",
    secret: "do not change this secret or all session will be reset...",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(express.json());

app.use((req, res, next) => {
  setTimeout(() => {
    next();
  }, 2000);
});

app.get("/api/isConnected", (req, res) => {
  if (req.session.user) {
    res.json(req.session.user);
    return;
  }
  res.status(401).end();
});

app.post("/api/connect", (req, res) => {
  const credentials: { email: string; password: string } = req.body;
  console.log("credentials: ", credentials);
  if (credentials.email !== "jlg@jlg.com") {
    res.status(401).end();
    return;
  }
  req.session.user = { displayName: "Jean-Louis GUENEGO" };
  res.json(req.session.user);
});

app.post("/api/disconnect", (req, res) => {
  req.session.user = undefined;
  res.status(200).end();
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
