import classes from './Container.module.css';
const Container=(props)=>{
    // console.log(props.id)
    // console.log(props.children)
    return (<div className={classes.container}>
      {props.children}
    </div>);
}

export default Container;