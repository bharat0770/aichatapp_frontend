import axios from 'axios';
import { useEffect, useState } from 'react';

import MainScreen from './MainScreen';
import SideScreen from './SideScreen';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';


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
        if (!conversationId) return;

        let response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/message/all?conversationId=${conversationId}`);
        setChat(response.data.data);

    }
    const fetchConversation = async () => {
        if (!user) return;
        let response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/conversation/all?email=${user.email}`);
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
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/conversation/create`, {
                userId: user.userId,
                title: "new conversation"
            })
            setAllConversation((prev) => [...prev, response.data.data])
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

            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/message/create`, {
                email: "abc@gmail.com",
                conversationId: conversationId,
                userInput: prompt
            });

            setAiTyping(false)
            setChat((prev) => [...prev, response.data.data[1]])
        } catch (error) {
            const backendMessage =
                error.response?.data?.data ||
                error.response?.data?.message ||
                "Something went wrong";

            toast.error(backendMessage);
            setAiTyping(false)
        }
    }
    return (
        <>

            <div className='h-screen overflow-hidden bg-gray-900 w-screen flex relative'>
                <SideScreen
                    user={user}
                    setConversationId={setConversationId}
                    createNewConversation={createNewConversation}
                    isOpen={isOpen}
                    allConversation={allConversation}
                    conversationId={conversationId}
                    setIsOpen={setIsOpen}
                    setUser={user}
                    navigate={navigate}
                />

                {

                    <MainScreen
                        user={user}
                        setPrompt={setPrompt}
                        prompt={prompt}
                        conversationId={conversationId}
                        chat={chat}
                        sendPrompt={sendPrompt}
                        aiTyping={aiTyping}
                        isOpen={isOpen}
                    />
                }

            </div>


        </>
    )
}

export default HomeScreen; 
