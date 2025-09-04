import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { useEffect } from "react";

const DetailItem = ({ link, link_text, desc }: { link: string; link_text: string; desc: string }) => {
    return (
        <div className="flex-1 min-w-[250px] p-6 bg-white/15 backdrop-blur-xl rounded-2xl text-center shadow-xl border border-white/20 hover:transform hover:-translate-y-2 transition-all duration-300">
            <h3 className="text-xl text-gray-800 mb-2">
                <a 
                    href={link} 
                    target="_blank" 
                    className="text-emerald-700 hover:text-emerald-900 transition-colors font-semibold"
                >
                    {link_text}
                </a>
            </h3>
            <p className="text-sm text-gray-700 opacity-80">{desc}</p>
        </div>
    );
};

const Dashboard = () => {
    const { user, setUser } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/")
        }
    }, [user])

    const logout = () => {
        setUser(null)
        navigate("/")
    }

    return (
        <div className="bg-gradient-to-br from-emerald-200 via-green-300 to-lime-200 min-h-screen font-sans flex flex-col justify-center">
            <div className="max-w-7xl mx-auto mb-5 p-10 bg-white/15 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20">
                {/* Header Section */}
                <header className="text-center mb-10">
                    <h1 className="text-3xl text-gray-800 mb-4">
                        Welcome, <span className="text-emerald-600 font-bold">{user?.name}</span>!
                    </h1>
                    <div className="h-1 w-20 bg-emerald-500 mx-auto rounded-full mb-4"></div>
                    <nav>
                        <ul className="list-none p-0 flex justify-center gap-6">
                            <li>
                                <a href="/profile" className="text-lg text-emerald-700 hover:text-emerald-900 transition-colors font-medium">
                                    Profile
                                </a>
                            </li>
                            <li>
                                <a href="settings.html" className="text-lg text-emerald-700 hover:text-emerald-900 transition-colors font-medium">
                                    Settings
                                </a>
                            </li>
                            <li>
                                <div 
                                    onClick={logout} 
                                    className="text-lg text-emerald-700 hover:text-emerald-900 transition-colors font-medium cursor-pointer"
                                >
                                    Logout
                                </div>
                            </li>
                        </ul>
                    </nav>
                </header>

                {/* Main Content */}
                <main>
                    <section className="mb-8">
                        <h2 className="text-2xl text-gray-800 mb-5 font-semibold">Your Dashboard</h2>
                        <p className="mb-6 text-gray-700 text-lg leading-relaxed">
                            Welcome to your dashboard! From here, you can track your progress, manage your profile, and explore various career-enhancing features.
                        </p>
                        <div className="flex flex-wrap gap-6 justify-between">
                            <DetailItem link="/resume" link_text="Resume" desc="View or update your resume" />
                            <DetailItem link="/hackathon" link_text="Hackathons" desc="Check your participation in hackathons" />
                            <DetailItem link="/coding_profiles" link_text="Coding Profiles" desc="Links to your coding profiles" />
                            <DetailItem link="/assessment" link_text="Mock Assessments" desc="Take and track your mock assessments" />
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;