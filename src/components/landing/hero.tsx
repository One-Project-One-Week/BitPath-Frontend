import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router";
import Background from "./background";

export default function HeroSection() {
	return (
		<div className="relative min-h-[600px] md:min-h-[700px] flex items-center justify-center overflow-hidden select-none">
			{/* Animated background */}
			<Background />

			{/* Content */}
			<div className="container px-4 py-16 relative z-10">
				<div className="max-w-3xl mx-auto text-center">
					{/* <motion.div
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
						className="flex justify-center mb-6"
					>
						
						<img src={logo} alt="BitPath Logo" className="w-20 h-20" />
					</motion.div> */}
					<motion.div
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
						className="mb-6 inline-flex items-center px-3 py-1 rounded-full bg-green-950 border border-green-800"
					>
						<Sparkles className="h-4 w-4 text-emerald-400 mr-2" />
						<span className="text-sm font-medium text-emerald-400">
							Personalized Learning Paths
						</span>
					</motion.div>
					<motion.h1
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.2 }}
						className="text-4xl md:text-4xl text-gray-500 font-bold tracking-tight mb-4"
					>
						Your Journey to Mastery Starts Here
					</motion.h1>

					<motion.p
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.4 }}
						className="text-xl text-gray-500 mb-8"
					>
						Generate personalized learning roadmaps and track your progress with
						<span className="text-green-500"> BitPath</span>'s AI-powered
						platform.
					</motion.p>

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.6 }}
						className="flex flex-col sm:flex-row gap-4 justify-center"
					>
						<Link to="/roadmap">
							<Button size="lg" className="bg-emerald-600 hover:bg-emerald-700">
								Get Started <ArrowRight className="ml-2 h-4 w-4" />
							</Button>
						</Link>
					</motion.div>
				</div>
			</div>
		</div>
	);
}
