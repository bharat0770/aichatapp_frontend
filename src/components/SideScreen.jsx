import axios from "axios";
import { useState } from "react";

const SideScreen = ({ setUser, createNewConversation, setConversationId,navigate, isOpen, allConversation, conversationId, setIsOpen }) => {

    const [rename, setRename] = useState(""); 
    const [selectedConvo, setSelectedConvo] = useState(null); 
    const setNewName =async () => {
        try {
            const response = await axios.put(`http://localhost:3000/api/v1/conversation/one?conversationId=${selectedConvo}`, {newTitle  : rename}); 
            console.log(response); 
              window.location.reload();
        } catch (error) {
            console.log("error while changing name ", error.message); 
        }
        setSelectedConvo(null);
    }

    return (
        <div className={`side-screen bg-gray-800 transition-all ${isOpen ? "w-[20%]" : "w-[3%]"}  duration-100 ease-in h-screen`}>
            <div className={`flex items-center ${isOpen ? "px-2 justify-between" : "justify-center"}`} >
                <button onClick={() => { localStorage.removeItem("user"); navigate("/login") }} className={`py-2 px-4 rounded-lg bg-gray-600/50 text-white ${isOpen ? "visible" : "hidden"}`}>out</button>
                <button onClick={() => setIsOpen(!isOpen)} className='py-2 px-4 rounded-lg bg-gray-600/50 text-white'>S</button>
            </div>

            <div className={`${isOpen ? "visible" : "hidden"} bg-gray-900/50 hover:bg-gray-700 cursor-pointer text-white p-5 m-1 rounded-lg`} onClick={createNewConversation}>
                new chat
            </div>
            <div className="overflow-y-scroll h-full">

            { 
                isOpen && allConversation?.map((i, idx) => {
                    return <div key={idx} className={`${conversationId == i._id ? "bg-gray-700/30" : ""} flex justify-between hover:bg-gray-900/50 p-4 m-0.5 text-white rounded-lg `} onClick={() => setConversationId(i._id)}>
                        {
                            selectedConvo == i._id ? 
                            <div className="flex gap-5">
                        <input type="text" placeholder="new name" value={rename} onChange={(e)=> setRename(e.target.value)} /> 
                        <button onClick={setNewName}>set</button>
                        </div>
                        :
                        <p>
                        {i.title}
                        </p>
                        }

                        <button onClick={() => setSelectedConvo(i._id)}>RE</button>
                    </div>
                })
            }
            </div>
        </div>
    )
}
export default SideScreen; 