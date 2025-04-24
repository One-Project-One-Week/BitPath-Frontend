import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div className="max-w-[1000px] max-h-[350px] mx-auto flex flex-row  items-center   gap-[100px] mt-15">
            {/* fixed‑size frame */}

            <div className="relative w-[700px] h-[350px] overflow-hidden rounded-xl shadow group border-4 border-green-500 ">
                {/* image that zooms inside the same frame */}
                <img
                    src="https://i.pinimg.com/474x/57/46/8d/57468d8387042651790a73ade6a0d224.jpg"
                    alt="Hero"
                    className="absolute inset-0 h-full w-full object-cover 
                     transition-transform duration-300 group-hover:scale-105"
                />

                <h1
                    className="absolute inset-0 flex items-center justify-center
               text-green-500 font-extrabold text-2xl text-center"
                >
                    Find Your Roadmap With Us
                </h1>

                {/* centered login button */}
            </div>

            <div className="flex flex-row gap-4 max-w-[500px]">
                <Button className="w-[100px] text-green-500 hover:font-bold hover:max-w-1/2 bg-inherit hover:bg-inherit">
                    <Link to="/login">Login</Link>
                </Button>

                <Button className="w-[100px] border-green-500 border-2 text-gray bg-white hover:font-bold hover:text-green-500 hover:bg-white hover:max-w-1/2">
                    <Link to="/signup">Sign Up</Link>
                </Button>
            </div>
        </div>
    );
}
