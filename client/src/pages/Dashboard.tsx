import React from 'react'



export default function Dashboard() {
  return (
    <>
      <div>
        <h1 className="font-black text-3xl text-start text-black">Dashboard Users
        </h1>
      </div>
      <div className=" grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 mt-8">
        <div className="bg-red-100 col-span-2">
        <img src="./images.png" alt="img not found" className=' h-150  mt-20 mb-20 md:ml-36 ml-6' />
          </div>
        <div className="bg-blue-100 col-span-1 pt-32">
          <p className='text-center pr-8 font-[500]'>Number :<span className='font-black text-xl text-start text-black'>50</span></p>
          <p className='text-center  font-[500] pl-10'>User-Name :<span className='font-black text-xl text-start text-black'>Denver</span></p>
          <p className='text-center font-[400] pl-3 md:pb-2 mb-16'>Most Coin Gainer</p>
        </div>

      </div>
    </>
  )
}
