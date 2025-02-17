import { Entity, Fields, Relations } from 'remult';
import { AuthSession } from './AuthSession';
import { PushSubscription } from './PushSubscription';
import { Notification } from './Notification';
import { Feedback } from './Feedback';

@Entity('user', {
	allowApiCrud: true
})
export class User {
	@Fields.cuid()
	id!: string;

	@Fields.string()
	googleId?: string;

	@Fields.string()
	name?: string;

	@Relations.toMany(() => Feedback)
	feedbacks?: Feedback[];

	@Relations.toMany(() => AuthSession)
	auth_sessions?: AuthSession[];

	@Relations.toMany(() => Notification)
	notifications?: Notification[];

	@Relations.toMany(() => PushSubscription)
	push_subscriptions?: PushSubscription[];

	@Fields.createdAt()
	createdAt?: Date;
}
