import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import classes from './UserProfileEdit.module.css';
import { Row,Col,Container} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import URL from '../../URL';



const UserProfileEdit = () => {
  
  const [fname,setfname]=useState("");
  const [lname,setlname]=useState("");
  const [email,setemail]=useState("");
  const [mobilenum,setmobilenum]=useState(0);
  const [gender,setgender]=useState("");
  const [birthdate,setbirthdate]=useState("");

  const renderUserDetails=async ()=>{
       const res=await fetch(URL+'/profile/laptopprofilepage/getdetails',{
         method:'get',
         headers: {
            "Content-Type": 'application/json'
         },
         credentials:'include',
        });

        const response=await res.json();
        console.log(response[0]);
        setfname(response[0].firstName);
        setlname(response[0].lastName);
        setemail(response[0].email);
        setmobilenum(response[0].MobileNumber);
        setgender(response[0].Gender);
        setbirthdate(response[0].DOB);
  }

  useEffect(()=>{
    renderUserDetails();
  },[]);  
  
  
  // const updateDetails=async ()=>{
      
  //    let obj;

  //   const res=await fetch('http://localhost:5000/profile/profileeditpage',{
  //     method:'put',
  //     headers: {
  //        "Content-Type": 'application/json'
  //     },
  //     body:JSON.stringify(obj),
  //     credentials:'include',
  //    });

  //    const response=await res.json();
     
        


  // }
  
  
  return (
    <>
    {/* <div className={classes.errormessage}>error</div>  */}
<Container className='mt-5 rounded-md'>
        <Row className='h-[100%]'>
          <Col md={3} lg={3}>
          <div className={classes.div1}>
            
            <div className="mt-5 text-center">
                <Link to="/user/profile">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="button" onclick="submitForms()">
                    Save Profile
                </button>
                </Link>
                                        
                {/* <button style="display: none;" type="submit" form="formcreated">demo</button> */}

            </div>
                                
            <div className="flex flex-col items-center text-center p-3 py-[5rem]">
                <img className="rounded-circle mt-5 border-[3px] border-[gold]" width="150px" height="170px"
                        src="https://upload.wikimedia.org/wikipedia/commons/9/9a/Mahesh_Babu_in_Spyder_%28cropped%29.jpg" alt=''/>
                <span className="font-bold">
                    EDIT YOUR ACCOUNT
                </span>
            </div>
          </div>
          </Col>
          

  <Col md={5} lg={5} className={classes.div2}>
    <div className="p-3 py-5">
               <div className="flex justify-between items-center mb-3">
                 <h4 className='font-bold text-[1.5rem]'>Profile Settings</h4>
               </div>
                                        
             <form id="form1" method="post">
                <Row className='mt-2'>
                    <Col md={6} lg={6} className='flex flex-col'>
                    <label className="text-[11px]">First Name</label>
                    <input type="text" className={classes.form_control}
                     value={fname} name="First_Name"/>
                    </Col>

                    <Col md={6} lg={6} className='flex flex-col'>
                    <label className="text-[11px]">Last Name</label>
                    <input type="text" className={classes.form_control}
                      value={lname} name="Last_Name"/>
                    </Col>
                </Row>

                <Row className='mt-4'>
                  <Col md={12} lg={12} className='flex flex-col'>
                    <label className="text-[11px]">Mobile Number</label>
                    <input name="Mobile_Number" type="text" className={classes.form_control} placeholder="Enter phone number" value={mobilenum}/>
                  </Col>

                  <Col md={12} lg={12} className='flex flex-col mt-3'>
                    <label className="text-[11px]">Email Id</label>
                    <input name="email" type="text" value={email} className={classes.form_control}
                    placeholder="Enter email id"/>
                  </Col>


                </Row>


                <Row className='mt-4'>
                  <Col md={6} lg={6} className='flex flex-col'>
                    <label className="text-[11px]">Gender</label>
                    <select value={gender} className={classes.form_control} required name="gender" onChange={(e)=>{setgender(e.target.value)}} >
                        <option disabled selected>Select gender</option>
                        <option value="Male" >Male</option>
                        <option value="Female">Female</option>
                        <option value="Others">Others</option>
                    </select>
                  </Col>

                  <Col md={6} lg={6} className='flex flex-col'>
                    <label className="text-[11px]">Date of Birth</label>
                    <input className={classes.form_control}  type="date" 
                    placeholder="Enter birth date" name="DOB" value={birthdate} required/>
                  </Col>

                  <Col md={6} lg={6} className='flex flex-col mt-3'>
                    <label className="text-[11px]">Login Password</label>
                   <input name="Login_password" type="text" 
                    className={classes.form_control}  placeholder="XXXXXXXXX" value=""/>
                  </Col>

                  <Col md={6} lg={6} className='flex flex-col mt-3'>
                    <label className="text-[11px]">Profile password</label>
                    <input id="Profile_password" type="text" className={classes.form_control} />
                  </Col>


                </Row>
                                                
                                        
            <div className="mt-[1rem]">
                 <input className="hover:cursor-pointer hover:bg-[#daa520]" 
                 type="checkbox" name="cbasking" value=""/>
                 <label class="form-check-label" for="flexSwitchCheckDefault">
                    Would You like to Edit your Card Details ?
                </label>
            </div>
        </form>
    </div>
 </Col>

                        
        <Col md={4} className={classes.div3}>
            <div class="pt-4 p-3 bg-white h-[100%]"> 
              <div className="flex justify-between items-center">
                 <span>
                   <h4 className='font-bold text-[1.5rem]'>Edit Card Details</h4>
                 </span>
                                                
                <span className="border-[1rem] px-3 p-1 add-experience creditcardlogo">
                    <i class="fa-solid fa-credit-card"></i>
                </span>
                                        
              </div><br/>
                                        
              <form id="card_login_form" className='bg-white' style={{display:"none"}}>
                 <div className={classes.carddetailsmodificationlogin}>
                        <Col md={12} className='flex flex-col mt-3'>
                        <label className="text-[11px]">User Reference Number</label>
                            <input type="text" className={classes.form_control}
                            placeholder="SAHI143RUP2222" id="card_check_userid"/>
                        </Col> <br/>

                        <Col md={12} className='flex flex-col mt-3'>
                        <label className="text-[11px]">Profile Password</label>
                        <input type="password" className={classes.form_control}
                              placeholder="Password" id="card_check_Profilepassword"/>
                        </Col> <br/>
                                                        
                        <input type="checkbox" className="mt-[1rem]"/>
                        Show Password

                        <div class="mt-5 text-center">
                            <button className="bg-[#0b0a0bef] border-[#0b0a0bef] hover:bg-[#BA68C8] focus:bg-[#682773] active:bg-[#682773] text-white font-bold py-2 px-4 rounded"
                            type="button">
                                Login
                           </button>
                           
                       </div>
                    </div>
                </form>
                                        
                {/* style={{display:"none"}} */}
               <form id="form2" method="post">
                    <div className={classes.carddetailsdiv} >
                       <Col md={12} lg={12} className='flex flex-col mt-3'>
                       <label className="text-[11px]">CardHolderName</label>
                         <input type="text" className={classes.form_control_card_details}
                         placeholder="e.g.Varun" value="" name="Card_Name"/>
                       
                       </Col><br/>


                       <Col md={12} lg={12} className='flex flex-col mt-3'>
                         <label className="text-[11px]">Card Number</label>
                         <input type="text" className={classes.form_control_card_details} placeholder="e.g.1234 5678 9548" 
                           value="" name="Card_Number"/>
                       
                       </Col>

                       <Col md={12} lg={12} className='flex flex-col mt-3'>
                         <label className="text-[11px]">CVV</label>
                         <input type="text" className={classes.form_control_card_details}  placeholder="XXX" name="CVV" value="123"/>
                       </Col>


                        <Col md={12} lg={12} className='flex flex-col mt-3'>
                        <label className="text-[11px]">Expiry</label>
                        <input type="text" className={classes.form_control_card_details}
                        placeholder="XX" value=""  name="Expiry"/>
                       </Col>

                       <Col md={12} lg={12} className='flex flex-col mt-3'>
                       <label className="text-[11px]">Profile Password</label>
                        <input type="text"  className={classes.form_control_card_details} placeholder="XXXXXXXXX"
                         value="" name="Profile_password"/>
                       </Col>
                                                    
                </div>
            </form>
         </div>
         </Col>
    </Row>
</Container> 

    </>
  )
}

export default UserProfileEdit