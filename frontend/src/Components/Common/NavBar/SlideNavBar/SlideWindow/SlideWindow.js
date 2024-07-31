import React from 'react'
import {AiOutlineClose} from 'react-icons/ai'
import {MdLocalMovies,MdFastfood,MdConnectWithoutContact} from 'react-icons/md'
import {BsNewspaper} from 'react-icons/bs'
import {FcAbout} from 'react-icons/fc'
import {IoLogoGameControllerB} from 'react-icons/io'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouseChimney } from '@fortawesome/free-solid-svg-icons';
import mainlogo from '../../../../../Assests/finalmainlogo.png';


const SlideWindow = (props) => {
  return (
    <>
    <div className='bg-black/70 fixed w-full z-10 h-screen top-0 left-0'>  
   </div>

    <div className='fixed top-0 left-0 2xs:w-[200px] xs:w-[220px] sm:w-[270px]  h-screen bg-[black] z-10 duration-300 overflow-auto'>
      <AiOutlineClose size={30}  color='gold' className='absolute right-4  2xs:top-4 xs:top-6 cursor-pointer 2xs:w-[1.1rem] xs:w-[1.5rem] sm:w-[1.8rem]' onClick={props.SlideMenuOpen}/>
      <img src={mainlogo} alt="SAYS" className='2xs:h-[4rem] xs:h-[5rem] sm:h-[6rem] 2xs:w-[5.5rem] xs:w-[6rem] sm:w-[7rem]'/>
       <nav>
          <ul className='flex-col px-2 text-white'>
            <li className='flex py-3 mt-3 text-lg'>
             <FontAwesomeIcon icon={faHouseChimney} style={{color: "#ffd700"}} className='mr-4 pt-1 2xs:text-[1rem] xs:text-[1.1rem] sm:text-[1.2rem]' /><p className='2xs:text-[0.9rem] xs:text-[1rem] sm:text-[1.2rem]'>Home</p>  
            </li>

            <li className='flex py-3 text-lg'>
              <MdLocalMovies className='mr-4 pt-1 2xs:text-[1.3rem] xs:text-[1.3rem] sm:text-[1.5rem] text-[red]'/> <p className='2xs:text-[0.9rem] xs:text-[1rem] sm:text-[1.2rem]'>Movies</p>
            </li>

            <li className='flex py-3 text-lg'>
            <MdFastfood className='mr-4 pt-1 2xs:text-[1.3rem] xs:text-[1.3rem] sm:text-[1.5rem]'/><p className='2xs:text-[0.9rem] xs:text-[1rem] sm:text-[1.2rem]'>Snacks</p>
            </li>

           <li className='flex py-3 text-lg'>
             <BsNewspaper className='mr-4 pt-1 2xs:text-[1.3rem] xs:text-[1.3rem] sm:text-[1.5rem] text-[orange]'/><p className='2xs:text-[0.9rem] xs:text-[1rem] sm:text-[1.2rem]'>News</p>
            </li>

            <li className='flex py-3 text-lg'>
            <FcAbout className='mr-4 pt-1 2xs:text-[1.3rem] xs:text-[1.3rem] sm:text-[1.5rem] text-[blue]'/><p className='2xs:text-[0.9rem] xs:text-[1rem] sm:text-[1.2rem]'>About</p> 
            </li>

            <li className='flex py-3 text-lg'>
             <MdConnectWithoutContact className='mr-4 pt-1 2xs:text-[1.5rem] xs:text-[1.6rem] sm:text-[1.7rem] text-[green]'/><p className='2xs:text-[0.9rem] xs:text-[1rem] sm:text-[1.2rem]'>ContactUs</p> 
            </li>

            <li className='flex py-3 text-lg mb-4'>
            <IoLogoGameControllerB className='mr-4 pt-1 2xs:text-[1.5rem] xs:text-[1.6rem] sm:text-[1.7rem] text-[lightgreen]'/><p className='2xs:text-[0.9rem] xs:text-[1rem] sm:text-[1.2rem] '>Movie Mania<sup style={{ verticalAlign: "super" }} className='text-[0.5rem] text-[red]'>New</sup></p> 
            </li>

          </ul>
       </nav>
    </div></>
  )
}

export default SlideWindow