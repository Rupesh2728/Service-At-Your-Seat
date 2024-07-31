import classes from './Carousel.module.css';
import 'bootstrap/dist/css/bootstrap.css';
import Carousel from 'react-bootstrap/Carousel';

const CustomCarousel=(props)=>{
    return ( 
    <Carousel controls={props.controls} indicators={props.indicators}>
       
        { props.imgobjarr.map(img=>{
            return ( 
            <Carousel.Item interval={img.interval}>
                <a href={img.href}> 
                  <img src={img.imglink} className={classes.carouselimg} alt="..."/>
                </a>
            </Carousel.Item>)
        })}

    </Carousel>)
}

export default CustomCarousel;