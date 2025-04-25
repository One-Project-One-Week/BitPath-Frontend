import { motion } from "framer-motion";

interface PageTransitionProps {
	color?: string;
	size?: number;
}

export default function PageTransition({
	color = "#10b981",
	size = 60,
}: PageTransitionProps) {
	// Path animation variants
	const pathVariants = {
		hidden: { pathLength: 0 },
		visible: {
			pathLength: 1,
			transition: {
				duration: 0.8,
				ease: "easeInOut",
				repeat: Number.POSITIVE_INFINITY,
				repeatType: "loop" as const,
				repeatDelay: 0.2,
			},
		},
	};

	// Dot animation variants
	const dotVariants = {
		hidden: { scale: 0, opacity: 0 },
		visible: (custom: number) => ({
			scale: 1,
			opacity: 1,
			transition: {
				delay: custom * 0.2,
				duration: 0.3,
				repeat: Number.POSITIVE_INFINITY,
				repeatType: "loop" as const,
				repeatDelay: 0.8,
			},
		}),
	};

	return (
		<div className="flex items-center justify-center w-full h-full">
			<motion.svg
				width={size}
				height={size}
				viewBox="0 0 50 50"
				initial="hidden"
				animate="visible"
			>
				{/* Path line */}
				<motion.path
					d="M5,25 Q15,5 25,25 Q35,45 45,25"
					fill="transparent"
					stroke={color}
					strokeWidth="3"
					strokeLinecap="round"
					variants={pathVariants}
				/>

				{/* Dots along the path */}
				<motion.circle
					cx="5"
					cy="25"
					r="3"
					fill={color}
					custom={0}
					variants={dotVariants}
				/>
				<motion.circle
					cx="25"
					cy="25"
					r="3"
					fill={color}
					custom={1}
					variants={dotVariants}
				/>
				<motion.circle
					cx="45"
					cy="25"
					r="3"
					fill={color}
					custom={2}
					variants={dotVariants}
				/>
			</motion.svg>
		</div>
	);
}
