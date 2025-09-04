import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { evaluateResume } from "../services/resumeService";
import { useEffect } from "react";

const Profile = () => {
    const { user } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/")
        }
    }, [user])

    const handleEvaluateResume = async () => {
        if (!user)
            navigate('/login-signup')
        else {
            console.log("Inside handle")
            const evaluation = await evaluateResume(user.email)
            alert(evaluation.ats_score.total_score)
        }
    }

    return (
        <div className="bg-gradient-to-br from-emerald-200 via-green-300 to-lime-200 min-h-screen font-sans flex flex-col justify-center">
            <div className="max-w-5xl mx-auto p-10 bg-white/15 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20">
                {/* Header Section */}
                <header className="text-center mb-10">
                    <h1 className="text-3xl text-gray-800 mb-4">
                        Your Profile, <span className="text-emerald-600 font-bold">{user?.name}</span>
                    </h1>
                    <div className="h-1 w-20 bg-emerald-500 mx-auto rounded-full"></div>
                </header>

                {/* User Details */}
                <main>
                    <section className="mb-10">
                        <h2 className="text-2xl text-gray-800 mb-6 text-center font-semibold">Personal Details</h2>
                        <div className="bg-white/15 backdrop-blur-xl p-8 rounded-2xl border border-white/20 shadow-lg">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-4">
                                    <p className="text-lg text-gray-700">
                                        <span className="font-semibold text-emerald-700 mr-2">Name:</span> 
                                        {user?.name}
                                    </p>
                                    <p className="text-lg text-gray-700">
                                        <span className="font-semibold text-emerald-700 mr-2">Email:</span> 
                                        {user?.email || "N/A"}
                                    </p>
                                </div>
                                <div className="space-y-4">
                                    <p className="text-lg text-gray-700">
                                        <span className="font-semibold text-emerald-700 mr-2">Phone:</span> 
                                        {user?.phone || "N/A"}
                                    </p>
                                    <p className="text-lg text-gray-700">
                                        <span className="font-semibold text-emerald-700 mr-2">Date of Birth:</span> 
                                        {user?.dob || "N/A"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Resume Buttons */}
                    <section className="mt-10 text-center">
                        <h2 className="text-2xl text-gray-800 mb-6 font-semibold">Resume Actions</h2>
                        <div className="flex justify-center gap-6">
                            <a
                                href={user?.resume}
                                target="_blank"
                                className="px-7 py-3 text-lg bg-gradient-to-r from-emerald-600 to-green-700 text-white rounded-xl shadow-lg hover:from-emerald-700 hover:to-green-800 transition-all duration-300 transform hover:-translate-y-1"
                            >
                                View Resume
                            </a>
                            <button
                                onClick={handleEvaluateResume}
                                className="px-7 py-3 text-lg bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl shadow-lg hover:from-blue-700 hover:to-blue-900 transition-all duration-300 transform hover:-translate-y-1"
                            >
                                Evaluate Resume
                            </button>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
};

export default Profile;