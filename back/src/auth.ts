import { NextFunction, Request, Response, Router } from "express";

const app = Router();

app.get("/isConnected", (req, res) => {
  if (req.session.user) {
    res.json(req.session.user);
    return;
  }
  res.status(401).end();
});

app.post("/connect", (req, res) => {
  const credentials: { email: string; password: string } = req.body;
  console.log("credentials: ", credentials);
  if (credentials.email !== "jlg@jlg.com") {
    res.status(401).end();
    return;
  }
  req.session.user = { displayName: "Jean-Louis GUENEGO" };
  res.json(req.session.user);
});

app.post("/disconnect", (req, res) => {
  req.session.user = undefined;
  res.status(200).end();
});

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  if (req.session.user === undefined) {
    res.status(401).end();
    return;
  }
  next();
};

export const auth = app;
