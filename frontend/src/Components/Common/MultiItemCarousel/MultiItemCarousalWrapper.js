import classes from './MultiItemCarousalWrapper.module.css';
const MultiItemCarousalWrapper=(props)=>{
 return (<div className={classes.multiitemcarousal}>{props.children}</div>);
}

export default MultiItemCarousalWrapper;