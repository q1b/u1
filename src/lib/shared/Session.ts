import { Entity, Fields, Relations } from 'remult';
import { User } from './User';

@Entity('sessions', {
	allowApiCrud: true
})
export class Session {
	@Fields.cuid()
	id!: string;

	@Fields.string({ required: true })
	userId!: string;
	@Relations.toOne<Session, User>(() => User, 'userId')
	user!: User;

	@Fields.date()
	expiresAt!: Date;
}
