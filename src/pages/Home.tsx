import { Link } from "react-router-dom"
import { useUser } from "../context/UserContext"

const Home = () => {
    const { user } = useUser()

    console.log(user?.name)

    return (
        <div className="home-page flex justify-center items-center h-screen m-0 font-sans text-gray-800 overflow-hidden bg-gradient-to-br from-emerald-200 via-green-300 to-lime-200">
            <header className="text-center bg-white/15 backdrop-blur-xl p-12 rounded-3xl shadow-2xl w-11/12 max-w-md border border-white/20">
                <div className="mb-8 relative">
                    <h1 className="text-4xl font-bold mb-4 tracking-wide leading-tight text-gray-800">
                        Welcome to <span className="text-emerald-600">Profile Tracker</span>
                    </h1>
                    <div className="h-1 w-20 bg-emerald-500 mx-auto rounded-full"></div>
                </div>
                <p className="text-lg italic mb-8 text-gray-700 opacity-90">
                    Your one-stop solution for tracking and improving your career journey!
                </p>
                <Link 
                    to={user ? "/dashboard" : "/login-signup"} 
                    className="inline-block py-4 px-8 text-lg font-bold text-white no-underline bg-gradient-to-r from-emerald-600 to-green-700 rounded-xl shadow-lg transition-all duration-300 hover:from-emerald-700 hover:to-green-800 transform hover:-translate-y-1 hover:shadow-xl"
                >
                    Get Started
                </Link>
            </header>
        </div>
    )
}

export default Home