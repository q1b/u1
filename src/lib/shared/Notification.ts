import { Entity, Fields, Relations } from 'remult';
import { User } from './User';

@Entity('notifications', {
	allowApiCrud: true
})
export class Notification {
	@Fields.cuid()
	id!: string;

	@Fields.string({ required: true })
	title!: string;

	@Fields.string({ required: true })
	body!: string;

	@Fields.string()
	status: string = 'idle';

	@Fields.string({ required: true })
	userId!: string;
	@Relations.toOne<Notification, User>(() => User, 'userId')
	user!: User;

	@Fields.createdAt()
	createdAt!: Date;
}
