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

import {
    Drawer,
    Button,
    IconButton,
    List,
    ListItem,
    ListItemPrefix,
    ListItemSuffix,
    Chip,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Avatar,
    Typography,
  } from "@material-tailwind/react";


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

    const [open, setOpen] = React.useState(false);
    const openDrawer = () => setOpen(true);
    const closeDrawer = () => setOpen(false);


    return (
        <>



            <div class="bg-white border-b border-gray-300 py-2 fixed top-0 left-0 right-0 z-50">
                <div class="flex justify-between items-center px-9">
                    <button onClick={openDrawer}  id="menu-button" class="lg:hidden">
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



            <Drawer open={open} onClose={closeDrawer}>
                <div className="mb-2 flex items-center justify-between p-4">
                    <Typography variant="h5" color="blue-gray">
                        <div className="ml-0">
                            <img src='/logoo.png' alt="" onClick={() => navigate('/tutor/home')} className='h-[90px] pt-4 pr-4 ml-10' />
                        </div>
                    </Typography>
                    <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="h-5 w-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </IconButton>
                </div>
                <List>
                    <ListItem onClick={() => navigate('/tutor/home')}>
                        <ListItemPrefix>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="h-5 w-5"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M2.25 2.25a.75.75 0 000 1.5H3v10.5a3 3 0 003 3h1.21l-1.172 3.513a.75.75 0 001.424.474l.329-.987h8.418l.33.987a.75.75 0 001.422-.474l-1.17-3.513H18a3 3 0 003-3V3.75h.75a.75.75 0 000-1.5H2.25zm6.04 16.5l.5-1.5h6.42l.5 1.5H8.29zm7.46-12a.75.75 0 00-1.5 0v6a.75.75 0 001.5 0v-6zm-3 2.25a.75.75 0 00-1.5 0v3.75a.75.75 0 001.5 0V9zm-3 2.25a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0v-1.5z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </ListItemPrefix>
                        Home
                    </ListItem>
                    <ListItem onClick={() => navigate('/tutor/courselist')}>
                        <ListItemPrefix>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="h-5 w-5"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 004.25 22.5h15.5a1.875 1.875 0 001.865-2.071l-1.263-12a1.875 1.875 0 00-1.865-1.679H16.5V6a4.5 4.5 0 10-9 0zM12 3a3 3 0 00-3 3v.75h6V6a3 3 0 00-3-3zm-3 8.25a3 3 0 106 0v-.75a.75.75 0 011.5 0v.75a4.5 4.5 0 11-9 0v-.75a.75.75 0 011.5 0v.75z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </ListItemPrefix>
                        Courses
                        <ListItemSuffix>
                            <Chip
                                value="5"
                                size="sm"
                                color="green"
                                className="rounded-full"
                            />
                        </ListItemSuffix>
                    </ListItem>
                    <ListItem onClick={() => navigate('/tutor/revenue')}>
                        <ListItemPrefix>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="h-5 w-5"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M6.912 3a3 3 0 00-2.868 2.118l-2.411 7.838a3 3 0 00-.133.882V18a3 3 0 003 3h15a3 3 0 003-3v-4.162c0-.299-.045-.596-.133-.882l-2.412-7.838A3 3 0 0017.088 3H6.912zm13.823 9.75l-2.213-7.191A1.5 1.5 0 0017.088 4.5H6.912a1.5 1.5 0 00-1.434 1.059L3.265 12.75H6.11a3 3 0 012.684 1.658l.256.513a1.5 1.5 0 001.342.829h3.218a1.5 1.5 0 001.342-.83l.256-.512a3 3 0 012.684-1.658h2.844z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </ListItemPrefix>
                       Revenue
                    </ListItem>
                    <ListItem onClick={() => navigate('/tutor/profilepage')}>
                        <ListItemPrefix>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="h-5 w-5"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </ListItemPrefix>
                        Profile
                    </ListItem>
                   
                    <ListItem onClick={logout}>
                        <ListItemPrefix>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="h-5 w-5"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 00-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 00-2.282.819l-.922 1.597a1.875 1.875 0 00.432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 000 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 00-.432 2.385l.922 1.597a1.875 1.875 0 002.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 002.28-.819l.923-1.597a1.875 1.875 0 00-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 000-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 00-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 00-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 00-1.85-1.567h-1.843zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </ListItemPrefix>
                        Signout
                    </ListItem>
                </List>
                {/* <Button className="mt-3 ml-5" size="sm">
                    Documentation
                </Button> */}
            </Drawer>


            <div id="sidebar" class="mt-28 lg:block hidden bg-white w-64 h-screen fixed rounded-none border-none">
                <div className="p-4 space-y-4">
                    <div onClick={() => navigate('/tutor/home')} href="#" aria-label="dashboard" className=" px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group hover:bg-gradient from-customGreen to-cyan-400 hover:bg-gradient-to-r hover:from-customGreen hover:to-cyan-400">
                        <i className="fas fa-home "></i>
                        <span className="-mr-1 font-medium">Home</span>
                    </div>

                    <div href="#" onClick={() => navigate('/tutor/courselist')} className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group hover:bg-gradient-to-r hover:from-customGreen hover:to-cyan-400 hover:text-white">
                        <i className="fas fa-store"></i>
                        <span>Course</span>
                    </div>
                    <div href="#" onClick={() => navigate('/tutor/revenue')} className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group hover:bg-gradient-to-r hover:from-customGreen hover:to-cyan-400 hover:text-white">
                        <i className="fas fa-wallet"></i>
                        <span>Revenue</span>
                    </div>

                    <div href="#" onClick={() => navigate('/tutor/profilepage')} className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group hover:bg-gradient-to-r hover:from-customGreen hover:to-cyan-400 hover:text-white">
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


















export function ChatPopup({ chatWindow, setChatWindow, tutor, messageSocket, zp }) {

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
