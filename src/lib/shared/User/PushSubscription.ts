import { Entity, Fields, Relations } from 'remult';
import { User } from './User';

// https://developer.mozilla.org/en-US/docs/Web/API/PushSubscription
// contains endpoint, p256dh, auth, and userId

@Entity('user_push_subscription', {
	allowApiCrud: true
})
export class PushSubscription {
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
	@Relations.toOne<PushSubscription, User>(() => User, 'userId')
	user!: User;

	@Fields.createdAt()
	createdAt!: Date;
}
