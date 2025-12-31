import axios from "axios";
import { use, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

const RegisterScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const  navigate = useNavigate(); 
    const register = async () => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/register`, {
                email: email,
                password: password
            });
            console.log("register res ", response.data.data); 
            navigate("/login"); 
        } catch (error) {
            console.log("error in register", error.message);
        }
    }
    return (
        <div className="h-screen w-screen bg-gray-900 flex justify-center items-center">

            <div className="w-150 rounded-lg bg-gray-700 text-white flex flex-col justify-between" >
                <p className="text-xl text-center py-4"> Register</p>
                <div className="flex flex-col gap-10  p-4">
                    <div className="flex flex-col gap-4">
                        <p>Email</p>
                        <input type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} className="p-5 bg-gray-600 rounded-lg" />
                    </div>
                    <div className="flex flex-col gap-4">
                        <p>Password</p>
                        <input type="text" placeholder="email" value={password} onChange={(e) => setPassword(e.target.value)} className="p-5 bg-gray-200 rounded-lg bg-gray-600" />
                    </div>
                </div>
                                <a href="/login" className="text-blue-500 text-center">already a user? login</a>

                <button onClick={register} className="px-8 py-4 text-white bg-blue-500 mx-5 my-4 rounded-lg"> submit</button>
                
            </div>
        </div>
    )
}
export default RegisterScreen; 