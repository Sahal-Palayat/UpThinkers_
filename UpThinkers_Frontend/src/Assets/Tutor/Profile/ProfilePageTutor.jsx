import React from 'react'
import TutorSidebar from '../../Components/TutorComponents/TutorSidebar'
import { useSelector } from 'react-redux'

function ProfilePageTutor() {

    const {tutor}= useSelector((state)=>state.tutor)
    return (
        <div>
            <TutorSidebar/>
            <div className="lg:w-[80%] lg:ml-64 px-6 py-8">
            <section class="w-full overflow-hidden dark:bg-white">
                <div class="w-full mx-auto">
                    <img src="https://images.unsplash.com/photo-1560697529-7236591c0066?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxMHx8Y292ZXJ8ZW58MHwwfHx8MTcxMDQ4MTEwNnww&ixlib=rb-4.0.3&q=80&w=1080" alt="User Cover"
                        class="w-full xl:h-[20rem] lg:h-[22rem] md:h-[16rem] sm:h-[13rem] xs:h-[9.5rem]" />

                    <div class="w-full mx-auto flex justify-center">
                        <img src="https://images.unsplash.com/photo-1463453091185-61582044d556?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxMnx8cGVvcGxlfGVufDB8MHx8fDE3MTA0ODExOTN8MA&ixlib=rb-4.0.3&q=80&w=1080" alt="User Profile"
                            class="rounded-full object-cover xl:w-[16rem] xl:h-[16rem] lg:w-[16rem] lg:h-[16rem] md:w-[12rem] md:h-[12rem] sm:w-[10rem] sm:h-[10rem] xs:w-[8rem] xs:h-[8rem] outline outline-2 outline-offset-2 outline-yellow-500 shadow-xl relative xl:bottom-[7rem] lg:bottom-[8rem] md:bottom-[6rem] sm:bottom-[5rem] xs:bottom-[4.3rem]" />
                    </div>

                    <div
                        class="xl:w-[80%] lg:w-[90%] md:w-[94%] sm:w-[96%] xs:w-[92%] mx-auto flex flex-col gap-4 justify-center items-center relative xl:-top-[6rem] lg:-top-[6rem] md:-top-[4rem] sm:-top-[3rem] xs:-top-[2.2rem]">
                        <h1 class="text-center text-gray-800 dark:text-black text-4xl font-serif">{tutor.Name}</h1>
                        <h1 class="text-center text-gray-800 dark:text-black text-4xl font-serif">+91- {tutor.Mobile}</h1>

                        <p class="w-full text-gray-700 dark:text-gray-400 text-md text-pretty sm:text-center xs:text-justify">Lorem, ipsum dolor sit amet
                            consectetur adipisicing elit. Quisquam debitis labore consectetur voluptatibus mollitia dolorem
                            veniam omnis ut quibusdam minima sapiente repellendus asperiores explicabo, eligendi odit, dolore
                            similique fugiat dolor, doloremque eveniet. Odit, consequatur. Ratione voluptate exercitationem hic
                            eligendi vitae animi nam in, est earum culpa illum aliquam. Atque aperiam et voluptatum voluptate
                            distinctio, nostrum hic voluptatibus nisi. Eligendi voluptatibus numquam maxime voluptatem labore
                            similique qui illo est magnam adipisci autem quisquam, quia incidunt excepturi, possimus odit
                            praesentium?</p>

                        <div
                            class="px-2 flex rounded-sm bg-gray-200 text-gray-500 dark:bg-gray-700 dark:bg-opacity-30 dark:text-gray-700 hover:text-gray-600 hover:dark:text-gray-400">
                            <a href="https://www.linkedin.com/in/samuel-abera-6593a2209/">
                                <div data-title="LinkedIn" class="p-2 hover:text-primary hover:dark:text-primary">
                                    <svg class="w-8 h-8 text-gray-800 dark:text-white" aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                                        viewBox="0 0 24 24">
                                        <path fill-rule="evenodd"
                                            d="M12.51 8.796v1.697a3.738 3.738 0 0 1 3.288-1.684c3.455 0 4.202 2.16 4.202 4.97V19.5h-3.2v-5.072c0-1.21-.244-2.766-2.128-2.766-1.827 0-2.139 1.317-2.139 2.676V19.5h-3.19V8.796h3.168ZM7.2 6.106a1.61 1.61 0 0 1-.988 1.483 1.595 1.595 0 0 1-1.743-.348A1.607 1.607 0 0 1 5.6 4.5a1.601 1.601 0 0 1 1.6 1.606Z"
                                            clip-rule="evenodd" />
                                        <path d="M7.2 8.809H4V19.5h3.2V8.809Z" />
                                    </svg>

                                </div>
                            </a>
                            <a href="https://twitter.com/Samuel7Abera7">
                                <div data-title="X" class="p-2 hover:text-primary hover:dark:text-primary">
                                    <svg class="w-8 h-8 text-gray-800 dark:text-white" aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                                        viewBox="0 0 24 24">
                                        <path
                                            d="M13.795 10.533 20.68 2h-3.073l-5.255 6.517L7.69 2H1l7.806 10.91L1.47 22h3.074l5.705-7.07L15.31 22H22l-8.205-11.467Zm-2.38 2.95L9.97 11.464 4.36 3.627h2.31l4.528 6.317 1.443 2.02 6.018 8.409h-2.31l-4.934-6.89Z" />
                                    </svg>

                                </div>
                            </a>
                            <a href="">
                                <div data-title="Facebook" class="p-2 hover:text-blue-500 hover:dark:text-blue-500">
                                    <svg class="w-8 h-8 text-gray-800 dark:text-white" aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                                        viewBox="0 0 24 24">
                                        <path fill-rule="evenodd"
                                            d="M13.135 6H15V3h-1.865a4.147 4.147 0 0 0-4.142 4.142V9H7v3h2v9.938h3V12h2.021l.592-3H12V6.591A.6.6 0 0 1 12.592 6h.543Z"
                                            clip-rule="evenodd" />
                                    </svg>

                                </div>
                            </a>
                            <a href="https://www.youtube.com/@silentcoder7">
                                <div data-title="Youtube" class="p-2 hover:text-primary hover:dark:text-primary">
                                    <svg class="w-8 h-8 text-gray-800 dark:text-white" aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                                        viewBox="0 0 24 24">
                                        <path fill-rule="evenodd"
                                            d="M21.7 8.037a4.26 4.26 0 0 0-.789-1.964 2.84 2.84 0 0 0-1.984-.839c-2.767-.2-6.926-.2-6.926-.2s-4.157 0-6.928.2a2.836 2.836 0 0 0-1.983.839 4.225 4.225 0 0 0-.79 1.965 30.146 30.146 0 0 0-.2 3.206v1.5a30.12 30.12 0 0 0 .2 3.206c.094.712.364 1.39.784 1.972.604.536 1.38.837 2.187.848 1.583.151 6.731.2 6.731.2s4.161 0 6.928-.2a2.844 2.844 0 0 0 1.985-.84 4.27 4.27 0 0 0 .787-1.965 30.12 30.12 0 0 0 .2-3.206v-1.516a30.672 30.672 0 0 0-.202-3.206Zm-11.692 6.554v-5.62l5.4 2.819-5.4 2.801Z"
                                            clip-rule="evenodd" />
                                    </svg>
                                </div>
                            </a>
                        </div>

                        <div class="w-full flex gap-4 justify-center items-center mt-10">
                            <div
                                class="xl:w-1/4 xl:h-32 lg:w-1/5 lg:h-32 md:w-1/5 md:h-28 sm:w-1/3 sm:h-[5rem] xs:w-1/3 xs:h-[4rem] flex justify-center items-center rounded-sm text-center text-lg px-6 py-4 border-2 border-dashed border-gray-300 dark:text-white dark:border-2 dark:border-dashed dark:border-gray-700">
                                27
                            </div>

                            <div
                                class="xl:w-1/4 xl:h-32 lg:w-1/5 lg:h-32 md:w-1/5 md:h-28 sm:w-1/3 sm:h-[5rem] xs:w-1/3 xs:h-[4rem] flex justify-center items-center rounded-sm text-center text-lg px-6 py-4 border-2 border-dashed border-gray-300 dark:text-white dark:border-2 dark:border-dashed dark:border-gray-700">
                                777
                            </div>

                            <div
                                class="xl:w-1/4 xl:h-32 lg:w-1/5 lg:h-32 md:w-1/5 md:h-28 sm:w-1/3 sm:h-[5rem] xs:w-1/3 xs:h-[4rem] flex justify-center items-center rounded-sm text-center text-lg px-6 py-4 border-2 border-dashed border-gray-300 dark:text-white dark:border-2 dark:border-dashed dark:border-gray-700">
                                34
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            </div>
        </div>
    )
}

export default ProfilePageTutor
