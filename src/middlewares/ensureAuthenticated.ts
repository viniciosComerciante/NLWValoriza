import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken"

interface IPayload {
    sub: string;
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {

    //receber o token
    const authToken = request.headers.authorization;

    if (!authToken) {
        return response.status(401).end(); //o end pega a mensagem padrão do erro 401
    }

    const [, token] = authToken.split(" ");

    try {
        const { sub } = verify(token, "9d5e91ac70925969ec7784f3602f341b") as IPayload;
        request.user_id = sub;
        return next();
    } catch (err) {
        return response.status(401).end();
    }

}