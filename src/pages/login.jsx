import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { 
    signInWithPopup, 
    GoogleAuthProvider,
    fetchSignInMethodsForEmail
} from "firebase/auth";
import { auth, githubProvider } from "../firebase/config";

function Login() {
    console.log("Auth instance:", auth);
    console.log("Auth current user:", auth.currentUser);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleGoogleSignIn = async () => {
        setError("");
        setIsLoading(true);
        
        try {
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider);
            navigate("/loading");
        } catch (error) {
            console.error("Google sign in error:", error);
            setError("Failed to sign in with Google. Please try again.");
        } finally {
            setIsLoading(false);
        }
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
            if (error.code === 'auth/account-exists-with-different-credential') {
                // Get existing sign-in methods for this email
                const email = error.customData.email;
                const methods = await fetchSignInMethodsForEmail(auth, email);
                
                if (methods[0] === 'google.com') {
                    setError('This email is associated with a Google account. Please sign in with Google.');
                } else if (methods[0] === 'password') {
                    setError('This email is associated with an email/password account. Please sign in with your email and password.');
                } else {
                    setError('This email is already associated with another sign-in method.');
                }
            } else {
                // Handle other errors as before
                switch (error.code) {
                    case 'auth/popup-blocked':
                        setError('The popup was blocked by your browser. Please allow popups for this site.');
                        break;
                    case 'auth/popup-closed-by-user':
                        setError('The sign-in popup was closed before completing the sign-in.');
                        break;
                    case 'auth/cancelled-popup-request':
                        setError('The sign-in operation was cancelled.');
                        break;
                    case 'auth/operation-not-allowed':
                        setError('GitHub authentication is not enabled. Please contact support.');
                        break;
                    default:
                        setError(`Failed to sign in with GitHub: ${error.message}`);
                }
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-full max-w-md p-8 bg-white/80 backdrop-blur-md rounded-xl shadow-lg">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome to EnlightenedHub</h2>
                    <p className="text-gray-600">
                        Sign in to your account
                    </p>
                </div>

                {error && (
                    <p className="text-red-600 mb-4 p-3 bg-red-50 rounded">
                        {error}
                    </p>
                )}

                <div className="space-y-6">
                    <button
                        type="button"
                        onClick={handleGoogleSignIn}
                        disabled={isLoading}
                        className={`w-full py-3 px-4 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 ${
                            isLoading ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path
                                fill="currentColor"
                                d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.2,4.73C15.29,4.73 17.1,6.7 17.1,6.7L19,4.72C19,4.72 16.56,2 12.1,2C6.42,2 2.03,6.8 2.03,12C2.03,17.05 6.16,22 12.25,22C17.6,22 21.5,18.33 21.5,12.91C21.5,11.76 21.35,11.1 21.35,11.1Z"
                            />
                        </svg>
                        {isLoading ? "Loading..." : "Continue with Google"}
                    </button>

                    <button
                        type="button"
                        onClick={handleGithubSignIn}
                        disabled={isLoading}
                        className="w-full py-3 px-4 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path
                                fill="currentColor"
                                d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                            />
                        </svg>
                        {isLoading ? "Loading..." : "Continue with GitHub"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Login;
