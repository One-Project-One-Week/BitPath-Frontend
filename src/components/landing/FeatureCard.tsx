import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function FeatureCard({
	icon,
	title,
	description,
}: {
	icon: React.ReactNode;
	title: string;
	description: string;
}) {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, amount: 0.3 });

	return (
		<motion.div
			ref={ref}
			initial={{ opacity: 0, y: 20 }}
			animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
			transition={{ duration: 0.5 }}
			className="p-8 rounded-2xl bg-gradient-to-b from-green-100 to-green-50 border border-green-100 hover:border-green-200 transition-all duration-300"
		>
			<div className="p-4 rounded-xl bg-green-200 inline-block mb-4">
				{icon}
			</div>
			<h3 className="text-xl font-semibold mb-3 text-gray-500">{title}</h3>
			<p className="text-gray-400">{description}</p>
		</motion.div>
	);
}
