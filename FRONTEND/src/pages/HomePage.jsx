import React from 'react'
import UrlForm from '../components/UrlForm'

const HomePage = () => {
  return (
   
      <div className='flex flex-col gap-4 items-center justify-center w-full sm:w-[600px] h-96 bg-gray-800 mx-auto my-50'> 
        <h1 className='text-3xl font-bold text-white '>Url Shortner</h1>
      <UrlForm/>
     
</div>
   
   
  )
}

export default HomePage
