import { inject } from 'tsyringe';
import { differenceInHours } from 'date-fns';
import AppError from '@shared/errors/AppError';
import IUserRepository from '../repositories/IUserRepository';
import IUsersTokenRepository from '../repositories/IUsersTokenRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
    token: string;
    password: string;
}

class ResetPasswordEmailService {
    constructor(
        private usersRepository: IUserRepository,
        private userTokenRepository: IUsersTokenRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider,
    ) {}

    public async execute({ token, password }: IRequest): Promise<void> {
        const userToken = await this.userTokenRepository.findByToken(token);

        if (!userToken) {
            throw new AppError('User Token does not exists');
        }

        const user = await this.usersRepository.findById(userToken.user_id);

        if (!user) {
            throw new AppError('User does not exists');
        }

        const tokenCreatedAt = userToken.created_at;

        if (differenceInHours(Date.now(), tokenCreatedAt) > 2) {
            throw new AppError('Time expired, send a new request ');
        }

        user.password = await this.hashProvider.generateHash(password);
        await this.usersRepository.save(user);
    }
}

export default ResetPasswordEmailService;
