import React, { useEffect } from 'react';
import classes from './Home.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminNav from '../../Common/Admin/Navbar/AdminNav';
import { Row,Col,Container } from 'react-bootstrap';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { useState } from 'react';
import QueryModal from './QueryModal';
import URL from '../../../URL';


const Home = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [msg,setmsg] = useState("");
  const [msgobjarr,setmsgobjarr]=useState([]);
  const [tnum,settnum] = useState(0);
  const [unum,setunum] = useState(0);
  const [tverificationarr,settverificationarr]=useState([]);

  const getdetails=async ()=>{
    

   console.log(URL+'/adminhome');
    const response2 = await fetch(URL+'/adminhome', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', 
    });

  const res2=await response2.json();
  setmsgobjarr(res2.msgobjarr);
  settnum(res2.tnum);
  setunum(res2.unum);
  settverificationarr(res2.theatreverificationarr);
  }


  useEffect(()=>{
    getdetails();
  },[]);


  const AcceptHandler=async (temail)=>{
    const response = await fetch(URL+"/adminhome/accepttheatre",
    {
      method: "POST",
      body: JSON.stringify({temail:temail}),
      headers: {
        "Content-Type": "application/json",
      },
      credentials:'include',
    },
   
  );
  const res = await response.json();
  console.log(res);
  }

  const RejectHandler=async (temail)=>{
    const response = await fetch(URL+"/adminhome/rejecttheatre",
    {
      method: "POST",
      body: JSON.stringify({temail:temail}),
      headers: {
        "Content-Type": "application/json",
      },
      credentials:'include',
    },
   
  );
  const res = await response.json();
  console.log(res);
  }

  
  return (
    <div className='w-[100%] bg-black'>
    <AdminNav signout={true}/>
     <Row className='mt-[2rem] flex justify-center'>
  
           <Col lg={1} md={1} sm={1}>

           </Col>

           <Col lg={3} md={4} sm={6}>  
              <div className='bg-[#221f1f] text-white rounded-[5px] w-[15rem] h-[8rem] text-[1.6rem] font-semibold'>
                <h3  className='pl-[1rem] pt-[0.5rem] text-[1.7rem]'>Theatres Registered</h3>
                <h4  className='pl-[1rem] pt-[0.5rem] text-[gold] text-[1.5rem]'>{tnum}</h4>
              </div>
          </Col>

          <Col lg={3} md={4} sm={6}>
            
            <div className='bg-[#221f1f] text-white rounded-[5px] w-[14rem] h-[8rem] font-semibold'>
              <h3 className='pl-[1rem] pt-[0.5rem] text-[1.8rem]'>Users Registered</h3>
              <h4 className='pl-[1rem] pt-[0.5rem] text-[gold] text-[1.5rem]'>{unum}</h4>
            </div>

          </Col>
    </Row>

    
     {show && <QueryModal show={show} handleClose={handleClose} msg={msg}/>}

     <Container className='mt-[5rem] w-[80%]'> 
          <div className={classes.websitereviews}>
            <h4 className='w-[16rem] text-[1.6rem] font-semibold'>Theatre Verification</h4>
            {tverificationarr.length===0 &&  <p className='text-[gold] text-[2rem] mt-1'>No Theatres For Verification</p>}
             {tverificationarr.length!=0 && 
             
              <div className={classes.reviewtable}>
                <table className={classes.table}>
                  <thead>
                    <tr className={classes.headingrow}>
                      <th>#</th>
                      <th>Theatre Liscence No.</th>
                      <th>Theatre MailId</th>
                      <th>Theatre Name</th>
                      <th>Location</th>
                      <th>Verification</th>
                    </tr>
                  </thead>
                  
                  <tbody>
                   {tverificationarr.map((item,index)=>{
                    return ( 
                    <tr key={index}>
                      <td>{index+1}</td>
                      <td>{item.licensenum}</td>
                      <td>{item.temail}</td> 
                      <td>{item.tName}</td>
                      <td>{item.city}</td>
                      <td>
                      <button onClick={()=>AcceptHandler(item.temail)} className='border-0 bg-green-500 text-white rounded-[5px] w-[5rem] h-[2rem] m-2 mt-0 mb-0'>Accept</button>

                      <button onClick={()=>RejectHandler(item.temail)} className=' border-0 bg-[red] text-white rounded-[5px] w-[5rem] h-[2rem] m-2 mt-0 mb-0'>Reject</button>
                      </td>
                    </tr>);
                   })}             
                  </tbody>
                </table>
            </div>
             }
         
          </div>
        </Container>



        <Container className='mt-[5rem] w-[80%]'> 
          <div className={classes.websitereviews}>
            <h4 className='w-[16rem] text-[1.6rem] font-semibold'>Website Queries</h4>
              {/* <p className='text-[gold] text-[2rem] mt-1'>No Queries...Till Date</p>      */}
              <div className={classes.reviewtable}>
                <table className={classes.table}>
                  <thead>
                    <tr className={classes.headingrow}>
                      <th>#</th>
                      <th>UserReffNum</th>
                      <th>MailId</th>
                      <th>Date</th>
                      <th>Name</th>
                      <th>Review</th>
                    </tr>
                  </thead>
                  
                  <tbody>

                    {msgobjarr.map((item,index)=>{

                      return (
                      <tr key={index}>
                        <td>{index+1}</td>
                        <td>{item.UserReferenceNumber}</td>
                        <td>{item.mailid}</td> 
                        <td>{item.date}</td>
                        <td>{item.name}</td>
                        <td>
                        <button className='border-0 bg-[blue] text-white rounded-[5px] w-[8rem] h-[2.5rem] m-2 mt-0 mb-0' onClick={() => {setShow(true);setmsg({msg:item.message,mail:item.mailid,name:item.name})}}>See full Query</button>
                        </td>
                      </tr>);

                    })}
              
                      
                  </tbody>
                </table>
            </div>
         
          </div>
        </Container>


        <hr className='text-white w-[75%] ml-[12rem] mt-[2rem]'/>
           <div className={classes.salesreport}>
              <h2>WEBSITE REPORT</h2>

             <Container className='mt-[5rem]'>
               <Row className='text-white mb-[3rem]'>
                 <Col className='flex justify-center'>
                    <div className={classes.weeklysales}>
                       <h4>WEEKLY</h4>
                       <hr className='w-[75%] ml-[2rem] mt-[1rem]'/>
                       
                       <div>
                         <div className='mt-[1rem]'>
                            <div className='flex justify-between'>
                               <p className='text-[1.2rem] ml-[0.5rem]'>Active Users</p>
                               <div className='text-[1.2rem] mr-[0.5rem] mt-[1rem]'>
                                 1000
                               </div>
                            </div>

                           <div className='w-[75%] ml-[2.4rem]'>
                              <ProgressBar variant="success" now={40}/>
                           </div> 
                        </div>

                        
                        <div className='mt-[1rem]'>
                          <div className='flex justify-between'>
                             <p className='text-[1.2rem] ml-[0.5rem]'>Active Theatre Clients</p>
                             <div className='text-[1.2rem] mr-[0.5rem] mt-[1rem]'>
                               10
                             </div>
                          </div>

                         <div className='w-[75%] ml-[2.4rem]'>
                            <ProgressBar variant="info" now={25} />
                         </div> 
                      </div>

                      <div className='mt-[1rem]'>
                        <div className='flex justify-between'>
                           <p className='text-[1.2rem] ml-[0.5rem]'>Transactions</p>
                           <div className='text-[1.2rem] mr-[0.5rem] mt-[1rem]'>
                             500
                           </div>
                        </div>

                       <div className='w-[75%] ml-[2.4rem]'>
                          <ProgressBar variant="warning" now={60} />
                       </div> 
                    </div>

                          

                       </div>
                    </div>
                 
                 </Col>
                  

                 


                 <Col className='flex justify-center'>
                    <div className={classes.weeklysales}>
                       <h4>MONTHLY</h4>
                       <hr className='w-[75%] ml-[2rem] mt-[1rem]'/>
                       
                       <div>
                         <div className='mt-[1rem]'>
                            <div className='flex justify-between'>
                               <p className='text-[1.2rem] ml-[0.5rem]'>Active Users</p>
                               <div className='text-[1.2rem] mr-[0.5rem] mt-[1rem]'>
                                 200
                               </div>
                            </div>

                           <div className='w-[75%] ml-[2.4rem]'>
                              <ProgressBar variant="success" now={40}/>
                           </div> 
                        </div>

                        
                        <div className='mt-[1rem]'>
                          <div className='flex justify-between'>
                             <p className='text-[1.2rem] ml-[0.5rem]'>Active Theatre Clients</p>
                             <div className='text-[1.2rem] mr-[0.5rem] mt-[1rem]'>
                               30
                             </div>
                          </div>

                         <div className='w-[75%] ml-[2.4rem]'>
                            <ProgressBar variant="info" now={25} />
                         </div> 
                      </div>

                      <div className='mt-[1rem]'>
                        <div className='flex justify-between'>
                           <p className='text-[1.2rem] ml-[0.5rem]'>Transactions</p>
                           <div className='text-[1.2rem] mr-[0.5rem] mt-[1rem]'>
                             400
                           </div>
                        </div>

                       <div className='w-[75%] ml-[2.4rem]'>
                          <ProgressBar variant="warning" now={60} />
                       </div> 
                    </div>

                          

                       </div>
                    </div>
                 
                 </Col>

                 <Col className='flex justify-center'>
                    <div className={classes.weeklysales}>
                       <h4>YEARLY</h4>
                       <hr className='w-[75%] ml-[2rem] mt-[1rem]'/>
                       
                       <div>
                         <div className='mt-[1rem]'>
                            <div className='flex justify-between'>
                               <p className='text-[1.2rem] ml-[0.5rem]'>Active Users</p>
                               <div className='text-[1.2rem] mr-[0.5rem] mt-[1rem]'>
                                 3000
                               </div>
                            </div>

                           <div className='w-[75%] ml-[2.4rem]'>
                              <ProgressBar variant="success" now={40}/>
                           </div> 
                        </div>

                        
                        <div className='mt-[1rem]'>
                          <div className='flex justify-between'>
                             <p className='text-[1.2rem] ml-[0.5rem]'>Active Theatre Clients</p>
                             <div className='text-[1.2rem] mr-[0.5rem] mt-[1rem]'>
                               50
                             </div>
                          </div>

                         <div className='w-[75%] ml-[2.4rem]'>
                            <ProgressBar variant="info" now={25} />
                         </div> 
                      </div>

                      <div className='mt-[1rem]'>
                        <div className='flex justify-between'>
                           <p className='text-[1.2rem] ml-[0.5rem]'>Transactions</p>
                           <div className='text-[1.2rem] mr-[0.5rem] mt-[1rem]'>
                             1500
                           </div>
                        </div>

                       <div className='w-[75%] ml-[2.4rem]'>
                          <ProgressBar variant="warning" now={60} />
                       </div> 
                    </div>

                          

                       </div>
                    </div>
                 
                 </Col>

                  </Row>
        
           </Container>
           </div>   



    </div>
    
  )
}

export default Home