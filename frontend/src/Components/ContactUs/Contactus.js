import React, { useEffect, useState } from 'react'
import { Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import { Container } from 'react-bootstrap';
import classes from './ContactUs.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faMapMarkerAlt,faPhoneAlt,faEnvelope} from '@fortawesome/free-solid-svg-icons';
import URL from '../../URL';




const Contactus = () => {
 
 const [name,setname]=useState("");
 const [mail,setmail]=useState("");
 const [msg,setmsg]=useState("");
 const [sent,setsent]=useState(-1);


 const getusermail=async ()=>{
    const response2 = await fetch(URL+"/contactus", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', 
      });

    const res2=await response2.json();
    setmail(res2.email);
    setname(res2.name);
 }

 const SubmitMessage=async (x) => {
    const response = await fetch(URL+"/contactus", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', 
      body:JSON.stringify(x),
    });

    const k = await response.json();
    if(k.k===1)
    {
      setsent(1);
    }
    else
    {
      setsent(0);
    }
    
  }

 

 const OnSubmitHandler=(e) => {
    e.preventDefault();
    const x={
       uname:name,
       email:mail,
       message:msg,
    };
    SubmitMessage(x);
    console.log(x);
    setmsg("");
 }


 useEffect(()=>{
    getusermail();
 },[]);
 
 
    return (
   <div className={classes.body}>
     <div className={classes.overall}>
       <div className={classes.back_home}>
            <Link to="/User/HomePage"> 
              <button>Back to home</button>
           </Link>
           <span className="text-[green] ml-[1rem] font-bold">
             {sent===1 && <>Message sent successfully(Back to Home.........)</> }
             {sent===0 && <>Sorry, It was unsuccessful!!! Try Again</> }
           </span>
      </div>
<Container className={classes.container}>
  <div className={classes.content}>
    <div className={classes.left_side}>
      <div className={classes.details}>
        <FontAwesomeIcon icon={faMapMarkerAlt} style={{color: "blue",fontSize:"2rem"}} />
        <div className={classes.topic}>Address</div>
        <div className={classes.text_one}>IIITS COLLEGE</div>
        <div className={classes.text_two}>SRI CITY, 517646</div>
      </div>

      <div className={classes.details}>
      <FontAwesomeIcon icon={faPhoneAlt} style={{color: "blue",fontSize:"2rem"}} />
        <div className={classes.topic}>Phone</div>
        <div className={classes.text_one}>+9188 8691 9160</div>
        <div className={classes.text_two}>+9185 5594 9262</div>
      </div>

      <div className={classes.details}>
      <FontAwesomeIcon icon={faEnvelope} style={{color: "blue",fontSize:"2rem"}} />
        <div className={classes.topic}>Email</div>
        <div className={classes.text_one}>says@gmail.com</div>
        <div className={classes.text_two}>admin.says@gmail.com</div>
      </div>
    </div>
    <div className={classes.right_side}>
      <div className={classes.topic_text}>Send us a message</div>
      <p></p>

      <form>
        <div className={classes.input_box}>
          <input type="text" value={name} placeholder="Enter your name" name="uname" required readOnly/>
        </div>
        <div className={classes.input_box}>
          <input type="text" value={mail} placeholder="Enter your email" name="email" required readOnly/>
        </div>
        <div className={classes.msg_box}>
          <textarea className={classes.textarea} onChange={(e)=>setmsg(e.target.value)} value={msg} placeholder="Enter your message" name="message"></textarea>
          {msg!=="" && msg.trim().length < 20 && <p className='text-[0.8rem] text-[red]'>Message Should be more than 20 Characters</p>}
        </div>
        <div className='mt-[3rem]'>
            {msg!=="" && msg.trim().length >= 20 &&  <button className='w-[6rem] p-[0.5rem] hover:cursor-pointer text-[1rem] bg-[#3e2093] mt-[1rem] hover:bg-[green] rounded-[6px] text-[white]' onClick={OnSubmitHandler}>Send Now</button>}
            {(msg==="" || msg.trim().length < 20) && <button className='w-[6rem] p-[0.5rem] hover:cursor-pointer text-[1rem] mt-[1rem] bg-[indianred] hover:bg-[red] text-[white] rounded-[6px]' disabled>Send Now</button>}
        </div>
      </form>
    </div>
  </div>
</Container>
</div>
   </div>
  )
}

export default Contactus