import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { axiosApiTutor, axiosApiUser } from '../../../Services/axios'
import { getPersonDetailsChat, getPersonDetailsChatTutor, getPersonDetailsChatUser, getPersonIds, getTimeDifference, removeNewChatFromExist } from '../../../Functions/ChatFunctions'


function ChatHomeTutor({ singleChatopen, userDetails }) {

    const [homeChats, setHomeChats] = useState([])
    const [newChats, setNewChat] = useState([])
    const [showNewChat, setShowNewChat] = useState(false)
    const {tutor}=useSelector((state)=>state.tutor)


   
    useEffect(() => {
       console.log(tutor._id,'aaaaaaaaaaaaaaaaa');
        (async () => {
            if (tutor && tutor._id) {

                const response = await axiosApiTutor.get("/getExistingChatsOfUser?userId=" + tutor?._id);
                const newChatResponse = await axiosApiTutor.get(`/getChatOfUser?userId=` + tutor._id + "&tutor=" + true)
                const newChat = await getPersonDetailsChatUser(response.data.data, tutor._id)
                console.log(newChat);
                const PersonIds = getPersonIds(response.data.data, tutor._id)
                setNewChat(removeNewChatFromExist(newChatResponse.data.data, PersonIds))
                // console.log(response.data.data,'THIS IS CHAT');
                setHomeChats(response.data.data);
                console.log(response.data.data,'daaadadadada');
            }

        })();
    }, [tutor])



    return (
        <div>
            <section className="flex w-[450px] fixed top-5 flex-col rounded-md justify-center antialiased bg-gray-800 text-gray-600 min-h-[95vh] max-h-[720px] p-4">
                <div className="h-auto">
                    <div className='w-full bg-white rounded-lg'>
                        <header className="pt-6 pb-4 px-5 border-b border-gray-200">
                            <div className="flex justify-between items-center mb-3">

                                <div className="flex items-center">
                                    <a className="inline-flex items-start mr-3" href="#0">
                                        <img className="rounded-full" src='https://img.freepik.com/free-photo/beautiful-female-student-showing-v-sign-smiling-happy-holding-notebooks-with-study-material-attending-courses-standing-blue-background_1258-70146.jpg' width="48" height="48" alt="profile image" />
                                    </a>
                                    <div className="pr-1">
                                        <a className="inline-flex text-gray-800 hover:text-gray-900" href="#0">
                                            <h2 className="text-xl leading-snug font-bold">{userDetails.Name}</h2>
                                        </a>
                                        <a className="block text-sm font-medium hover:text-indigo-500" href="#0">@dmmd.mars</a>
                                    </div>
                                </div>


                            </div>

                        </header>
                    </div>
                    <div style={{ overflowY: 'scroll', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none' }} className="relative mx-auto mt-2 bg-white max-h-[73vh] shadow-lg rounded-lg">

                        <div className="py-3 px-5">
                            {showNewChat && <>
                                <div className="mb-2">
                                    <h3 className=" text-xs font-bold uppercase text-gray-400 mb-1">new chat (enrolled students in your course)</h3>
                                    <div className="divide-y overflow-y-auto h-auto divide-gray-200">

                                        {newChats?.length && newChats?.map((item) => (
                                            <button onClick={() => singleChatopen(item)} className="w-full text-left py-2 focus:outline-none focus-visible:bg-indigo-50" >
                                                <div className="flex items-center">
                                                    <img className="rounded-full items-start flex-shrink-0 mr-3" src={item?.Image} width="32" height="32" alt="Marie Zulfikar" />
                                                    <div>
                                                        <h4 className="text-sm font-semibold text-gray-900">{item?.Name}</h4>
                                                    </div>
                                                </div>
                                            </button>
                                        ))}

                                    </div>
                                </div>
                            </>}
                            <h3 className=" overflow-y-auto text-xs font-semibold uppercase text-gray-400 mb-1">Chats</h3>
                            <div className="divide-y overflow-y-auto h-[450px] divide-gray-200">

                                {homeChats.map((item, idx) => (
                                    <button onClick={() => singleChatopen(item)} key={idx} className="w-full text-left py-2 focus:outline-none focus-visible:bg-indigo-50" >
                                        <div className="flex items-center">
                                            <img className="rounded-full items-start flex-shrink-0 mr-3" src={item?.personDetails?.Image} width="32" height="32" alt="https://www.nicepng.com/png/detail/363-3638489_foreign-language-courses-indian-high-school-students-png.png" />
                                            <div>
                                                <h4 className="text-sm font-semibold text-gray-900">{item?.personDetails?.Name}</h4>
                                                <div className="text-[13px]">The chat ended · {getTimeDifference(item.details[item.details.length - 1]?.time) ?? ""}</div>
                                            </div>
                                        </div>
                                    </button>
                                ))}

                            </div>

                        </div>

                        <button onClick={() => setShowNewChat(!showNewChat)} className="fixed bottom-[40px] right-5 inline-flex items-center text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 rounded-full text-center px-3 py-2 shadow-lg focus:outline-none focus-visible:ring-2">
                            <svg className="w-3 h-3 fill-current text-indigo-300 flex-shrink-0 mr-2" viewBox="0 0 12 12">
                                <path d="M11.866.146a.5.5 0 0 0-.437-.139c-.26.044-6.393 1.1-8.2 2.913a4.145 4.145 0 0 0-.617 5.062L.305 10.293a1 1 0 1 0 1.414 1.414L7.426 6l-2 3.923c.242.048.487.074.733.077a4.122 4.122 0 0 0 2.933-1.215c1.81-1.809 2.87-7.94 2.913-8.2a.5.5 0 0 0-.139-.439Z" />
                            </svg>
                            <span>New Chat</span>
                        </button>
                    </div>
                </div>
            </section >

        </div >
    )
}

export default React.memo(ChatHomeTutor)