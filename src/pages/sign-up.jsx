import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useNavigate } from 'react-router-dom';

function SignUp() {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your sign up logic here
        
        // After successful sign up, navigate to dashboard
        navigate('/dashboard');
    };

    return (
        <div className="min-h-screen w-full bg-black flex items-center justify-center">
            <div className="w-full max-w-md p-8 bg-black rounded-xl">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
                    <p className="text-gray-400">Join EnlightenedHub and start your journey</p>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-2">
                        <Label htmlFor="username">Username</Label>
                        <Input
                            id="username"
                            type="text"
                            placeholder="johndoe"
                            className="bg-zinc-900 border-none text-white h-12"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="john@example.com"
                            className="bg-zinc-900 border-none text-white h-12"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            className="bg-zinc-900 border-none text-white h-12"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                        <Input
                            id="confirmPassword"
                            type="password"
                            placeholder="••••••••"
                            className="bg-zinc-900 border-none text-white h-12"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 px-4 bg-zinc-900 text-white rounded-lg hover:bg-zinc-800 transition-colors flex items-center justify-center"
                    >
                        Create Account →
                    </button>

                    <p className="text-center text-gray-400 my-4">
                        Already have an account?{" "}
                        <a href="/login" className="text-white hover:underline">
                            Sign in
                        </a>
                    </p>

                    <div className="my-8 border-t border-zinc-800"></div>

                    <button
                        type="button"
                        className="w-full py-3 px-4 bg-zinc-900 text-white rounded-lg hover:bg-zinc-800 transition-colors flex items-center justify-center gap-2"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path
                                fill="currentColor"
                                d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.2,4.73C15.29,4.73 17.1,6.7 17.1,6.7L19,4.72C19,4.72 16.56,2 12.1,2C6.42,2 2.03,6.8 2.03,12C2.03,17.05 6.16,22 12.25,22C17.6,22 21.5,18.33 21.5,12.91C21.5,11.76 21.35,11.1 21.35,11.1Z"
                            />
                        </svg>
                        Sign up with Google
                    </button>
                </form>
            </div>
        </div>
    );
}

export default SignUp;