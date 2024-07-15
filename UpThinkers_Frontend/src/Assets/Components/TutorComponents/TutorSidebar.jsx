import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../../Context/AuthContext'
import { clearTutor } from '../../../Store/tutorAuthSlice'
import Cookies from 'js-cookie'
import { useDispatch, useSelector } from 'react-redux'
import ChatHomeTutor from '../../Tutor/ChatPage/ChatHomeTutor'
import { config } from '../../../config'
import { io, Socket } from 'socket.io-client';
import { Popup } from 'reactjs-popup'
import SingleChatTutor from '../../Tutor/ChatPage/SingleChatTutor'
import { v4 as uuidv4 } from 'uuid';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { ZIM } from "zego-zim-web";


function TutorSidebar() {

    const navigate = useNavigate()
    const { setTutorToken } = useContext(AuthContext)
    const dispatch = useDispatch()
    const { tutor } = useSelector((state) => state.tutor)
    const [zp, setZP] = useState()

    const logout = () => {
        Cookies.remove('tutorToken')
        setTutorToken(null)
        dispatch(clearTutor())
        navigate('/tutor/login')
    }



    const [chatWindow, setChatwindow] = useState(false)

    const [isToastActive, setIsToastActive] = useState(false);
    const [messageSocket, setMessageSocket] = useState(null);


    useEffect(() => {
        const handleMessage = (messResponse) => {
            if (!isToastActive) {
                setIsToastActive(true);
                // Uncomment and implement your toast function here
                // toastFunction({
                //   // Link: data.profileImage,
                //   SenderId: tutor._id,
                //   Message: messResponse.message,
                //   onClose: () => setIsToastActive(false),
                // });
            }
        };

        if (messageSocket) {
            console.log('Setting up message listener');
            messageSocket.on('incoming_message', handleMessage);
        }

        return () => {
            if (messageSocket) {
                console.log('Cleaning up message listener');
                messageSocket.off('incoming_message', handleMessage);
            }
        };
    }, [isToastActive, messageSocket]);

    useEffect(() => {
        if (tutor && tutor._id) {

            console.log('tutor:', tutor, config.BASE_URL);
            const socket = io(config.BASE_URL);
            console.log(socket);
            setMessageSocket(socket);
            socket.emit('join', tutor._id);

            return () => {
                socket.disconnect();
            };
        }
    }, [tutor]);

    
  useEffect(() => {
    if (tutor && tutor?._id) {
        const messageSocket = io(config.BASE_URL || "")
        setMessageSocket(messageSocket);
        messageSocket.emit('join', tutor._id)


        const userID = tutor._id;
        const userName = tutor.Name;
        const appID = Number(config.ZEGO_APP_ID);
        const serverSecret = config.ZEGO_SERVER_ID ?? "";
        const roomId = uuidv4()
        const TOKEN = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomId, userID, userName);
        const zp = ZegoUIKitPrebuilt.create(TOKEN);
        zp.addPlugins({ ZIM });
        zp.setCallInvitationConfig({
            ringtoneConfig: {
                incomingCallUrl: 'https://res.cloudinary.com/dyh7c1wtm/video/upload/v1717999547/rrr_uixgh2.mp3',
                outgoingCallUrl: 'https://res.cloudinary.com/dyh7c1wtm/video/upload/v1718002692/beggin_edited_kgcew8.mp3'
            }
        })

        setZP(zp)

    }
}, [])



    return (
        <>



            <div class="bg-white border-b border-gray-300 py-2 fixed top-0 left-0 right-0 z-50">
                <div class="flex justify-between items-center px-9">
                    <button id="menu-button" class="lg:hidden">
                        <i class="fas fa-bars text-cyan-500 text-lg"></i>
                    </button>
                    <div class="ml-1">
                        <img src="/logoo.png" alt="logo" class="h-20 w-30" />
                    </div>
                    <div class="space-x-4">
                        <button>
                            <i class="fas fa-bell text-cyan-500 text-lg"></i>
                        </button>
                        <button>
                            <i class="fas fa-user text-cyan-500 text-lg"></i>
                        </button>
                    </div>
                </div>
            </div>


            <div id="sidebar" class="mt-28 lg:block hidden bg-white w-64 h-screen fixed rounded-none border-none">
                <div className="p-4 space-y-4">
                    <div href="#" aria-label="dashboard" className=" px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group hover:bg-gradient from-customGreen to-cyan-400 hover:bg-gradient-to-r hover:from-customGreen hover:to-cyan-400">
                        <i className="fas fa-home "></i>
                        <span className="-mr-1 font-medium">Home</span>
                    </div>
                    
                    <div href="#" onClick={() => navigate('/tutor/courselist')} className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group hover:bg-gradient-to-r hover:from-customGreen hover:to-cyan-400 hover:text-white">
                        <i className="fas fa-store"></i>
                        <span>Course</span>
                    </div>
                    <div href="#" className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group hover:bg-gradient-to-r hover:from-customGreen hover:to-cyan-400 hover:text-white">
                        <i className="fas fa-wallet"></i>
                        <span>Revenue</span>
                    </div>
                    
                    <div href="#" className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group hover:bg-gradient-to-r hover:from-customGreen hover:to-cyan-400 hover:text-white">
                        <i className="fas fa-user"></i>
                        <span>Profile</span>
                    </div>
                    <div onClick={logout} href="" className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group hover:bg-gradient-to-r hover:from-customGreen hover:to-cyan-400 hover:text-white">
                        <i className="fas fa-sign-out-alt"></i>
                        <span>Logout</span>
                    </div>
                </div>
                {chatWindow && messageSocket && tutor && (
                    <div className="fixed md:right-[100px] md:top-0 min-w-[360px]">
                        <ChatPopup zp={zp} setChatWindow={setChatwindow} tutor={tutor} messageSocket={messageSocket} chatWindow={chatWindow} />
                    </div>
                )}

                {tutor && !chatWindow && (
                    <div onClick={() => {
                        setChatwindow(!chatWindow)
                    }} className="fixed bottom-0 right-0 mb-4 mr-4 w-[40px] h-[40px] rounded-full dark:bg-gray-900 flex items-center z-50 justify-center">
                        <button className="bg-transparent w-full h-full rounded-full text-xl text-white flex items-center justify-center">
                            <i className="fa fa-comments"></i>
                        </button>
                    </div>
                )}
            </div>




        </>
    )
}

export default TutorSidebar


















export function ChatPopup({ chatWindow, setChatWindow, tutor, messageSocket,zp }) {

    // const dumChannel: channelInterface = {
    //     _id: "", channelDescription: "", channelName: "",
    //     Followers: [], isFollowing: true, profileImage: "",
    //     Shorts: [], Streams: [], subscription: {}
    //     , userId: "", userName: "", Videos: []
    // }
  
    const [chatHome, setChatHome] = useState(true)
    const [chats, setChats] = useState([])
    const [person, setPerson] = useState([])
  
  
    const singleChatopen = (personDetails) => {
      setChatHome(false)
      setPerson(personDetails)
    //   setChats(personDetails)
    }
    console.log(zp);
  
  
  
  
    return (
      <div>
        <Popup trigger={<button />} position={'right top'} open={chatWindow} onClose={() => setChatWindow(false)}>
          {chatHome ?
            <ChatHomeTutor singleChatopen={singleChatopen} userDetails={tutor} /> :
            <SingleChatTutor zp={zp} personDetails={person} messages={chats} setMessages={setChats} setChatHome={setChatHome} messageSocket={messageSocket} />}
        </Popup>
       
      </div>
    )
  }
  