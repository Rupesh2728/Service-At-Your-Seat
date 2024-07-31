import React, { useState} from 'react'
import classes from './Mail.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminNav from '../../Common/Admin/Navbar/AdminNav';
import { useNavigate } from 'react-router-dom';
import URL from '../../../URL';



const Mail = () => {
  const navigate = useNavigate();
  const [toaddress,settoaddress]=useState("Both");
  const [subject,setsubject]=useState("");
  const [msg,setmsg] = useState("");
  const [tomail,settomail] = useState("");

  const SubmitMail =async (x) => {
    const response = await fetch(URL+"/adminmassmail", {
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
      navigate("/Admin")
    }
    else
    {
      alert("Email is not sent");
    }
    
  }

  
  

  const OnsubmitHandler=(e)=>{
      e.preventDefault();
      const x={
        tomail : tomail,
        toaddress : toaddress,
        message : msg,
        subject: subject,
      }

      console.log(x);
      SubmitMail(x);
      setmsg("");
      setsubject("");
      settoaddress("Both");
      settomail("");
  } 
  
  
  
  
  return (
    <div className={classes.style}>
      <AdminNav signout={false}/>
      <div className={classes.maindiv}>
        <h1 className={classes.h1}>#MAIL FORM</h1>
	<form className={classes.form}>
		<div className={classes.div1}>
        <div className={classes.subdiv1}>
           <label for="theatreName" className={classes.label}>From:</label>
		       <input type="text" name="fromaddress" value="contactSAYS123@gmail.com" className={classes.input} readOnly/><br/>
        </div>
		
		<div className={classes.subdiv2} style={{display:'flex', flexDirection:'column'}}>
            <label for="toaddress" className={classes.label}>To:</label>
            <select name="toaddress" value={toaddress} className='w-[10rem]' onChange={(e)=>{settoaddress(e.target.value)}}>
                <option value="Both" className={classes.option}>Both</option>
                <option value="All Users" className={classes.option}>All Users</option>
                <option value="All Theatres" className={classes.option}>All Theatres</option>
                <option value="None" className={classes.option}>None</option>       
            </select>
     </div>
        </div>
		
		<div className={classes.div2}>
        <div className={classes.subdiv1}>
            <label for="toaddress" className={classes.label}>To:</label>
            {
              toaddress==="None"?<input type="text" value={tomail} name="tomail" onChange={(e)=>{settomail(e.target.value)}} className={classes.input} required/>:
              <input type="text" name="tomail" value="" className={classes.input} disabled required/>
            }
            <br/>
        </div>

        <div className={classes.subdiv2}>
            <label for="imgurl" className={classes.label}>Subject:</label>
            <input type="text" value={subject} onChange={(e)=>{setsubject(e.target.value)}} className={classes.input} name="subject" required/><br/>
        </div>
        </div>

		    
       <div className={classes.div2} style={{display:'flex', flexDirection:'column'}}>
        <label for="about" className={classes.label}>Message:</label>
        <textarea name="message" value={msg} onChange={(e)=>{setmsg(e.target.value)}} rows="5" cols="100" required></textarea>
        <br/>
       </div>

     <div className={classes.div6}>
        {msg!=="" && toaddress!=="None" && <button type="button" onClick={OnsubmitHandler} style={{backgroundColor:'green'}}  className={classes.button} >Send Mail</button>}
        {msg==="" && toaddress!=="None" && <button type="button"  className={classes.button} style={{backgroundColor:'red'}} disabled>Send Mail</button>}
        {msg!=="" && toaddress==="None" && tomail!=="" && <button type="button" onClick={OnsubmitHandler} style={{backgroundColor:'green'}}  className={classes.button} >Send Mail</button>}
        {msg!=="" && toaddress==="None" && tomail==="" && <button type="button"  className={classes.button} style={{backgroundColor:'red'}} disabled>Send Mail</button>}
        {msg==="" && toaddress==="None" && tomail!=="" &&  <button type="button"  className={classes.button} style={{backgroundColor:'red'}} disabled>Send Mail</button>}
        {msg==="" && toaddress==="None" && tomail==="" && <button type="button"  className={classes.button} style={{backgroundColor:'red'}} disabled>Send Mail</button>}
     </div>
	</form>

    </div>
      
    </div>
  )
}

export default Mail;