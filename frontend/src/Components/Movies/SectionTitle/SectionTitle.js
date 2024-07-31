import classes from './SectionTitle.module.css';
const SectionTitle=(props)=>{
   return ( 
    <div className={classes.header}>
    {props.title}
    </div>
   );
}

export default SectionTitle;