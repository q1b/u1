import { Entity, Fields, Relations } from 'remult';
import { User } from './User';

@Entity('user_feedback', {
	allowApiCrud: true
})
export class Feedback {
	@Fields.cuid()
	id!: string;

	@Fields.string({ required: true })
	userId!: string;
	@Relations.toOne<Feedback, User>(() => User, 'userId')
	user!: User;

	@Fields.string({ required: true })
	content!: string;

	@Fields.createdAt()
	createdAt?: Date;
}
