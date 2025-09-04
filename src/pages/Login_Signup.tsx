import { useState } from "react"
import { createSearchParams, useNavigate } from 'react-router-dom';
import { useUser } from "../context/UserContext";
import { checkCreds } from "../services/userService";
// import { sendOTP, verifyOTP } from "../services/otpService";

const Login_Signup = () => {
    const navigate = useNavigate();
    const { setUser } = useUser();

    const [loginActive, setLoginActive] = useState(true)
    const [loading, setLoading] = useState(false)
    const [otpSent, setOtpSent] = useState(false) // Track if OTP has been sent
    const [verifyLoading, setVerifyLoading] = useState(false) // Loading for verify button
    const [signUpLoading, setSignUpLoading] = useState(false) // Loading for sign-up button

    const [loginCreds, setLoginCreds] = useState({email: "", password: ""})
    const [signUpCreds, setSignUpCreds] = useState({email: "", otp: ""})

    const [OTP, setOTP] = useState("")

    const btn_active = "bg-emerald-500 text-white shadow-md ring-2 ring-emerald-300"
    
    const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true)

        const user = await checkCreds(loginCreds.email, loginCreds.password)
        setLoading(false)
        if (user) {
            setUser({...user, resume: user.resume_url, dob: user.date_of_birth})
            navigate('/dashboard')
        } else {
            alert("Invalid credentials. Please try again.");
        }
    }

    const handleVerifyEmail = async () => {

        setVerifyLoading(true); // Start loading for "Verify" button
        setOTP("123456")
        setVerifyLoading(false); // Stop loading after OTP request

        alert("OTP sent successfully!");
        setOtpSent(true);
    };

    const handleSignupSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        setSignUpLoading(true); // Start loading for "Sign Up" button

        if (signUpCreds.otp == OTP) {
            navigate({
                pathname: "/details",
                search: createSearchParams({
                    email: signUpCreds.email,
                }).toString(),
            });
        } else {
            setSignUpCreds({ ...signUpCreds, otp: "" });
            alert("Wrong OTP. Please try again.");
        }

        setSignUpLoading(false); // Stop loading after verification
    };

    // const handleVerifyEmail = async () => {
    //     try {
    //         setVerifyLoading(true); // Start loading for "Verify" button

    //         const found = await getUser(signUpCreds.email);
    //         if (found) {
    //             alert("Email already registered!!");
    //             navigate("/"); 
    //             setVerifyLoading(false); // Stop loading when exiting early
    //             return;
    //         }

    //         const otpResponse = await sendOTP(signUpCreds.email);

    //         setVerifyLoading(false); // Stop loading after OTP request

    //         if (otpResponse.status === 200) {
    //             alert("OTP sent successfully!");
    //             setOtpSent(true); // Enable the sign-up button
    //         } else {
    //             alert("Failed to send OTP. Please try again.");
    //         }
    //     } catch (error) {
    //         console.error("Error verifying email:", error);
    //         alert("Something went wrong. Please try again later.");
    //         setVerifyLoading(false); // Stop loading on error
    //     }
    // };
    
    // const handleSignupSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();
    
    //     try {
    //         setSignUpLoading(true); // Start loading for "Sign Up" button

    //         const response = await verifyOTP(signUpCreds.email, signUpCreds.otp);
    
    //         setSignUpLoading(false); // Stop loading after verification
    
    //         if (response.status === 200) {
    //             navigate({
    //                 pathname: "/details",
    //                 search: createSearchParams({
    //                     email: signUpCreds.email,
    //                 }).toString(),
    //             });
    //         } else {
    //             setSignUpCreds({ ...signUpCreds, otp: "" });
    //             alert("Wrong OTP. Please try again.");
    //         }
    //     } catch (error) {
    //         console.error("Error verifying OTP:", error);
    //         alert("Failed to verify OTP. Please try again later.");
    //         setSignUpLoading(false); // Stop loading on error
    //     }
    // };

    return (
        <div className="flex justify-center items-center h-screen m-0 font-sans text-white overflow-hidden bg-gradient-to-br from-emerald-200 via-green-300 to-lime-200">
            <div className="relative w-full max-w-md bg-white/15 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-white/20">
                <div className="flex justify-center mb-10 bg-gray-100/20 rounded-full p-1">
                    <button
                        className={`flex-1 py-3 px-6 text-base font-semibold text-gray-800 rounded-full transition-all duration-300 ${loginActive ? btn_active : 'hover:bg-emerald-50'}`}
                        onClick={() => setLoginActive(true)}
                    >
                        Login
                    </button>
                    <button
                        className={`flex-1 py-3 px-6 text-base font-semibold text-gray-800 rounded-full transition-all duration-300 ${loginActive ? 'hover:bg-emerald-50' : btn_active}`}
                        onClick={() => setLoginActive(false)}
                    >
                        Sign Up
                    </button>
                </div>
        
                <form
                    className={"text-black flex-col gap-5 " + (loginActive ? "flex" : "hidden")}
                    onSubmit={handleLoginSubmit}
                    encType="multipart/form-data"
                >
                    <div className="space-y-2">
                        <label htmlFor="email" className="text-base font-bold text-gray-700">Email</label>
                        <input
                            type="email"
                            className="w-full py-3 px-4 text-base bg-white/80 border border-emerald-200 rounded-xl outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-300 placeholder-gray-400"
                            name="email"
                            placeholder="Enter your email"
                            value={loginCreds.email}
                            onChange={(event) => { setLoginCreds({...loginCreds, email: event.target.value}) }}
                            required
                        />
                    </div>
        
                    <div className="space-y-2">
                        <label htmlFor="password" className="text-base font-bold text-gray-700">Password</label>
                        <input
                            type="password"
                            className="w-full py-3 px-4 text-base bg-white/80 border border-emerald-200 rounded-xl outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-300 placeholder-gray-400"
                            name="password"
                            placeholder="Enter your password"
                            value={loginCreds.password}
                            onChange={(event) => { setLoginCreds({...loginCreds, password: event.target.value}) }}
                            required
                        />
                    </div>
        
                    <button
                        type="submit"
                        className="w-full py-4 px-6 text-base font-bold text-white bg-gradient-to-r from-emerald-600 to-green-700 rounded-xl border-none cursor-pointer transition-all duration-300 hover:from-emerald-700 hover:to-green-800 transform hover:-translate-y-1 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={loading}
                    >
                        {loading ? "Logging In..." : "Login"}
                    </button>
        
                    <div className="text-center mt-4">
                        <a href="#" className="text-sm text-emerald-700 no-underline transition-colors duration-300 hover:text-emerald-900 hover:underline">Forgot Password?</a>
                    </div>
                </form>
    
                <form
                    className={"flex-col gap-5 text-black " + (loginActive ? "hidden" : "flex")}
                    onSubmit={handleSignupSubmit}
                >
                    {/* Email Field */}
                    <div className="space-y-2">
                        <label htmlFor="email" className="text-base font-bold text-gray-700">Email</label>
                        <div className="flex items-center gap-3">
                            <input
                                type="email"
                                className="flex-1 py-3 px-4 text-base bg-white/80 border border-emerald-200 rounded-xl outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-300 placeholder-gray-400"
                                name="email"
                                placeholder="Enter your email"
                                value={signUpCreds.email}
                                onChange={(event) => { setSignUpCreds({...signUpCreds, email: event.target.value}) }}
                                required
                            />
                            <button
                                type="button"
                                className="py-3 px-5 text-sm font-bold text-white bg-emerald-600 rounded-xl border-none cursor-pointer transition-all duration-300 hover:bg-emerald-700 hover:shadow-md"
                                onClick={handleVerifyEmail}
                                disabled={verifyLoading}
                            >
                                {verifyLoading ? "Verifying..." : "Verify"}
                            </button>
                        </div>
                    </div>

                    {/* OTP Field */}
                    <div className="space-y-2">
                        <label htmlFor="otp" className="text-base font-bold text-gray-700">Enter OTP</label>
                        <input
                            type="text"
                            className="w-full py-3 px-4 text-base bg-white/80 border border-emerald-200 rounded-xl outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-300 placeholder-gray-400"
                            name="otp"
                            placeholder="Enter OTP"
                            value={signUpCreds.otp}
                            onChange={(event) => { setSignUpCreds({...signUpCreds, otp: event.target.value}) }}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-4 px-6 text-base font-bold text-white bg-gradient-to-r from-emerald-600 to-green-700 rounded-xl border-none cursor-pointer transition-all duration-300 hover:from-emerald-700 hover:to-green-800 transform hover:-translate-y-1 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={!otpSent || signUpLoading}
                    >
                        {signUpLoading ? "Signing Up..." : "Sign Up"}
                    </button>
                </form>

            </div>
        </div>
    )
}

export default Login_Signup
