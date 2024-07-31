import React, { useEffect, useState } from 'react';
import classes from './SeatArrangement.module.css'
import 'bootstrap/dist/css/bootstrap.css';
import Modal from 'react-bootstrap/Modal';


import Arrangement from './Arrangement/Arrangement';


const SeatArrangement = ({ show, handleClose1, handleClose2, seatMatrix,addScreenHandler }) => {
   


  const handleCloseHandler = () => {
     
    addScreenHandler({...seatMatrix.data,seatarr:seatarr});
    handleClose1();
    handleClose2();
  }


  const [pc, setpc] = useState(true);
  const [dc, setdc] = useState(true);
  const [es, setes] = useState(true);


  const handlepc = () => {
    setdc(!dc);
    setes(!es);
  };

  const handledc = () => {
    setpc(!pc);
    setes(!es);
  };

  const handlees = () => {
    setdc(!dc);
    setpc(!pc);
  };


  // 0-empty space
  // 1- Disabled
  // 2- Normal
  // 3- Premium-
  // 4- Selected
  // 5 -sold (default) 
  useEffect(() => {
    let x = [];
    let n = (+seatMatrix.row);
    let m = (+seatMatrix.col);
    // console.log(n + m);
    for (let i = 0; i < n; i++) {
      let y = [];
      for (let j = 0; j < m; j++) {
        y.push(2);
      }
      x.push(y);
    }
    setseatarr(x);

  }, [seatMatrix])

  const [seatarr, setseatarr] = useState([])

  // console.log(seatarr);



  return (
    <div>
      <Modal show={show} onHide={handleClose1} size='lg'>
        <Modal.Header className='bg-[#212f1f] text-[gold]'>
          <Modal.Title>SeatArrangement</Modal.Title>
        </Modal.Header>
        <Modal.Body className='bg-white'>
          <div className='flex justify-evenly font-semibold'>
            <div>
              {pc &&
                <>
                  <input onClick={handlepc} type="checkbox" name="premiumclass" value="Premium Class" /><span className='ml-[0.4rem]'>Premium Class</span>
                </>}

              {!pc &&
                <>
                  <input onClick={handlepc} type="checkbox" name="premiumclass" value="Premium Class" disabled /><span className='ml-[0.4rem]'>Premium Class</span>
                </>}


            </div>

            <div>
              {dc &&
                <>
                  <input onClick={handledc} type="checkbox" name="disabledclass" value="Disabled Class" /><span className='ml-[0.4rem]'>Disabled Class</span>
                </>}

              {!dc &&
                <>
                  <input onClick={handledc} type="checkbox" name="disabledclass" value="Disabled Class" disabled /><span className='ml-[0.4rem]'>Disabled Class</span>
                </>}

            </div>

            <div>

              {es &&
                <>
                  <input onClick={handlees} type="checkbox" name="emptyspace" value="Empty Space" /><span className='ml-[0.4rem]'>Empty Space</span>
                </>}

              {!es &&
                <>
                  <input onClick={handlees} type="checkbox" name="emptyspace" value="Empty Space" disabled /><span className='ml-[0.4rem]'>Empty Space</span>
                </>}
            </div>
          </div>

          <div>
            <Arrangement seatarr={seatarr} pc={pc} dc={dc} es={es} setseatarr={setseatarr} />
          </div>


          <div className={classes.screenview}>
            <div className='bg-black'>
              <hr />
            </div>
            <p className="flex justify-center font-semibold">------All Eyes This Way------</p>
          </div>



        </Modal.Body>
        <Modal.Footer className='flex justify-center'>
          <button onClick={handleCloseHandler} type="button" className='bg-[green] w-[7rem] h-[2.5rem] mr-[2rem] mt-[1rem] rounded-md text-[white] hover:bg-[indianred]'>
            Submit
          </button>
        </Modal.Footer>
      </Modal>


    </div>
  )
}

export default SeatArrangement