import { motion } from "framer-motion";
import { useRef } from "react";

interface HeroBackgroundProps {
	width?: number;
	height?: number;
	color?: string;
	secondaryColor?: string;
	speed?: number;
}

export default function Background({
	width = 1200,
	height = 600,
	color = "#10b981",
	secondaryColor = "#f59e0b",
	speed = 10,
}: HeroBackgroundProps) {
	const svgRef = useRef<SVGSVGElement>(null);

	// Define paths - these create an interesting network pattern
	const paths = [
		"M100,300 Q300,100 500,300 T900,300",
		"M100,400 Q300,600 500,400 T900,400",
		"M300,100 Q500,300 700,100 T900,300",
		"M300,500 Q500,300 700,500 T900,300",
		"M200,200 L400,200 L600,400 L800,400",
		"M200,400 L400,400 L600,200 L800,200",
	];

	// Define dots along the paths that will transform into trophies
	const dots = [
		{ x: 100, y: 300, delay: 0, path: 0 },
		{ x: 500, y: 300, delay: 4, path: 0 },
		{ x: 900, y: 300, delay: 8, path: 0 },
		{ x: 100, y: 400, delay: 0, path: 1 },
		{ x: 500, y: 400, delay: 4, path: 1 },
		{ x: 900, y: 400, delay: 8, path: 1 },
		{ x: 300, y: 100, delay: 0, path: 2 },
		{ x: 700, y: 100, delay: 4, path: 2 },
		{ x: 300, y: 500, delay: 0, path: 3 },
		{ x: 700, y: 500, delay: 4, path: 3 },
		{ x: 200, y: 200, delay: 0, path: 4 },
		{ x: 600, y: 400, delay: 4, path: 4 },
		{ x: 200, y: 400, delay: 0, path: 5 },
		{ x: 600, y: 200, delay: 4, path: 5 },
	];

	// Animation for the flowing color along the paths
	const pathVariants = (index: number) => ({
		hidden: { pathLength: 0, pathOffset: 0 },
		visible: {
			pathLength: 1,
			pathOffset: 0,
			transition: {
				pathLength: {
					duration: speed,
					ease: "easeInOut",
					delay: index * 1.5,
				},
				pathOffset: {
					duration: 0,
				},
			},
		},
	});

	// Trophy SVG path data
	const trophyPath =
		"M7,2 L13,2 L13,6 C13,8 11,10 10,12 C12,12 14,13 14,15 L14,16 L6,16 L6,15 C6,13 8,12 10,12 C9,10 7,8 7,6 L7,2 Z";

	return (
		<div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
			<svg
				ref={svgRef}
				width="100%"
				height="100%"
				viewBox={`0 0 ${width} ${height}`}
				preserveAspectRatio="xMidYMid slice"
				xmlns="http://www.w3.org/2000/svg"
			>
				<defs>
					{/* Gradient for the paths */}
					<linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
						<stop offset="0%" stopColor={color} />
						<stop offset="100%" stopColor={secondaryColor} />
					</linearGradient>

					{/* Filter for glow effect */}
					<filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
						<feGaussianBlur stdDeviation="4" result="blur" />
						<feComposite in="SourceGraphic" in2="blur" operator="over" />
					</filter>
				</defs>

				{/* Background paths (static) */}
				{paths.map((d, index) => (
					<path
						key={`bg-path-${index}`}
						d={d}
						fill="none"
						stroke="#e5e7eb"
						strokeWidth="2"
						strokeLinecap="round"
						opacity="0.3"
					/>
				))}

				{/* Animated paths with flowing color */}
				{paths.map((d, index) => (
					<motion.path
						key={`animated-path-${index}`}
						d={d}
						fill="none"
						stroke="url(#pathGradient)"
						strokeWidth="3"
						strokeLinecap="round"
						initial="hidden"
						animate="visible"
						variants={pathVariants(index)}
						filter="url(#glow)"
					/>
				))}

				{/* Dots that will transform into trophies */}
				{dots.map((dot, index) => {
					// Calculate when the dot should transform based on the path animation
					const transformDelay =
						(dot.delay / 10) * speed + paths.indexOf(paths[dot.path]) * 1.5;

					return (
						<g key={`dot-${index}`}>
							{/* Static dot */}
							<motion.circle
								cx={dot.x}
								cy={dot.y}
								r={6}
								fill="#e5e7eb"
								initial={{ opacity: 1 }}
								animate={{
									opacity: 0,
									transition: { duration: 0.3, delay: transformDelay },
								}}
							/>

							{/* Trophy that appears when the path reaches the dot */}
							<motion.g
								transform={`translate(${dot.x - 10}, ${dot.y - 10}) scale(1.2)`}
								initial={{ opacity: 0, scale: 0 }}
								animate={{
									opacity: 1,
									scale: 1,
									transition: { duration: 0.5, delay: transformDelay },
								}}
							>
								<path
									d={trophyPath}
									fill={secondaryColor}
									stroke={color}
									strokeWidth="0.5"
									filter="url(#glow)"
								/>
								<motion.path
									d={trophyPath}
									fill="none"
									stroke={color}
									strokeWidth="0.5"
									initial={{ opacity: 0 }}
									animate={{
										opacity: [0, 1, 0],
										scale: [1, 1.2, 1],
										transition: {
											duration: 2,
											delay: transformDelay + 0.5,
											repeat: Number.POSITIVE_INFINITY,
											repeatDelay: 5,
										},
									}}
									filter="url(#glow)"
								/>
							</motion.g>
						</g>
					);
				})}
			</svg>
		</div>
	);
}
