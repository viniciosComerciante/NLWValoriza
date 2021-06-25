import { getCustomRepository } from "typeorm"
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken"
import { UsersRepositories } from "../repositories/UsersRepositories"

interface IAuthenticateRequest {
    email: string;
    password: string;
}

class AuthenticateUserService {
    async execute({ email, password }: IAuthenticateRequest) {
        const usersRepository = getCustomRepository(UsersRepositories)

        //Verficar se o email existe
        const user = await usersRepository.findOne({
            email
        })

        if (!user) throw new Error("Email/Password incorrect")

        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) throw new Error("Email/Password incorrect")

        //verificar se senha está correta

        const token = sign({
            email: user.email,
        }, "9d5e91ac70925969ec7784f3602f341b", {
            subject: user.id,
            expiresIn: "1d"
        })

        return token;
    }
}

export { AuthenticateUserService }