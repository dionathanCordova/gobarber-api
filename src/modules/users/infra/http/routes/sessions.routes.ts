import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import UserRopository from '@modules/users/infra/typeorm/repositories/UsersRepository';

const sessionsRouter = Router();

sessionsRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        },
    }),
    async (request, response) => {
        const { email, password } = request.body;

        const userRopository = new UserRopository();
        const authenticateUser = new AuthenticateUserService(userRopository);

        const { user, token } = await authenticateUser.execute({
            email,
            password,
        });
        delete user.password;

        return response.json({ user, token });
    },
);

export default sessionsRouter;
