import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { createUser } from '../services/userService';

const UserDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { setUser } = useUser()

    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false)
    const [formErrors, setFormErrors] = useState({
        name: "",
        phone: "",
        dob: "",
        password: "",
        c_password: "",
        resume: ""
    })

    const [userInput, setUserInput] = useState({
        name: "",
        phone: "",
        dob: "",
        password: "",
        c_password: "",
        resume: null as File | null
    })

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const emailParam = queryParams.get('email');
        if (emailParam) {
            setEmail(emailParam);
        } else {
            navigate('/login-signup')
        }
    }, []);

    const validateForm = () => {
        const errors: any = {};
        const phonePattern = /^[0-9]{10}$/;
        const resumeMaxSize = 10 * 1024 * 1024; // 10 MB

        if (!userInput.name) errors.name = "Name is required";
        if (!userInput.phone || !phonePattern.test(userInput.phone)) errors.phone = "Valid phone number is required (10 digits)";
        if (!userInput.dob) errors.dob = "Date of birth is required";
        if (!userInput.password) errors.password = "Password is required";
        if (userInput.password !== userInput.c_password) errors.c_password = "Passwords must match";
        if (userInput.resume && userInput.resume.size > resumeMaxSize) errors.resume = "Resume file size should be under 10MB";
        if (userInput.resume && !['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(userInput.resume.type)) {
            errors.resume = "Only PDF, DOC, and DOCX files are allowed";
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validateForm()) return; // Stop form submission if validation fails

        setLoading(true)
        
        const formData = new FormData();
        formData.append('data', JSON.stringify({
            name: userInput.name,
            email: email,
            phone: userInput.phone,
            dob: userInput.dob,
            password: userInput.password,
        }));

        if (userInput.resume)
            formData.append('file', userInput.resume, userInput.resume.name)

        const user = await createUser(formData);
        setLoading(false)

        if (user) {
            setUser({...user, resume: user.resume_url, dob: user.date_of_birth});
            navigate('/dashboard');
        } else {
            alert("Some error during registration");
            navigate("/");
        }
    };

    return (
        <div className="bg-gradient-to-b from-green-100 to-green-200 min-h-screen flex items-center justify-center font-sans">
            <div className="w-full max-w-3xl bg-white p-8 rounded-xl shadow-lg">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-3">Complete Your Profile</h2>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    {/* Name Input */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1" htmlFor="name">Full Name</label>
                        <input 
                            type="text" 
                            id="name" 
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400" 
                            placeholder="Enter your full name" 
                            value={userInput.name}
                            onChange={(e) => { setUserInput({...userInput, name: e.target.value}) }}
                        />
                        {formErrors.name && <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>}
                    </div>

                    {/* Phone and Date of Birth Inputs */}
                    <div className="flex space-x-4">
                        <div className="w-1/2">
                            <label className="block text-gray-700 font-medium mb-1" htmlFor="phone">Phone Number</label>
                            <input 
                                type="tel" 
                                id="phone" 
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400" 
                                placeholder="Enter your phone number" 
                                value={userInput.phone}
                                onChange={(e) => { setUserInput({...userInput, phone: e.target.value}) }}
                            />
                            {formErrors.phone && <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>}
                        </div>
                        <div className="w-1/2">
                            <label className="block text-gray-700 font-medium mb-1" htmlFor="dob">Date of Birth</label>
                            <input 
                                type="date" 
                                id="dob" 
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400" 
                                value={userInput.dob}
                                onChange={(e) => { setUserInput({...userInput, dob: e.target.value}) }}
                            />
                            {formErrors.dob && <p className="text-red-500 text-xs mt-1">{formErrors.dob}</p>}
                        </div>
                    </div>

                    {/* Password and Confirm Password Inputs */}
                    <div className="flex space-x-4">
                        <div className="w-1/2">
                            <label className="block text-gray-700 font-medium mb-1" htmlFor="password">Password</label>
                            <input 
                                type="password" 
                                id="password" 
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400" 
                                placeholder="Enter your password" 
                                value={userInput.password}
                                onChange={(e) => { setUserInput({...userInput, password: e.target.value}) }}
                            />
                            {formErrors.password && <p className="text-red-500 text-xs mt-1">{formErrors.password}</p>}
                        </div>
                        <div className="w-1/2">
                            <label className="block text-gray-700 font-medium mb-1" htmlFor="confirm-password">Confirm Password</label>
                            <input 
                                type="password" 
                                id="confirm-password" 
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400" 
                                placeholder="Confirm your password" 
                                value={userInput.c_password}
                                onChange={(e) => { setUserInput({...userInput, c_password: e.target.value}) }}
                            />
                            {formErrors.c_password && <p className="text-red-500 text-xs mt-1">{formErrors.c_password}</p>}
                        </div>
                    </div>

                    {/* Resume Upload */}
                    <div className="flex flex-col items-start justify-center w-full">
                        <label className="block text-gray-700 font-medium mb-1" htmlFor="dropzone-file">
                            Resume
                        </label>
                        <label
                            htmlFor="dropzone-file"
                            className={`flex flex-col items-center justify-center w-full h-64 border-2 ${formErrors.resume ? "border-red-500 bg-red-50" : userInput.resume ? "border-green-500 bg-green-50" : "border-gray-300 bg-gray-50 hover:bg-gray-100" } border-dashed rounded-lg cursor-pointer transition-all`}
                        >
                            {formErrors.resume && <p className="text-red-500 text-xs mt-1">{formErrors.resume}</p>}
                            {/* Resume File Upload Preview */}
                            {userInput.resume ? (
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <svg
                                        className="w-8 h-8 mb-4 text-green-500"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="2"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                    <p className="mb-2 text-sm text-green-600 font-semibold">File uploaded successfully!</p>
                                    <p className="text-xs text-gray-500">{userInput.resume.name}</p>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <svg
                                        className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 20 16"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                        />
                                    </svg>
                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                        <span className="font-semibold">Click to upload</span> or drag and drop
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        PDF or DOCX only (max. 10MB)
                                    </p>
                                </div>
                            )}
                        </label>
                        <input
                            id="dropzone-file"
                            type="file"
                            className="hidden"
                            accept="application/pdf,application/msword,.docx"
                            onChange={(e) => { setUserInput({...userInput, resume: e.target.files ? e.target.files[0] : null}) }}
                        />
                    </div>

                    {/* Submit Button */}
                    <button 
                        type="submit" 
                        className="w-full bg-green-500 text-white font-bold py-3 rounded-full shadow-md hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-300"
                        disabled={loading}
                    >
                        {loading ? "Creating User..." : "Submit"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UserDetails;
