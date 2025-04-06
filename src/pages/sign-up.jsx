import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useNavigate } from 'react-router-dom';
import { auth, githubProvider } from "../firebase/config";
import { signInWithPopup } from "firebase/auth";

function SignUp() {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your sign up logic here
        
        // After successful sign up, navigate to dashboard
        navigate('/dashboard');
    };

    const handleGithubSignIn = async () => {
        setError("");
        setIsLoading(true);
        try {
            const result = await signInWithPopup(auth, githubProvider);
            console.log("GitHub sign in successful:", result.user);
            navigate("/dashboard");
        } catch (error) {
            console.error("GitHub sign in error:", error);
            setError("Failed to sign in with GitHub. Please try again.");
        } finally {
            setIsLoading(false);
        }
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
                        onClick={handleGoogleSignIn}
                        className="w-full py-3 px-4 bg-zinc-900 text-white rounded-lg hover:bg-zinc-800 transition-colors flex items-center justify-center gap-2 mb-4"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path
                                fill="currentColor"
                                d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.2,4.73C15.29,4.73 17.1,6.7 17.1,6.7L19,4.72C19,4.72 16.56,2 12.1,2C6.42,2 2.03,6.8 2.03,12C2.03,17.05 6.16,22 12.25,22C17.6,22 21.5,18.33 21.5,12.91C21.5,11.76 21.35,11.1 21.35,11.1Z"
                            />
                        </svg>
                        Sign up with Google
                    </button>

                    <button
                        type="button"
                        onClick={handleGithubSignIn}
                        className="w-full py-3 px-4 bg-zinc-900 text-white rounded-lg hover:bg-zinc-800 transition-colors flex items-center justify-center gap-2"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path
                                fill="currentColor"
                                d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                            />
                        </svg>
                        Sign up with GitHub
                    </button>
                </form>
            </div>
        </div>
    );
}

export default SignUp;