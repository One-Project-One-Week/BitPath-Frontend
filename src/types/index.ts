export interface User {
	id: number;
	name: string;
	longest_streak: number;
	current_streak: number;
	last_studied_date: string;
	profile_picture: string;
	roadmap_count: number;
}

export interface Skill {
	id?: number;
	roadmap_id?: number;
	skill: string;
	duration: string;
	recommendedResource: RecommendedResource[];
	why: string;
	level: string;
}

export interface RecommendedResource {
	id?: number;
	skill_id?: number;
	name: string;
	link: string;
}

export interface Roadmap {
	id?: number;
	user_id?: number;
	title: string;
	estimatedTime?: string;
	skills: Skill[] | string[];
}

export interface Profile {
	id: number;
	name: string;
	email: string;
	longest_streak: string;
	profile_picture: string;
	current_streak: string;
	last_studied_date: string | null;
}

export type PlanType = "deadline" | "tpd";
export interface BaseRequest {
	skill_id: number;
	type: PlanType;
}

export interface DeadlineRequest extends BaseRequest {
	type: "deadline";
	days: number;
}

export interface DurationRequest extends BaseRequest {
	type: "tpd";
	duration: string;
}

export type PlanRequest = DeadlineRequest | DurationRequest;

export interface Task {
	id: number;
	day_number: number;
	is_finished: number;
	task: string;
	topic: string;
}

export interface Plan {
	id: number;
	completed_tasks: number;
	total_tasks: number;
	is_finished: number;
	tasks?: Task[];
	skill_name: string;
}
