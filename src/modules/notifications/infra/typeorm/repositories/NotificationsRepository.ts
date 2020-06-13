import { getMongoRepository, MongoRepository } from 'typeorm';

import Notifications from '@modules/notifications/infra/typeorm/schemas/Notifications';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import ICreateNotigicationDTO from '@modules/notifications/dtos/ICreateNotificationDTO';

class NotificationsRepository implements INotificationsRepository {
    private ormRepository: MongoRepository<Notifications>;

    constructor() {
        this.ormRepository = getMongoRepository(Notifications, 'mongo');
    }

    public async create({
        content,
        recipient_id,
    }: ICreateNotigicationDTO): Promise<Notifications> {
        const notification = this.ormRepository.create({
            content,
            recipient_id,
        });
        this.ormRepository.save(notification);

        return notification;
    }
}

export default NotificationsRepository;
