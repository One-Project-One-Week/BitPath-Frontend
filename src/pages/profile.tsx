import { useAuth } from "@/hooks/useAuth";

const Profile = () => {
	const { profile } = useAuth();
	console.log(profile);
	return (
		<section className="container mx-auto ">
			<h1>{JSON.stringify(profile)}</h1>
		</section>
	);
};

export default Profile;
