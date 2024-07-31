import React from 'react';
import bgimg from '../../Assests/Error/Errorbg.jpeg';
import { Link } from 'react-router-dom';
function Error() {
  
    return (  
    <>
    <img src={bgimg} alt='' className='bg-cover relative'/>
    <div className=" text-red-500 h-screen flex flex-col items-center absolute top-[12rem] left-[32rem]">
      <h1 className="text-4xl mb-4">Oops! Something went wrong.</h1>
      <p className="text-lg mb-8">We apologize, but it seems there was an error.</p>
      <Link to="/User/HomePage">
      <button className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 focus:outline-none focus:bg-red-600">
        Go Back Home
      </button>
      </Link>
    </div>
    </>
  );
}

export default Error;
