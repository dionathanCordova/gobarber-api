import { Request, Response } from 'express';
import MailProvider from '@shared/container/providers/MailProvider/implementations/EtherealMailProvider';
import SendForgotPasswordEmailService from '@modules/users/services/SendForgotPasswordEmailService';
import UserRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import UsersTokenRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

import HandlebarsMailTemplateProvider from '@shared/container/providers/MailTemplateProvider/implementations/HandleBarsMailTemplateProvider';

export default class ForgotPasswordController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { email } = request.body;

        const mailTemplateProvider = new HandlebarsMailTemplateProvider();
        const userRepository = new UserRepository();
        const mailProvider = new MailProvider(mailTemplateProvider);
        const usersTokenRepository = new UsersTokenRepository();

        const sendForgotPasswordEmail = new SendForgotPasswordEmailService(
            userRepository,
            mailProvider,
            usersTokenRepository,
        );
        // const sendForgotPasswordEmail = container.resolve(
        //     SendForgotPasswordEmailService,
        // );
        await sendForgotPasswordEmail.execute({
            email,
        });

        return response.status(204).json();
    }
}
