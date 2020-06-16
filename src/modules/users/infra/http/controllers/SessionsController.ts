import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

// import UserRopository from '@modules/users/infra/typeorm/repositories/UsersRepository';
// import CreateUserService from '@modules/users/services/CreateUserService';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

export default class SessionsController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        try {
            const { email, password } = request.body;

            // const userRopository = new UserRopository();
            // const createUser = new CreateUserService(userRopository);

            const createUser = container.resolve(AuthenticateUserService);

            const { user, token } = await createUser.execute({
                email,
                password,
            });

            console.log(user);

            return response.json({ user: classToClass(user), token });
        } catch (err) {
            return response.status(400).json({ error: err.message });
        }
    }
}
