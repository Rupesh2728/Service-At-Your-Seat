import classes from './FooterTop.module.css';
const FooterTop=(props)=>{
    return ( <div className={classes.footertop}>{props.children}</div>);
}

export default FooterTop;