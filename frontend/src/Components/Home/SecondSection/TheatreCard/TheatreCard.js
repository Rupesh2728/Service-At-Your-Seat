import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classes from './TheatreCard.module.css';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
const TheatreCard=({Tdetail})=>{
    return (
    

<div className={classes.card}>
<div className={classes.cardbody}>
    <h2 className={classes.title}>{Tdetail.tName}</h2>
     <div className={classes.specifications}>
     <p>{Tdetail.screentype}</p>
     <p><FontAwesomeIcon icon={faCheck} style={{color: "#46d312",}} /> {Tdetail.snacks==="Available"? "Snacks":"No Snacks"}</p>
     <p className={classes.type}>{Tdetail.Ttype}</p>
     </div>
     <p className={classes.description}>{Tdetail.about}</p>
    <h5>{Tdetail.sound}</h5>
</div>
</div>
     );
}


export default TheatreCard;