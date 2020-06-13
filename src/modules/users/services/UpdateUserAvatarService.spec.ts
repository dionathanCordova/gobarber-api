import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStoragerProvider';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import UpdateUserAvatarService from './UpdateUserAvatarService';

let fakeUsersRepository: FakeUsersRepository;
let fakeStorageProvider: FakeStorageProvider;
let updateUserAvatar: UpdateUserAvatarService;

describe('UpdateUserAvatar', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeStorageProvider = new FakeStorageProvider();
        updateUserAvatar = new UpdateUserAvatarService(
            fakeUsersRepository,
            fakeStorageProvider,
        );
    });
    it('should be able update avatar', async () => {
        const userCreate = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        });

        await updateUserAvatar.execute({
            user_id: userCreate.id,
            avatarFileName: 'avatar-user.jpg',
        });

        expect(userCreate.avatar).toBe('avatar-user.jpg');
    });

    it('should not be able to update avatar from non existing user', async () => {
        await expect(
            updateUserAvatar.execute({
                user_id: 'non-existing-user',
                avatarFileName: 'avatar-user.jpg',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should delete old avatar when update a new one', async () => {
        const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

        const userCreate = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        });

        await updateUserAvatar.execute({
            user_id: userCreate.id,
            avatarFileName: 'avatar-user.jpg',
        });

        await updateUserAvatar.execute({
            user_id: userCreate.id,
            avatarFileName: 'avatar2-user.jpg',
        });

        expect(deleteFile).toHaveBeenCalledWith('avatar-user.jpg');

        expect(userCreate.avatar).toBe('avatar2-user.jpg');
    });
});
