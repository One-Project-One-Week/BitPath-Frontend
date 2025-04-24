export interface Skill {
	skill: string;
	duration: string;
	recommendedResource: RecommendedResource[];
	why: string;
	level: string;
}

export interface RecommendedResource {
	name: string;
	link: string;
}

export interface Roadmap {
	title: string;
	skills: Skill[];
}
