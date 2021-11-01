import { NestMiddleware } from "@nestjs/common";
import { Request, Response } from "express";

export class RequestAccountMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function): any {
    console.log(`Method: [${req.method}] | ${req.path}`)
    next()
  }
}