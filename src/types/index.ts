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
	skills: Skill[];
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
