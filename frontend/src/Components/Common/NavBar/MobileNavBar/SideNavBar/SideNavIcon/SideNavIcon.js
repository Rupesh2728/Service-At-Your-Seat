import classes from './SideNavIcon.module.css';
const SideNavIcon=(props)=>{
    const cname=props.flag==="1"?classes.navtext:classes.hiddennavtext;

    return (<a href={props.href} className={cname}>{props.children}</a>);
}

export default SideNavIcon;