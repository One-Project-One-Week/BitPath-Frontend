import FeatureCard from "@/components/landing/FeatureCard";
import HeroSection from "@/components/landing/hero";
import { Award, Route, Target } from "lucide-react";

export default function Home() {
	return (
		<div className="min-h-screen select-none">
			<HeroSection />

			<div className="relative z-10  py-20 mb-40">
				<div className="container mx-auto px-4">
					<div className="max-w-3xl mx-auto text-center mb-16">
						<h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-500">
							How <span className="text-green-500">BitPath</span> Works
						</h2>
						<p className="text-lg text-gray-400">
							BitPath uses advanced algorithms to create personalized learning
							paths based on your goals and preferences. Our platform breaks
							down complex subjects into manageable steps, helping you progress
							efficiently.
						</p>
					</div>

					<div className="grid md:grid-cols-3 gap-8 ">
						<FeatureCard
							icon={<Target className="h-8 w-8 text-emerald-500" />}
							title="Input Your Goals"
							description="Tell us what you want to learn, and we'll generate a customized roadmap for you."
						/>

						<FeatureCard
							icon={<Route className="h-8 w-8 text-emerald-500" />}
							title="Follow Your Path"
							description="Work through your personalized curriculum at your own pace."
						/>

						<FeatureCard
							icon={<Award className="h-8 w-8 text-emerald-500" />}
							title="Track Progress"
							description="Monitor your achievements and stay motivated with visual progress tracking."
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
