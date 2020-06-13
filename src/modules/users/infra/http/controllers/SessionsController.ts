import { Request, Response } from 'express';

import UserRopository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import CreateUserService from '@modules/users/services/CreateUserService';

export default class SessionsController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        try {
            const { name, email, password } = request.body;

            const userRopository = new UserRopository();
            const createUser = new CreateUserService(userRopository);

            const user = await createUser.execute({ name, email, password });

            return response.json(user);
        } catch (err) {
            return response.status(400).json({ error: err.message });
        }
    }
}
