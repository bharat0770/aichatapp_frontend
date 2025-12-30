import axios from 'axios';
import { useEffect, useState } from 'react';

import MainScreen from './MainScreen';
import SideScreen from './SideScreen';
import { useNavigate } from 'react-router-dom';


const HomeScreen = () => {
    const [conversationId, setConversationId] = useState(null);
    const [allConversation, setAllConversation] = useState(null);
    const [chat, setChat] = useState(null);
    const [isOpen, setIsOpen] = useState(true);
    const [prompt, setPrompt] = useState("");
    const [aiTyping, setAiTyping] = useState(false);
    const [user, setUser] = useState(null); 
    
    const navigate = useNavigate();
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) {
            navigate("/login");
        }
        setUser(user); 
    }, [navigate]);


    const fetchChat = async () => {
        if(!conversationId)return; 
        let response = await axios.get(`http://localhost:3000/api/v1/message/all?conversationId=${conversationId}`);
        console.log(response);
        setChat(response.data.data);

    }
    const fetchConversation = async () => {
        if(!user)return; 
        let response = await axios.get(`http://localhost:3000/api/v1/conversation/all?email=${user.email}`);
        console.log("conversation list ",response);
        setAllConversation(response.data.data);

    }

    useEffect(() => {
        fetchConversation();
    }, [user])

    useEffect(() => {
        fetchChat();
    }, [conversationId])

    const createNewConversation = async () => {
        try {
            const response = await axios.post("http://localhost:3000/api/v1/conversation/create", {
                userId: user.userId,
                title: "new conversation"
            })

            setConversationId(response.data.data._id);
        } catch (error) {
            console.log("error while creating converstion ", error.message);
        }
    };

    const sendPrompt = async () => {
        if (!conversationId && prompt.length == 0) return;
        try {
            setChat((prev) => [...prev, {
                content: prompt,
                sender: "user"
            }])
            setPrompt("");
            setAiTyping(true)
            const response = await axios.post(`http://localhost:3000/api/v1/message/create`, {
                email: "abc@gmail.com",
                conversationId: conversationId,
                userInput: prompt
            });
            setAiTyping(false)
            console.log(response.data);
            setChat((prev) => [...prev, response.data.data[1]])
        } catch (error) {
            console.log("error in sending prompt ", error.message);
        }
    }
    // if(!user){
    //   return <div>
    //     login first
    //   </div>
    // }
    return (
        <>
            <div className='container '>
                <div className='h-screen w-screen flex overflow-hidden relative'>

                    {/* <div className={`side-screen bg-gray-800 transition-all  ${isOpen ? "w-[20%]" : "w-[3%]"}  duration-100 ease-in h-screen`}>

            <div className={`flex items-center ${isOpen ? "px-2 justify-end" : "justify-center"}`} >
              <button onClick={() => setIsOpen(!isOpen)} className='py-2 px-4 rounded-lg bg-gray-600/50 text-white'>S</button>
            </div>

            <div className={`${isOpen ? "visible" : "hidden"} bg-gray-900/50 hover:bg-gray-700 cursor-pointer text-white p-5 m-1 rounded-lg`} onClick={createNewConversation}>
              new chat
            </div>
            {
              isOpen && allConversation?.map((i) => {
                return <div className={`${conversationId == i._id ? "bg-gray-700/30" : ""} hover:bg-gray-900/50 p-4 m-0.5 text-white rounded-lg `} onClick={() => setConversationId(i._id)}>
                  {i.title}
                </div>
              })
            }
          </div> */}
                    <SideScreen
                        user = {user}
                        setConversationId={setConversationId}
                        createNewConversation={createNewConversation}
                        isOpen={isOpen}
                        allConversation={allConversation}
                        conversationId={conversationId}
                        setIsOpen={setIsOpen}
                        setUser ={user}
                        navigate={navigate}
                    />
                    {

                        <MainScreen
                        user = {user}
                            setPrompt={setPrompt}
                            prompt={prompt}
                            conversationId={conversationId}
                            chat={chat}
                            sendPrompt={sendPrompt}
                            aiTyping={aiTyping}
                            isOpen={isOpen}
                        // chat={chat}
                        />
                    }

                </div>

            </div>
        </>
    )
}

export default HomeScreen; 
