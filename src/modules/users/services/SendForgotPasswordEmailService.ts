import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import path from 'path';
import IUserRepository from '../repositories/IUserRepository';
import IUsersTokenRepository from '../repositories/IUsersTokenRepository';

interface IRequest {
    email: string;
}

@injectable()
class SendForgotPasswordEmailService {
    constructor(
        @inject('UserRepository')
        private usersRepository: IUserRepository,

        @inject('MailProvider')
        private mailProvider: IMailProvider,

        private userToken: IUsersTokenRepository,
    ) {}

    public async execute({ email }: IRequest): Promise<void> {
        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new AppError('User does not exist');
        }

        const token = await this.userToken.generate(user.id);
        const forgotPasswordTemplate = path.resolve(
            __dirname,
            '..',
            'views/forgot_password.hbs',
        );

        await this.mailProvider.sendMail({
            to: { name: user.name, email: user.email },
            subject: 'Recuperação de senha',
            templateData: {
                file: forgotPasswordTemplate,
                variables: {
                    name: user.name,
                    link: `http://localhost:3000/reset_password?token=${token.user_id}`,
                },
            },
        });
    }
}

export default SendForgotPasswordEmailService;
