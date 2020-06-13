import { Request, Response } from 'express';

import UserRopository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import StorageProvider from '@shared/container/providers/StorageProvider/implementations/DiscStorageProvider';

export default class UserAvatarController {
    public async update(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const userRopository = new UserRopository();
        const storageProvider = new StorageProvider();
        const updateUserAvatar = new UpdateUserAvatarService(
            userRopository,
            storageProvider,
        );

        const user = await updateUserAvatar.execute({
            user_id: request.user.id,
            avatarFileName: request.file.filename,
        });
        delete user.password;

        return response.json(user);
    }
}
