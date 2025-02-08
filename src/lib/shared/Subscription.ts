import { Entity, Fields, Relations } from 'remult';
import { User } from './User';

@Entity('subscriptions', {
	allowApiCrud: true
})
export class Subscription {
	@Fields.cuid()
	id!: string;

	@Fields.string()
	endpoint!: string;

	@Fields.string()
	p256dh!: string;

	@Fields.string()
	auth!: string;

	@Fields.string({ required: true })
	userId!: string;
	@Relations.toOne<Subscription, User>(() => User, 'userId')
	user!: User;

	@Fields.createdAt()
	createdAt!: Date;
}
