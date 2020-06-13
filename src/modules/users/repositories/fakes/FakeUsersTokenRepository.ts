import IUsersTokenRepository from '@modules/users/repositories/IUsersTokenRepository';

import UserToken from '@modules/users/infra/typeorm/entities/UserToken';
import { uuid } from 'uuidv4';

class FakeUsersTokenRepository implements IUsersTokenRepository {
    private userTokens: UserToken[] = [];

    public async generate(user_id: string): Promise<UserToken> {
        const userToken = new UserToken();

        Object.assign(userToken, {
            id: uuid(),
            token: uuid(),
            user_id,
            created_at: new Date(),
            updaated_at: new Date(),
        });

        this.userTokens.push(userToken);

        return userToken;
    }

    public async findByToken(token: string): Promise<UserToken | undefined> {
        const user = await this.userTokens.find(
            tokenUser => tokenUser.token === token,
        );

        return user;
    }
}

export default FakeUsersTokenRepository;
