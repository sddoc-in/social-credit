import React from "react";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineCampaign } from "react-icons/md";
import { BsCurrencyDollar } from "react-icons/bs";
import { FaRegEye } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

import { CiEdit } from "react-icons/ci";
export default function Card() {
    return (
        <>
            <section className="text-gray-600 body-font mt-12 ">

                <div className="flex flex-wrap -m-4 ">
                    <div className="xl:w-1/3 md:w-1/2 p-4 ">
                        <div className="border border-gray-200 p-6 rounded-lg shadow-xl">

                            <div className="flex mb-4">
                                <div className="w-1/2 ">
                                    <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
                                        <svg
                                            fill="none"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            className="w-6 h-6"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="w-1/2 ">
                                    <p>B2B Dever  </p>
                                    <div className="flex mt-4 ">
                                        <div className="w-1/2">
                                            <span className="flex"> <FaRegUser className="text-xl mt-1  text-blue-400" /><p className="ml-1"> 12</p></span>
                                        </div>

                                        <div className="w-1/2">
                                            <span className="flex"> <MdOutlineCampaign className="text-3xl mt-1  text-blue-400" /> <p className="ml-1"> 15 </p></span>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <hr className="w-50 h-1" />
                            <div className="flex mt-6">
                                <div className="w-1/2">
                                    <span className="flex"> <BsCurrencyDollar className="text-3xl mt-1.5 text-blue-400" /> <p className="ml-1 mt-1">12 </p></span>
                                </div>
                                <div className="w-1/2">
                                    <div className="flex">
                                        <div className="w-1/3"><span className="flex"><FaRegEye className="text-2xl mt-1.5" /></span></div>
                                        <div className="w-1/3"> <span className="flex"><CiEdit className="text-2xl mt-1.5" /></span></div>
                                        <div className="w-1/3"><span className="flex"><MdDeleteForever className="text-2xl mt-1.5 text-rose-500" /></span></div>

                                    </div>



                                </div>
                            </div>

                        </div>
                    </div>

                </div>


            </section>




        </>
    )
}