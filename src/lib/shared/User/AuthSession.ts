import { Entity, Fields, Relations } from 'remult';
import { User } from './User';

@Entity('user_auth_session', {
	allowApiCrud: true
})
export class AuthSession {
	@Fields.cuid()
	id!: string;

	@Fields.string({ required: true })
	userId!: string;
	@Relations.toOne<AuthSession, User>(() => User, 'userId')
	user!: User;

	@Fields.date()
	expiresAt!: Date;
}
