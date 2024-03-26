import React from "react";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineCampaign } from "react-icons/md";
import { BsCurrencyDollar } from "react-icons/bs";
import { FaRegEye } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

import { CiEdit } from "react-icons/ci";
export default function Card() {
    const data = [
        { age: 23, name: "John", Campaign: 23, Dollar: 21 },
        { age: 45, name: "Alice", Campaign: 24, Dollar: 21 },
        { age: 32, name: "Bob", Campaign: 45, Dollar: 26 },
        { age: 56, name: "Emily", Campaign: 23, Dollar: 21 },
        { age: 34, name: "Michael", Campaign: 63, Dollar: 41 },
        { age: 28, name: "Samantha", Campaign: 47, Dollar: 33 },
        { age: 41, name: "David", Campaign: 73, Dollar: 21 },
        { age: 39, name: "Sophia", Campaign: 23, Dollar: 67 },
        { age: 50, name: "Daniel", Campaign: 55, Dollar: 21 },
        { age: 25, name: "Olivia", Campaign: 53, Dollar: 55 },  
        { age: 34, name: "Michael", Campaign: 63, Dollar: 41 },
        { age: 39, name: "Sophia", Campaign: 23, Dollar: 67 },
    ];
    return (
        <>
            <div className='flex flex-wrap '>
                {data.map((data) =>

                    <section className="text-gray-600 body-font mt-8 ">
                        <div className="flex  ">
                            <div className="w-50 md:w-96  p-8 ">
                                <div className="border border-gray-200 p-6 rounded-lg shadow-xl ">
                                    <div className="flex w-full mb-4">
                                        <div className="w-1/3 ">
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
                                            <p>{data.name} </p>
                                            <div className="flex mt-4 ">
                                                <div className="w-1/2">
                                                    <span className="flex"> <FaRegUser className="text-xl mt-1  text-blue-400" /><p className="ml-1">{data.age}</p></span>
                                                </div>
                                                <div className="w-1/2">
                                                    <span className="flex"> <MdOutlineCampaign className="text-3xl mt-1  text-blue-400" /> <p className="ml-1">{data.Campaign} </p></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <hr className="w-50 h-1" />
                                    <div className="flex mt-6">
                                        <div className="w-1/2">
                                            <span className="flex"> <BsCurrencyDollar className="text-3xl mt-1.5 text-blue-400" /> <p className="ml-1 mt-1">{data.Dollar} </p></span>
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

                )
                }
            </div>

        </>
    )
}