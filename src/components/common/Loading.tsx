import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface LoadingAnimationProps {
	color?: string;
	size?: number;
	thickness?: number;
}

export default function LoadingAnimation({
	color = "#10b981", // Default to emerald-500
	size = 200,
	thickness = 3,
}: LoadingAnimationProps) {
	const [progress, setProgress] = useState(0);
	const [dotCount, setDotCount] = useState(0);

	// Simulate loading progress
	useEffect(() => {
		const progressInterval = setInterval(() => {
			setProgress((prev) => {
				if (prev >= 100) return 0;
				return prev + 2.5;
			});
		}, 200);

		// Animate the dots
		const dotInterval = setInterval(() => {
			setDotCount((prev) => (prev + 1) % 4);
		}, 400);

		return () => {
			clearInterval(progressInterval);
			clearInterval(dotInterval);
		};
	}, []);

	const radius = size / 2 - thickness * 2;
	const circumference = 2 * Math.PI * radius;
	const strokeDashoffset = circumference - (progress / 100) * circumference;

	// Calculate positions for 8 nodes around the circle
	const nodeCount = 8;
	const nodePositions = Array.from({ length: nodeCount }).map((_, index) => {
		const angle = (index * 2 * Math.PI) / nodeCount - Math.PI / 2; // Start from top
		return {
			x: size / 2 + radius * Math.cos(angle),
			y: size / 2 + radius * Math.sin(angle),
		};
	});

	// Only show nodes that have been "reached" by the progress
	const visibleNodes = nodePositions.filter((_, index) => {
		const nodeThreshold = (index + 1) * (100 / nodeCount);
		return progress >= nodeThreshold;
	});

	// Generate loading dots
	const loadingDots = ".".repeat(dotCount);

	return (
		<div className="flex items-center justify-center p-40">
			<div className="relative" style={{ width: size, height: size }}>
				{/* Background circle */}
				<svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
					<circle
						cx={size / 2}
						cy={size / 2}
						r={radius}
						fill="none"
						stroke="#e5e7eb" // Gray-200
						strokeWidth={thickness}
					/>
				</svg>

				{/* Progress circle */}
				<svg
					className="absolute top-0 left-0"
					width={size}
					height={size}
					viewBox={`0 0 ${size} ${size}`}
					style={{ transform: "rotate(-90deg)" }}
				>
					<motion.circle
						cx={size / 2}
						cy={size / 2}
						r={radius}
						fill="none"
						stroke={color}
						strokeWidth={thickness}
						strokeLinecap="round"
						strokeDasharray={circumference}
						initial={{ strokeDashoffset: circumference }}
						animate={{ strokeDashoffset }}
						transition={{ duration: 0.3, ease: "easeInOut" }}
					/>
				</svg>

				{/* Nodes */}
				<svg
					className="absolute top-0 left-0"
					width={size}
					height={size}
					viewBox={`0 0 ${size} ${size}`}
				>
					{visibleNodes.map((pos, index) => (
						<motion.circle
							key={index}
							cx={pos.x}
							cy={pos.y}
							r={thickness * 1.8}
							fill={color}
							initial={{ scale: 0, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							transition={{
								duration: 0.5,
								delay: 0.1,
								type: "spring",
								stiffness: 300,
								damping: 15,
							}}
						/>
					))}
				</svg>

				{/* Text in the center with animated dots */}
				<div className="absolute inset-0 flex flex-col items-center justify-center text-center">
					<motion.div
						className="text-lg font-medium"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.5 }}
					>
						{progress < 100
							? `Building Path${loadingDots}`
							: "A Moment Please..."}
					</motion.div>
				</div>
			</div>
		</div>
	);
}
