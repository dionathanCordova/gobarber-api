import FakeUserRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvider from './ListProvidersService';

let fakeUserRepository: FakeUserRepository;
let listProvider: ListProvider;

describe('ListProvider', () => {
    beforeEach(() => {
        fakeUserRepository = new FakeUserRepository();
        listProvider = new ListProvider(fakeUserRepository);
    });

    it('should be albe to list providers', async () => {
        const u1 = await fakeUserRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '1234',
        });

        const u2 = await fakeUserRepository.create({
            name: 'John Doe2',
            email: 'johndoe2@example.com',
            password: '1234',
        });

        const u3 = await fakeUserRepository.create({
            name: 'John Doe3',
            email: 'johndoe3@example.com',
            password: '1234',
        });

        const logged = await fakeUserRepository.create({
            name: 'Dionathan',
            email: 'dionathan@example.com',
            password: '1234',
        });

        const users = await listProvider.execute({ user_id: logged.id });

        expect(users).toEqual([u1, u2, u3]);
    });
});
