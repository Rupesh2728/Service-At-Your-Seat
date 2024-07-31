import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import classes from './TheatreSnacks.module.css';
import TNavbar from "../TCommon/navbar";
import AddSnack from "./AddSnack";
import EditSnack from "./EditSnack";
import URL from "../../../URL";





const TheatreSnacks = () => {
  
  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  const [snacksarr,setsnacksarr] = useState([]);
  const [editsnackdetail,seteditsnackdetail] = useState({});


  const renderSnacks = async () => {

    const res = await fetch(
      URL+"/tsnackspage/",
      {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
        credentials:'include',
      }
    );
    const snackobjarr = await res.json();
    setsnacksarr(snackobjarr.snackinfoarr);
  
  }


  const removeHandler= async (snack) =>{
    let obj={
      sname: snack.SnackName,
      category: snack.category,
    }

      
      const res = await fetch(
        URL+"/tsnackspage/removesnack",
        {
          method: "post",
          body: JSON.stringify(obj),
          headers: {
            "Content-Type": "application/json",
          },
          credentials:'include',
        }
      );

      const k=await res.json();
    if(k.k===1)
    {
      renderSnacks();
    }
  }


  const getsnackdetails = async (snack) =>
  {

    const obj={
      sname: snack.SnackName,
      category: snack.category,
    }

    const res = await fetch(
      URL+"/tsnackspage/getsnackdetails",
      {
        method: "post",
        body: JSON.stringify(obj),
        headers: {
          "Content-Type": "application/json",
        },
        credentials:'include',
      }
    );

    const response = await res.json();
    seteditsnackdetail(response);
    handleShow2();
   
  }

  useEffect(() => {
    renderSnacks();
  },[]);
  
  return (
<>
   {show1 && <AddSnack renderSnacks={renderSnacks} show={show1} handleClose={handleClose1}/>}
   {show2 && <EditSnack snack={editsnackdetail} renderSnacks={renderSnacks} show={show2} handleClose={handleClose2}/>}

    <TNavbar/>
  <div className='mt-[3rem]'>
  <div className={classes.heading}>
     <div className=" flex justify-between w-[100%]">
     <h4>Snacks</h4>
      <button onClick={handleShow1} className='rounded-md bg-[#198754] text-[white] hover:bg-[green] w-[7.5rem] h-[2.5rem] mr-[1rem] mt-[0.75rem]'>
          Add
      </button>
     </div>
  </div>

   {/* <p className='text-[gold] text-[2rem] items-center text-center mt-[2rem]'>OOPS...No Snacks are Present in your Theatre</p>} */}
   
   <Container className='mt-[2rem] flex justify-center'>  
   {snacksarr.length===0 && <p className='text-[gold] text-[2rem] mt-[1rem]'>No Snacks Present in this theatre!!!</p>} 
   {snacksarr.length!==0 &&
   <div className={classes.table}> 
   
   <table>
   <thead>
     <tr className={classes.headingrow}>
       <th className={classes.th}>#Pic</th>
       <th className={classes.th}>Snack Name</th>
       <th className={classes.th}>Category</th>
       <th className={classes.th}>Price</th>
     </tr>
   </thead>
   
   <tbody>
    {snacksarr.map((snack)=>{
        return(
        <tr>  
        <td className={classes.td}>
            <img src={snack.imgurl} alt="" className={classes.snackpic}/>
        </td>
        <td className={classes.td}>{snack.SnackName}</td>
        <td className={classes.td}>{snack.category}</td>
        <td className={classes.td} style={{fontWeight:600}}>{snack.price}/-</td>
        <td className={classes.td}>
          <div className='flex'>
             <button onClick={()=>{getsnackdetails(snack)}} className='rounded-md bg-[#0d6efd] hover:bg-[#2196F3] text-white p-2 w-[6rem]'>
                Edit
             </button>

             <button onClick={()=>removeHandler(snack)} className='rounded-md bg-[#0d6efd] hover:bg-[#2196F3] ml-[2rem] text-white p-2 w-[6rem]'>
                Remove
             </button>
          </div> 
        </td>
      </tr>)
    })}
     
 
      
   
   </tbody>
 </table>
  
</div>      }
   

</Container>

</div>
</>);
  
};

export default TheatreSnacks;
