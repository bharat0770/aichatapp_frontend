import ReactMarkdown from "react-markdown";

const MainScreen = ({isOpen, conversationId, chat, sendPrompt, setPrompt, prompt, aiTyping}) => {
    return (
         <div className={`main-screen bg-gray-900/95 text-gray-200 ${isOpen ? "w-[80%]" : "w-[97%]"} transition-all  duration-100 ease-in h-screen`}>
            {
              conversationId ?
                <div className='h-screen'>
                  <div className='h-[90%] overflow-y-scroll overflow-x-hidden px-8'>
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
                  </div>
                  <div className=' rounded-lg h-[10%] relative flex justify-between items-center px-2'>
                    {aiTyping && <p className='absolute top-0 left-0 text-xl text-white'>Typing...</p>}
                    <input type="text" value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder='ask gpt something' className=' bg-gray-700 rounded-lg py-4 px-2 w-[90%]' />
                    <button onClick={sendPrompt} className='bg-gray-900 text-white rounded-lg mx-1 w-[10%] py-4'>send</button>
                  </div>
                </div>
                :
                <div className="bg-gray-900 h-full w-full text-white flex justify-center items-center text-5xl">Hello There</div>
            }
          </div>
    )
}
export default MainScreen;