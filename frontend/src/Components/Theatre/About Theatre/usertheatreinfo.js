import React, { useEffect, useState } from "react";
import TNavbar from "../TCommon/navbar.js";
import UtiInfoCss from './usertheatreinfo.module.css';
import { useNavigate } from "react-router-dom";
import URL from "../../../URL.js";



const Usertheatreinfo = () => {
    const [edit,setedit]=useState(false);

    const [tname, setTname] = useState("");
    const [timg1, setTimg1] = useState("");
    const [timg2, setTimg2] = useState("");
    const [timg3, setTimg3] = useState("");
    const [screentype,setscreentype] = useState("");
    const [snack,setsnack]=useState("");
    const [sound,setsound]=useState("");
    const [Ttype,setTtype]=useState("");
    const [about,setabout]=useState("");
    const [treff,settreff]= useState("");

    const navigate=useNavigate();


    const getDetails=async ()=>{
        const response1=await fetch(URL+`/usertheatreinfo/getreffnum`,{
           method:"GET",
            headers:{
                "Content-Type":"application/json"
            },
            credentials:'include'
         });

        const res1=await response1.json();  
        settreff(res1.treffnum);
        const response2=await fetch(URL+`/usertheatreinfo/getinfo`,{
            method:"POST",
            headers:{
              "Content-Type":"application/json"
            },
            credentials:'include',
            body:JSON.stringify({treffnum:res1.treffnum}),
            
          });
      
         const res2=await response2.json();
         if(res2.k===1)
         {
            setTname("");
            setTimg1("");
            setTimg2("");
            setTimg3("");
            setscreentype("");
            setsnack("");
            setsound("");
            setTtype("");
            setabout("");
         }

         else{

         setTname(res2.tinfo.tName);
         setTimg1(res2.tinfo.imgurl1);
         setTimg2(res2.tinfo.imgurl2);
         setTimg3(res2.tinfo.imgurl3);
         setscreentype(res2.tinfo.screentype);
         setsnack(res2.tinfo.snacks);
         setsound(res2.tinfo.sound);
         setTtype(res2.tinfo.Type);
         setabout(res2.tinfo.about);

         }
         
         
         
         
        }


        const OnclickHandler=async (e)=>{
            e.preventDefault();
            setedit(!edit);
            const response3=await fetch(URL+`/usertheatreinfo`,{
                 method:"POST",
                 headers:{
                   "Content-Type":"application/json"
                 },
                 credentials:'include',
                 body:JSON.stringify({
                     theatreimgurl1:timg1,
                     theatreimgurl2:timg2,
                     theatreimgurl3:timg3,
                     screentype:screentype,
                     snacks:snack,
                     Ttype:Ttype,
                     sound:sound,
                     about:about,
                     treff :treff,
                 }),
                 
               });
     
               const res3=await response3.json();
               if(res3.k===1)
                {
                   navigate("/Theatre/Usertheatreinfo");
                }
         }


      
      
        useEffect(()=>{
           getDetails();
        },[]);

    return (
        <div>
            <TNavbar />
            <div className={UtiInfoCss.maindiv}>
                <h1 className="text-[2.4rem]" style={{ textAlign: 'center', marginTop: '30px', color: 'gold' }}>About Theatre Form</h1>
                <form className={UtiInfoCss.formR}>
                    <div className={UtiInfoCss.div1}>
                        <div className={UtiInfoCss.subdiv1}>
                            <label className={UtiInfoCss.labelR} htmlFor="theatreName">Theatre Name:</label>
                           {edit &&  <input
                                type="text"
                                className={UtiInfoCss.inputr}
                                name="theatreName"
                                value={tname} 
                                onChange={(e)=>setTname(e.target.value)}
                            />}

                            {
                                !edit &&  
                                <input
                                type="text"
                                className={UtiInfoCss.inputr}
                                name="theatreName"
                                value={tname} 
                                readOnly
                            />
                            }
                            <br /><br />
                        </div>

                        <div className={UtiInfoCss.subdiv2}>
                            <label className={UtiInfoCss.labelR} htmlFor="imgurl">Theatre Image URL1:</label>
                            {edit && 
                            <input
                                type="text"
                                className={UtiInfoCss.inputr}
                                name="theatreimgurl1"
                                onChange={(e)=>setTimg1(e.target.value)}
                                value={timg1}
                            
                            />}

                            {
                                !edit && 
                                <input
                                type="text"
                                className={UtiInfoCss.inputr}
                                name="theatreimgurl1"
                                value={timg1}
                                readOnly
                            />
                            }
                            <br /><br />



                        </div>
                    </div>

                    <div className={UtiInfoCss.div2}>
                        <div className={UtiInfoCss.subdiv1}>
                            <label className={UtiInfoCss.labelR} htmlFor="imgurl">Theatre Image URL2:</label>
                           {edit &&  <input
                                type="text"
                                className={UtiInfoCss.inputr}
                                name="theatreimgurl2"
                                onChange={(e)=>setTimg2(e.target.value)}
                                value={timg2}
                                
                            />}

                            {
                                !edit &&  <input
                                type="text"
                                className={UtiInfoCss.inputr}
                                name="theatreimgurl2"
                                value={timg2}
                                readOnly
                            />
                            }
                            <br /><br />
                        </div>

                        <div className={UtiInfoCss.subdiv2}>
                            <label className={UtiInfoCss.labelR} htmlFor="imgurl">Theatre Image URL3:</label>
                            {edit && <input
                                type="text"
                                className={UtiInfoCss.inputr}
                                name="theatreimgurl3"
                                onChange={(e)=>setTimg3(e.target.value)}
                                value={timg3}

                                
                            />}

                            {
                                !edit && <input
                                type="text"
                                className={UtiInfoCss.inputr}
                                name="theatreimgurl3"
                                value={timg3}
                                readOnly
                            />
                            }
                            <br /><br />
                        </div>
                    </div>

                    <div className={UtiInfoCss.div3}>
                        <div className={UtiInfoCss.subdiv1}>
                            <label className={UtiInfoCss.labelR} htmlFor="screentype">Screen Type:</label>
                           {
                            edit &&  <input
                            type="text"
                            className={UtiInfoCss.inputr}
                            name="screentype"
                            style={{ width: '10rem' }}
                            onChange={(e)=>setscreentype(e.target.value)}
                            value = {screentype}
                              />
                           }

                           {
                             !edit && 
                              <input
                             type="text"
                             className={UtiInfoCss.inputr}
                             name="screentype"
                             style={{ width: '10rem' }}
                             value = {screentype}
                             readOnly
                         />
                           }
                            <br /><br />
                        </div>

                        <div className={UtiInfoCss.subdiv2}>
                            <label className={UtiInfoCss.labelR} htmlFor="snacksinfo">Snacks:</label>
                            {edit && <select
                                name="snacks"
                                className="snacks" value={snack}  onChange={(e)=>setsnack(e.target.value)}>
                                <option value="Available">Available</option>
                                <option value="Not Available">Not Available</option>
                            </select>}

                            {
                                !edit && <select
                                name="snacks"
                                className="snacks"
                                value={snack} 
                                disabled>
                                <option value="Available">Available</option>
                                <option value="Not Available">Not Available</option>
                            </select>
                            }
                        </div>

                        <div className={UtiInfoCss.subdiv3}>
                            <label className={UtiInfoCss.labelR} htmlFor="Ttype">Theatre Type:</label>
                            {edit && 
                            <select
                                name="Ttype"
                                className="Ttype"
                                 onChange={(e)=>setTtype(e.target.value)}
                                 value={Ttype}
                            >
                                <option value="AC">AC</option>
                                <option value="Non-AC">Non-AC</option>
                            </select>}

                            {!edit && 
                            <select
                                name="Ttype"
                                className="Ttype"
                                value={Ttype}
                                disabled
                            >
                                <option value="AC">AC</option>
                                <option value="Non-AC">Non-AC</option>
                            </select>}
                        </div>

                        <div className={UtiInfoCss.subdiv4}>
                            <label className={UtiInfoCss.labelR} htmlFor="sound">Sound:</label>
                           {
                             edit &&  <select onChange={(e)=>setsound(e.target.value)} value={sound}
                             name="sound"
                             className="sound" >
                             <option value="Dolby Digital 5.1/AC-3">Dolby Digital 5.1/AC-3</option>
                             <option value="DTS">DTS</option>
                             <option value="DSX">DSX</option>
                             <option value="DSX-2">DSX-2</option>
                             <option value="Dolby Atmos">Dolby Atmos</option>
                         </select>
                           }

                            {
                             !edit &&  <select
                             name="sound"
                             value={sound}
                             className="sound"
                             disabled >
                             <option value="Dolby Digital 5.1/AC-3">Dolby Digital 5.1/AC-3</option>
                             <option value="DTS">DTS</option>
                             <option value="DSX">DSX</option>
                             <option value="DSX-2">DSX-2</option>
                             <option value="Dolby Atmos">Dolby Atmos</option>
                         </select>
                           }

                           
                        </div>
                    </div>


                    <div className={UtiInfoCss.div5}>
                        <label className={UtiInfoCss.labelR} htmlFor="about">About:</label>
                      {edit &&   <textarea value={about}
                            className="about"
                            name="about"
                            rows="5"
                            cols="100"
                            onChange={(e)=>setabout(e.target.value)}
                        ></textarea>}

                    {!edit &&   <textarea
                            className="about" value={about}
                            name="about"
                            rows="5"
                            cols="100"
                            readOnly
                        ></textarea>}

                        <br /><br />
                    </div>

                    <div className={UtiInfoCss.div6}>
                        {
                            edit && 
                            <button type="submit" className="submitbtn" onClick={OnclickHandler}>
                                Submit
                            </button>
                        }

                        {
                            !edit && 
                            <button type="submit" className="submitbtn" style={{background:'red'}} disabled>
                                Submit
                            </button>
                        }
                        <button
                            type="button"
                            className="editbtn"
                            style={{
                                marginLeft: '1rem',
                                width: '5rem',
                                backgroundColor: 'green',
                                color: 'white',
                                border: '0',
                                borderRadius: '4px',
                            }}
                            onClick={()=>setedit(true)}
                        >
                            Edit
                        </button>
                    </div>
                </form>

            </div>


        </div>
    )
}

export default Usertheatreinfo
