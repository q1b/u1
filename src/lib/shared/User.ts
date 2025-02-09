import { Entity, Fields, Relations } from 'remult';
import { Session } from './Session';
import { Subscription } from './Subscription';
import { Notification } from './Notification';
import { Feedback } from './Feedback';

@Entity('users', {
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

	@Relations.toMany(() => Session)
	sessions?: Session[];

	@Relations.toMany(() => Notification)
	notifications?: Notification[];

	@Relations.toMany(() => Subscription)
	subscriptions?: Subscription[];

	@Fields.createdAt()
	createdAt?: Date;
}
