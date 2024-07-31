import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Modal from 'react-bootstrap/Modal';
import { Row, Col } from 'react-bootstrap';
import classes from './AddSnack.module.css';
import URL from '../../../URL';




const EditSnack = ({snack,show,handleClose,renderSnacks}) => {
   
  const [sname,setsname]=useState(snack.SnackName);
  const [category,setcategory]=useState(snack.category);
  const [price,setprice]=useState(snack.price);
  const [imgurl,setimgurl]=useState(snack.imgurl);


    
  const snamechangeHandler=(e)=>{
     setsname(e.target.value);
  }

  const categorychangeHandler=(e)=>{
    setcategory(e.target.value);
 }

 const pricechangeHandler=(e)=>{
    setprice(e.target.value);
 }

 const imgurlchangeHandler=(e)=>{
    setimgurl(e.target.value);
 }
  
  
const onSubmitHandler = async () => {
    const obj={
        esname:sname,
        escategory:category,
        esprice:price,
        esimgurl:imgurl,
      };

      let res = await fetch(
        URL+"/tsnackspage/editsavesnack",
        {
          method: "post",
          body: JSON.stringify(obj),
          headers: {
            "Content-Type": "application/json",
          },
          credentials:'include',
        }
      );
      let response = await res.json();

      if(response.k===1)
      {
        renderSnacks();
        handleClose();
      }
  };
  
  
  
    return (
    <Modal show={show} onHide={handleClose} size='lg'>
    <Modal.Header className='bg-[#212f1f] text-[gold]'>
      <Modal.Title>Edit Snack</Modal.Title>
    </Modal.Header>
    <Modal.Body className='bg-white'>
    <div className={classes.addsnackform}>
       <form>
          <Row>
             <Col className=' flex flex-col'>
                    <p className='mt-[0.8rem] ml-[0.5rem]'>Snack Name</p>
                    <input value={sname} onChange={snamechangeHandler} className={classes.input} type="text" name="sname" required/>       
             </Col> 

             <Col className=' flex flex-col'>
                    <p className='mt-[0.8rem]'>Snack Category</p>
                    <input value={category} onChange={categorychangeHandler} className={classes.input} type="text" name="category" required/>    
             </Col>                        
          </Row>

          <Row>
             <Col className=' flex flex-col'>
                <p className='mt-[0.8rem] ml-[0.5rem]'>Price(In Rupees)</p>
                <input value={price} onChange={pricechangeHandler} className={classes.input} type="text" name="price" required/>
             </Col> 

             <Col className='flex flex-col'>
                 <p className='mt-[0.8rem]'>Upload image URL</p>
                 <input value={imgurl} onChange={imgurlchangeHandler}  className={classes.input} type="text"  name="snackimg" required/>
             </Col>
          </Row>
            
                       
           <div className='flex justify-center'>
              <button onClick={onSubmitHandler} className='bg-[#198754] hover:bg-[green] rounded-[0.5rem] mb-[0.5rem] text-[white] mt-[1rem] w-[6rem] h-[2.5rem]'>
                   Submit
              </button>
           </div>
            
        </form>
     </div>

    </Modal.Body>
    <Modal.Footer>
      <button className='border-0 bg-[red] hover:bg-[indianred] text-white rounded-[5px] w-[5.5rem] h-[2.5rem]' onClick={handleClose}>Close</button>
    </Modal.Footer>
  </Modal>
  )
}

export default EditSnack