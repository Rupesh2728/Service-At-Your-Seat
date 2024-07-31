import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import classes from './Snacks.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faMinusSquare,faPlusSquare,faIndianRupeeSign} from '@fortawesome/free-solid-svg-icons';
const Cart = ({show,handleClose,cartItems,ticketid,setcartItems,totalprice,totalitems,calc_total_items_n_price}) => {

    console.log(cartItems);

    const [cartitems]=useState(cartItems);
  
  const increase=(Item)=>{
    const newItem={...Item};
    const newcartItems=[];
    newItem.quantity+=1;
   for(let i=0;i<cartitems.length;i++)
   {  if(cartitems[i].SnackName === Item.SnackName)
    {
        cartitems[i]=newItem;
    }

      newcartItems.push(cartitems[i]);
   }
   setcartItems(newcartItems);

   calc_total_items_n_price(newcartItems);
 
  }

  const decrease=(Item)=>{
    if(Item.quantity>1)
    {
        const newItem={...Item};
        const newcartItems=[];
        newItem.quantity-=1;
       for(let i=0;i<cartitems.length;i++)
       {  if(cartitems[i].SnackName === Item.SnackName)
        {
            cartitems[i]=newItem;
        }
    
          newcartItems.push(cartitems[i]);
       }
       setcartItems(newcartItems);
       calc_total_items_n_price(newcartItems);
    }

  if(Item.quantity===1)
  { 
    const newcartItems=[];
   for(let i=0;i<cartitems.length;i++)
   {  if(cartitems[i].SnackName !== Item.SnackName)
      {
        newcartItems.push(cartitems[i]);
      }   
   }
   setcartItems(newcartItems);
   calc_total_items_n_price(newcartItems);

  }


  }
  
  
    return (
    <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header className='bg-[#221f1f]'>
          <Modal.Title>
          <h5 id="staticBackdropLabel">
                <p className={classes.cart_title}>Cart Items</p>
          </h5>
          </Modal.Title>
        </Modal.Header>


        <Modal.Body>
        <h3 className=' font-bold text-[1.5rem]'>Ticket Id :<span>{ticketid}</span></h3>
              <div className={classes.cart_page}>
                <table className={classes.table}>
                  <thead className={classes.thead}>
                    <tr>
                      <td className={classes.htd}>Item</td>
                      <td className={classes.htd}>Name</td> 
                      <td className={classes.htd}>Quantity</td>
                      <td className={classes.htd}>Price</td>
                    </tr>
                  </thead>

                  <tbody>

                     {cartitems.map((cartItem)=>{
                        return (
                        <tr>
                          <td className={classes.td}><img src={cartItem.imgurl}/></td>
                          <td className={classes.td}>{cartItem.SnackName}</td>
                          <td className={classes.td}>
                           <div className='flex justify-evenly'>
                             <FontAwesomeIcon icon={faMinusSquare} 
                              onClick={()=>{decrease(cartItem)}} 
                              style={{color:"red"}} className='w-[1.5rem] h-[1.3rem] mt-[0.1rem]' />
                               <span className='text-[1.3rem]'>{cartItem.quantity}</span>
                              <FontAwesomeIcon icon={faPlusSquare} 
                               onClick={()=>{increase(cartItem)}} 
                              style={{color:"red"}} className='w-[1.5rem] h-[1.3rem] mt-[0.1rem]' />
                           </div>
                          </td>
                          <td className={classes.td}>
                          <FontAwesomeIcon icon={faIndianRupeeSign} className='w-[0.7rem] mr-[0.2rem]' style={{color: "black",}}  />
                          {Number(cartItem.quantity)*Number(cartItem.price)}</td>
                        </tr>)
                     })}

                  </tbody>
                </table>
              </div>

              <hr/>
              <div className={classes.cart}>
                <div className={classes.checkout}>
                  <div className={classes.numtotalitem}>
                    <p className={classes.total_item}>Total Item :</p>
                    <p className={classes.totalitemnum}>{totalitems}</p>
                  </div>

                  <div className={classes.numtotalprice}>
                    <p className={classes.total_price}>Total Price :</p>
                    <p className={classes.totalpricenum}> 
                    <FontAwesomeIcon icon={faIndianRupeeSign} className='w-[0.7rem] mr-[0.2rem]' style={{color: "black",}}  />
                    {totalprice}</p>
                  </div>

                  <div>
                    <button className={classes.cart_btn}>Proceed To Payment</button>
                  </div>
               </div>   
              
              </div>

        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleClose} className='w-[5rem] h-[2.5rem] bg-[indianred] text-[white] border-none rounded-[0.5rem] hover:bg-[red]'>
            Close
          </button>
        </Modal.Footer>
      </Modal>
  )
}

export default Cart