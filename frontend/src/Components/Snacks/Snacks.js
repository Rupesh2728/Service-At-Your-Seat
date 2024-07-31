import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import classes from './Snacks.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faIndianRupeeSign,faStar,faPlusCircle,faCartShopping } from '@fortawesome/free-solid-svg-icons';
import Cart from './Cart';
import Card from './Card';
import URL from '../../URL';



const Snacks = () => {
  
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [ticketarr,setticketarr]=useState([]);
  const [fooditemarr,setfooditemarr]=useState([]);
  const [ticketid,setticketid]=useState('');

  const [cartItems,setcartItems]=useState([]);
  const [totalprice,settotalprice]=useState(0);
  const [totalitems,settotalitems]=useState(0);
  
  


  const renderSnacks=async ()=>{
    console.log("hi came");
    const res = await fetch(
      URL+"/snacks/",
      {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
        credentials:'include',
      }
    );
    const obj = await res.json();
    console.log(obj);
    setticketid(obj.TicketId);
    const ticketarr=[];
    for(let i=obj.ticketarr.length-1;i>=0;i--)
    {
       ticketarr.push(obj.ticketarr[i]);
    }
    setticketarr(ticketarr);
    setfooditemarr(obj.fooditem);
  }

  useEffect(()=>{
     renderSnacks();
  },[]);


  const handleSelectChange = async (event) => {
    const ticketid= event.target.value;
     setticketid(ticketid);
    const res = await fetch(
      URL+"/snacks/",
      {
        method: "post",
        body: JSON.stringify({Ticketid:ticketid}),
        headers: {
          "Content-Type": "application/json",
        },
        credentials:'include',
      }
    );
    const k = await res.json();
    if(k.k===1)
    {
       renderSnacks();
    }
    
  };

  const calc_total_items_n_price=(items)=>{
    let total_items=0;
    let total_price=0;
    for(let i=0; i<items.length; i++){
       total_items+=items[i].quantity;
       total_price+=Number(items[i].quantity)*Number(items[i].price);
   }

   settotalitems(total_items);
   settotalprice(total_price);
  }


  const addtocart=(fooditem)=>{
     let newcartItems=[];
     for(let i=0;i<cartItems.length;i++)
     {   if(cartItems[i].SnackName===fooditem.SnackName)
             {
              window.alert("Already added to cart!!!");
              break;
             }

       newcartItems.push(cartItems[i]);        
     }

     console.log(newcartItems);
     fooditem["quantity"]=1;
    
     setcartItems([...newcartItems,fooditem]);

     calc_total_items_n_price([...newcartItems,fooditem]);

     console.log(cartItems);
  }

  return (
    <>
        {show && <Cart show={show} handleClose={handleClose} cartItems={cartItems} setcartItems={setcartItems} 
          totalprice={totalprice} totalitems={totalitems} ticketid={ticketid} calc_total_items_n_price={calc_total_items_n_price}/>}
      <div className={classes.header}>
            <div className={classes.add_box}>
              <div className=' hover:cursor-pointer'>
                <label>Ticket Id :</label>
                <select name="Ticketid" value={ticketid}  className={classes.ticketid} onChange={handleSelectChange}>   
                    {ticketarr.map(ticket=>{
                      return (
                      <option value={ticket.TicketId}>
                         {ticket.TicketId}
                     </option> )
                    })} 
                </select>
              </div>
            </div>

        
            <button type="button" className='bg-[#221f1f] p-2 mr-[3rem]' onClick={handleShow}>
            <FontAwesomeIcon icon={faCartShopping} style={{color:"#ffd700",}}/>
              <span className='text-white px-1 ml-2'>{totalitems} Items</span>
            </button>

      </div>
   
    
      <div className={classes.food_items}>
            <div className={classes.biriyani}>
                    <p className={classes.category_name}>Popcorn</p>
                       {  
                        fooditemarr.map(fooditem=>{
                           if(fooditem.category==="Popcorn")
                           {
                            return ( 
                             <Card fooditem={fooditem} addtocart={addtocart}/>)
                           }

                        
                       })}
    
                  </div>



                  <div className={classes.biriyani}>
                    <p className={classes.category_name}>Drinks</p>
                       {  
                       fooditemarr.map(fooditem=>{
                           if(fooditem.category==="Soft Drinks" || fooditem.category==="Water Bottle")
                           {
                            return ( 
                              <Card fooditem={fooditem} addtocart={addtocart}/>)
                           }

                        
                       })}
    
                  </div>


                  <div className={classes.biriyani}>
                    <p className={classes.category_name}>Pizza's and Burger's</p>
                       {fooditemarr.map(fooditem=>{
                           if(fooditem.category.includes('Pizza') || fooditem.category.includes('Burger'))
                           {
                            return ( 
                              <Card fooditem={fooditem} addtocart={addtocart}/>)
                           }

                        
                       })}
    
                  </div>

                  <div className={classes.biriyani}>
                    <p className={classes.category_name}>Samosa and Puff's</p>
                       {fooditemarr.map(fooditem=>{
                           if(fooditem.category.includes('Samosa') || fooditem.category.includes('puff'))
                           {   
                            return ( 
                              <Card fooditem={fooditem} addtocart={addtocart}/>)
                           }

                        
                       })}
    
                  </div>


           <div className={classes.biriyani}>
                    <p className={classes.category_name}>Chicken Recipe's </p>
                       {fooditemarr.map(fooditem=>{
                           if(fooditem.category==="Chicken Reciepe")
                           {
                            return ( 
                              <Card fooditem={fooditem} addtocart={addtocart}/>)
                           }

                        
                       })}
    
                  </div>

            </div>

  </>
  )
}

export default Snacks