import { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";

const MainScreen = ({ isOpen, conversationId, chat, sendPrompt, setPrompt, prompt, aiTyping }) => {
  const bottomRef = useRef(null);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]); 

  return (
    <div className={`main-screen   bg-gray-900/95 text-gray-200 ${isOpen ? "w-[80%]" : "w-[97%]"} transition-all duration-100 ease-in overflow-hidden h-full`}>
      {
        conversationId ?
          <div className='h-screen'>
            <div className='h-[90%] py-8 overflow-y-scroll overflow-x-hidden px-8 scrollbar-custom'>
              {
                chat?.length > 0 ?
                  chat?.map((i, idx) => {
                    return <div key={idx} className={`flex ${i.sender == "user" ? "justify-end " : "justify-start"} w-full  m-1`}>
                      <div className={`${i.sender == "user" ? "bg-gray-700 px-4 py-2 rounded-lg" : "m-10"} text-xl space-y-4`}>
                        {/* {i.content} */}
                        <ReactMarkdown>{i.content}</ReactMarkdown>
                      </div>
                    </div>
                  })
                  :
                  <div className="h-full w-full flex justify-center items-center text-4xl">Ask Something</div>
              }
              <div ref={bottomRef}></div>
            </div>

            <div className=' rounded-lg h-[10%] relative flex justify-between items-center px-2'>
              {aiTyping && <p className='absolute -top-10 left-0 text-xl text-white'>Typing...</p>}
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder='ask gpt something'
                className=' bg-gray-700 rounded-lg py-4 px-2 w-[90%]'
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    sendPrompt();
                  }
                }}
              />
              <button onClick={sendPrompt} className={`bg-blue-900 text-white rounded-lg mx-1 w-[10%] py-4 disabled:bg-gray-800`} disabled={aiTyping}>send</button>
            </div>
          </div>
          :
          <div className="bg-gray-900 h-full w-full text-white flex justify-center items-center text-5xl">Hello There</div>
      }
    </div>
  )
}
export default MainScreen;