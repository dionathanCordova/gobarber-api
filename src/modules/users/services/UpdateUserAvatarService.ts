import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/User';
import { inject } from 'tsyringe';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import IUserRepository from '../repositories/IUserRepository';

interface IRequest {
    user_id: string;
    avatarFileName: string;
}

class UpdateUserAvatarService {
    constructor(
        private usersRepository: IUserRepository,
        @inject('StorageProvider')
        private storageProvider: IStorageProvider,
    ) {}

    public async execute({ user_id, avatarFileName }: IRequest): Promise<User> {
        const user = await this.usersRepository.findById(user_id);

        if (!user) {
            throw new AppError(
                'Only authenticated users can change avatar',
                401,
            );
        }

        if (user.avatar) {
            // const userAvatarFilePath = path.join(
            //     uploadConfig.directory,
            //     user.avatar,
            // );
            // const userAvatarFileExists = await fs.promises.stat(
            //     userAvatarFilePath,
            // );
            // if (userAvatarFileExists) {
            //     await fs.promises.unlink(userAvatarFilePath);
            // }
            await this.storageProvider.deleteFile(user.avatar);
        }

        const fileName = await this.storageProvider.savefile(avatarFileName);

        user.avatar = fileName;
        await this.usersRepository.save(user);

        return user;
    }
}

export default UpdateUserAvatarService;
