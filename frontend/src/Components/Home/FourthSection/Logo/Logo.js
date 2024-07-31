import classes from './Logo.module.css';
const Logo=(props)=>{
    return (
    <div className={classes.logo}>
        <img src={props.src} alt=""/>
    </div>
    );
}

export default Logo;