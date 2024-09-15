import { User } from './user.model';
import { Activity } from './activity.model';

export interface Inscription {
	inscription_id?: number;
	created_at?: string;
	user_id: User['user_id'];
	user_name: User['user_name'];
	last_name: User['last_name'];
	gender: User['gender'];
	birthdate: User['birthdate'];
	birthplace: User['birthplace'];
	phone: User['phone'];
	email?: User['email'];
	activity1_name: Activity['activity_name'];
	activity1_instructor: Activity['instructor'];
	activity1_day: Activity['day'];
	activity1_hour: Activity['hour'];
	activity2_name?: Activity['activity_name'];
	activity2_instructor?: Activity['instructor'];
	activity2_day?: Activity['day'];
	activity2_hour?: Activity['hour'];
	activity3_name?: Activity['activity_name'];
	activity3_instructor?: Activity['instructor'];
	activity3_day?: Activity['day'];
	activity3_hour?: Activity['hour'];
	abilities?: User['abilities'];
	fee: number;
	activities_selected: number;
	referred: string;
}