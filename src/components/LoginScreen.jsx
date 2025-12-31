import axios from "axios";
import { useState } from "react"
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const LoginScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate(); 
    const userLogin = async () => {

        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/login`, {
                email: email,
                password: password
            });
            const user = {
                email: response.data.data.email,
                userId: response.data.data._id
            }
            localStorage.setItem("user", JSON.stringify(user));
            setEmail(""); 
            setPassword("");
            toast.success("Login Successfull");
            navigate("/")
        } catch (error) {
            console.log("error in login ", error.message); 
        }
    }
    return (
         <div className="h-screen w-screen bg-gray-900 flex justify-center items-center">
            <div className="w-150 rounded-lg bg-gray-700 text-white flex flex-col px-4" >
                <p className="text-xl text-center py-4"> Login</p>
                <div className="flex flex-col gap-10  p-4">
                    <div className="flex flex-col gap-4">
                        <p>Email</p>
                        <input type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} className="p-5 bg-gray-600 rounded-lg" />
                    </div>
                    <div className="flex flex-col gap-4">
                        <p>Password</p>
                        <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} className="p-5 bg-gray-200 rounded-lg bg-gray-600" />
                    </div>
                </div>
                <a href="/register" className="text-blue-500 text-center capitalize">not a user? register</a>

                <button onClick={userLogin} className="px-8 py-4 text-white bg-blue-500 mx-5 my-4 rounded-lg"> Submit</button>

            </div>
        </div>
    )
}
export default LoginScreen; 