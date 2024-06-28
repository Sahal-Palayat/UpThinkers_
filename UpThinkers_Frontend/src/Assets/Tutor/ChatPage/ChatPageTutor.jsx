import React from 'react'
import TutorSidebar from '../../Components/TutorComponents/TutorSidebar'

function ChatPageTutor() {
    return (
        <div>
            
            <TutorSidebar/>
            <div className="lg:w-[82%] lg:ml-64 py-8">
            <div>
                {/* <div className="w-full h-32 bg-customGreen"></div> */}
                <div className=" w-full mt-10">
                    <div className="py-6 h-[569px]">
                        <div className="flex border border-grey rounded shadow-lg h-full">
                            <div className="w-1/3 border flex flex-col">
                                <div className="py-2 px-3 bg-grey-lighter flex flex-row justify-between items-center">
                                    <div>
                                        <img
                                            className="w-20 h-10 rounded-full"
                                            src="/logoo.png"
                                            alt="sahal"
                                        />
                                    </div>
                                    <div className="flex">
                                        <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                                <path
                                                    fill="#727A7E"
                                                    d="M12 20.664a9.163 9.163 0 0 1-6.521-2.702.977.977 0 0 1 1.381-1.381 7.269 7.269 0 0 0 10.024.244.977.977 0 0 1 1.313 1.445A9.192 9.192 0 0 1 12 20.664zm7.965-6.112a.977.977 0 0 1-.944-1.229 7.26 7.26 0 0 0-4.8-8.804.977.977 0 0 1 .594-1.86 9.212 9.212 0 0 1 6.092 11.169.976.976 0 0 1-.942.724zm-16.025-.39a.977.977 0 0 1-.953-.769 9.21 9.21 0 0 1 6.626-10.86.975.975 0 1 1 .52 1.882l-.015.004a7.259 7.259 0 0 0-5.223 8.558.978.978 0 0 1-.955 1.185z"
                                                />
                                            </svg>
                                        </div>
                                        <div className="ml-4">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                                <path
                                                    opacity=".55"
                                                    fill="#263238"
                                                    d="M19.005 3.175H4.674C3.642 3.175 3 3.789 3 4.821V21.02l3.544-3.514h12.461c1.033 0 2.064-1.06 2.064-2.093V4.821c-.001-1.032-1.032-1.646-2.064-1.646zm-4.989 9.869H7.041V11.1h6.975v1.944zm3-4H7.041V7.1h9.975v1.944z"
                                                />
                                            </svg>
                                        </div>
                                        <div className="ml-4">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                                <path
                                                    fill="#263238"
                                                    fillOpacity=".6"
                                                    d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div className="py-2 px-2 bg-grey-lightest">
                                    <input type="text" className="w-full px-2 py-2 text-sm" placeholder="Search or start new chat" />
                                </div>
                                <div className="bg-grey-lighter flex-1 overflow-auto">
                                    <div className="px-3 flex items-center bg-grey-light cursor-pointer">
                                        <div>
                                            <img
                                                className="h-12 w-12 rounded-full"
                                                src="https://darrenjameseeley.files.wordpress.com/2014/09/expendables3.jpeg"
                                                alt="Expendables"
                                            />
                                        </div>
                                        <div className="ml-4 flex-1 border-b border-grey-lighter py-4">
                                            <div className="flex items-bottom justify-between">
                                                <p className="text-grey-darkest">New Movie! Expendables 4</p>
                                                <p className="text-xs text-grey-darkest">12:45 pm</p>
                                            </div>
                                            <p className="text-grey-dark mt-1 text-sm">Get Andrés on this movie ASAP!</p>
                                        </div>
                                    </div>
                                    <div className="bg-white px-3 flex items-center hover:bg-grey-lighter cursor-pointer">
                                        <div>
                                            <img
                                                className="h-12 w-12 rounded-full"
                                                src="https://darrenjameseeley.files.wordpress.com/2014/09/expendables3.jpeg"
                                                alt="Arnold Schwarzenegger"
                                            />
                                        </div>
                                        <div className="ml-4 flex-1 border-b border-grey-lighter py-4">
                                            <div className="flex items-bottom justify-between">
                                                <p className="text-grey-darkest">Arnold Schwarzenegger</p>
                                                <p className="text-xs text-grey-darkest">12:45 pm</p>
                                            </div>
                                            <p className="text-grey-dark mt-1 text-sm">I'll be back</p>
                                        </div>
                                    </div>

                                    <div className="bg-white px-3 flex items-center hover:bg-grey-lighter cursor-pointer">
                                        <div>
                                            <img
                                                className="h-12 w-12 rounded-full"
                                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGpYTzuO0zLW7yadaq4jpOz2SbsX90okb24Z9GtEvK6Z9x2zS5"
                                                alt="Tom Cruise"
                                            />
                                        </div>
                                        <div className="ml-4 flex-1 border-b border-grey-lighter py-4">
                                            <div className="flex items-bottom justify-between">
                                                <p className="text-grey-darkest">Tom Cruise</p>
                                                <p className="text-xs text-grey-darkest">12:45 pm</p>
                                            </div>
                                            <p className="text-grey-dark mt-1 text-sm">I feel the need... the need for speed!</p>
                                        </div>
                                    </div>
                                    <div className="bg-white px-3 flex items-center hover:bg-grey-lighter cursor-pointer">
                                        <div>
                                            <img
                                                className="h-12 w-12 rounded-full"
                                                src="https://darrenjameseeley.files.wordpress.com/2014/09/expendables3.jpeg"
                                                alt="Expendables"
                                            />
                                        </div>
                                        <div className="ml-4 flex-1 border-b border-grey-lighter py-4">
                                            <div className="flex items-bottom justify-between">
                                                <p className="text-grey-darkest">New Movie! Expendables 4</p>
                                                <p className="text-xs text-grey-darkest">12:45 pm</p>
                                            </div>
                                            <p className="text-grey-dark mt-1 text-sm">Get Andrés on this movie ASAP!</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-2/3 border flex flex-col">
                                <div className="py-2 px-3 bg-grey-lighter flex flex-row justify-between items-center">
                                    <div className="flex items-center">
                                        <div>
                                            <img
                                                className="w-10 h-10 rounded-full"
                                                src="http://andressantibanez.com/res/avatar.png"
                                                alt="avatar"
                                            />
                                        </div>
                                        <div className="ml-4">
                                            <p className="text-grey-darkest">Andrés Santiago</p>
                                            <p className="text-grey-darker text-xs mt-1">Online</p>
                                        </div>
                                    </div>
                                    <div className="flex">
                                        <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                                <path
                                                    fill="#263238"
                                                    fillOpacity=".6"
                                                    d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex-1  overflow-auto" style={{ backgroundColor: '#DAD3CC' }}>
                                    <div className="py-1 px-3">
                                        <div className="flex justify-center mb-2">
                                            <div className="rounded py-2 px-4" style={{ backgroundColor: '#DDECF2' }}>
                                                <p className="text-sm uppercase">February 20, 2018</p>
                                            </div>
                                        </div>
                                        <div className="flex justify-center mb-4">
                                            <div className="rounded py-2 px-4" style={{ backgroundColor: '#FCF4CB' }}>
                                                <p className="text-xs">Messages to this chat and calls are now secured with end-to-end encryption. Tap for more info.</p>
                                            </div>
                                        </div>
                                        <div className="flex mb-2">
                                            <div className="rounded py-2 px-3" style={{ backgroundColor: '#F2F2F2' }}>
                                                <p className="text-sm text-purple">This is what I was looking for.</p>
                                                <p className="text-right text-xs text-grey-dark mt-1">12:45 pm</p>
                                            </div>
                                        </div>
                                        <div className="flex justify-end mb-2">
                                            <div className="rounded py-2 px-3" style={{ backgroundColor: '#E2F7CB' }}>
                                                <p className="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                                <p className="text-right text-xs text-grey-dark mt-1">12:45 pm</p>
                                            </div>
                                        </div>
                                        <div className="flex justify-end mb-2">
                                            <div className="rounded py-2 px-3" style={{ backgroundColor: '#E2F7CB' }}>
                                                <p className="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                                <p className="text-right text-xs text-grey-dark mt-1">12:45 pm</p>
                                            </div>
                                        </div>
                                        <div className="flex mb-2">
                                            <div className="rounded py-2 px-3" style={{ backgroundColor: '#F2F2F2' }}>
                                                <p className="text-sm text-purple">This is what I was looking for.</p>
                                                <p className="text-right text-xs text-grey-dark mt-1">12:45 pm</p>
                                            </div>
                                        </div>
                                        <div className="flex justify-end mb-2">
                                            <div className="rounded py-2 px-3" style={{ backgroundColor: '#E2F7CB' }}>
                                                <p className="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                                <p className="text-right text-xs text-grey-dark mt-1">12:45 pm</p>
                                            </div>
                                        </div>
                                        <div className="flex justify-end mb-2">
                                            <div className="rounded py-2 px-3" style={{ backgroundColor: '#E2F7CB' }}>
                                                <p className="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                                <p className="text-right text-xs text-grey-dark mt-1">12:45 pm</p>
                                            </div>
                                        </div>
                                        <div className="flex mb-2">
                                            <div className="rounded py-2 px-3" style={{ backgroundColor: '#F2F2F2' }}>
                                                <p className="text-sm text-purple">This is what I was looking for.</p>
                                                <p className="text-right text-xs text-grey-dark mt-1">12:45 pm</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-grey-lighter px-4 py-4 flex items-center">
                                    <div className="flex-1 mx-4">
                                        <input className="w-full border rounded px-2 py-2" type="text" placeholder="Type a message..." />
                                    </div>
                                    <div>
                                        <button className="text-grey-dark">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                                <path fill="#263238" fillOpacity=".6" d="M1.501 1.505a.978.978 0 0 1 1.414 0L22.494 21.59a.977.977 0 1 1-1.414 1.414l-2.553-2.553a.977.977 0 0 1-.352-.064L8.123 16.36a.977.977 0 0 1-.617-.617L4.617 8.827a.976.976 0 0 1 .002-.706L2.154 6.377a.977.977 0 0 1 0-1.414zM3.893 6.619l1.812 1.812L15.512 18.05l5.585 1.503-3.09-3.09-1.503-5.585L6.707 3.893 3.893 6.619zM21 11c0-.264.105-.518.293-.707l1-1A.999.999 0 1 0 20.293 8.293l-1 1A.999.999 0 1 0 21 11zM21 16c0-.264.105-.518.293-.707l1-1A.999.999 0 1 0 20.293 13.293l-1 1A.999.999 0 1 0 21 16z" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}

export default ChatPageTutor
