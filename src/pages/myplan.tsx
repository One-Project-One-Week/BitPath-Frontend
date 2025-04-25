import TaskCard from "@/components/plans/TaskCard";
import { useState } from "react";

const MyPlans = () => {
	const [learningData, setLearningData] = useState([
		{
			topic: "CSS Selectors",
			task: "Learn basic CSS selectors (element, class, ID) and practice selecting elements on a sample HTML page.",
			dayNumber: 1,
			completed: false,
		},
		{
			topic: "CSS Box Model",
			task: "Understand the CSS box model (content, padding, border, margin) and practice applying it to style elements.",
			dayNumber: 2,
			completed: false,
		},
		{
			topic: "CSS Properties",
			task: "Learn and practice using common CSS properties like color, font, text-align, background, etc.",
			dayNumber: 3,
			completed: false,
		},
		{
			topic: "CSS Positioning",
			task: "Learn about different positioning methods (static, relative, absolute, fixed) and practice positioning elements on a page.",
			dayNumber: 4,
			completed: false,
		},
		{
			topic: "CSS Flexbox",
			task: "Learn the basics of Flexbox and practice creating flexible layouts using it.",
			dayNumber: 5,
			completed: false,
		},
		{
			topic: "CSS Grid",
			task: "Learn the basics of CSS Grid and practice creating grid-based layouts.",
			dayNumber: 6,
			completed: false,
		},
		{
			topic: "CSS Units",
			task: "Understand different CSS units (px, em, rem, %, vw, vh) and practice using them appropriately.",
			dayNumber: 7,
			completed: false,
		},
		{
			topic: "CSS Responsive Design",
			task: "Learn about media queries and how to create responsive designs that adapt to different screen sizes.",
			dayNumber: 8,
			completed: false,
		},
		{
			topic: "CSS Pseudo-classes and Pseudo-elements",
			task: "Learn about pseudo-classes (e.g., :hover, :focus) and pseudo-elements (e.g., ::before, ::after) and practice using them.",
			dayNumber: 9,
			completed: false,
		},
		{
			topic: "CSS Preprocessors (Optional)",
			task: "Explore a CSS preprocessor like Sass or Less (optional, depending on time).",
			dayNumber: 10,
			completed: true,
		},
	]);

	// Toggle completion status of a day
	const toggleCompletion = (dayNumber: number) => {
		setLearningData(
			learningData.map((day) =>
				day.dayNumber === dayNumber
					? { ...day, completed: !day.completed }
					: day
			)
		);
	};
	return (
		<div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 p-12">
			{learningData.map((day) => (
				<TaskCard
					key={day.dayNumber}
					completed={day.completed}
					topic={day.topic}
					dayNumber={day.dayNumber}
					task={day.task}
					onToggleCompletion={toggleCompletion}
				/>
			))}
		</div>
	);
};

export default MyPlans;
