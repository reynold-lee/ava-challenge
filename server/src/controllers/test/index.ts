import { Request, Response } from "express";

export const ping = async (req: Request, res: Response) => {
  res.status(200).json({ ok: true, msg: "pong" });
};

export const info = async (req: Request, res: Response) => {
  res.status(200).json({
    ok: true,
    author: {
      email: "erikblue@gmail.com",
      name: "Erik",
    },
    frontend: {
      url: "http://localhost:3002",
    },
    language: "node.js",
    sources:
      "https://github.com/reynold-lee/ava-challenge/server & https://github.com/reynold-lee/ava-challenge/client",
  });
};
