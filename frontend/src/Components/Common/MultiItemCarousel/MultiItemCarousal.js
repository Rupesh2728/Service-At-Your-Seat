import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
// import TheatreCard from "../../Home/SecondSection/TheatreCard/TheatreCard";
// import MovieCard from "../../Movies/MoviesSection/MovieCard/MovieCard";


const MultiItemCarousel=(props)=>{
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 2,
    initialSlide: 0,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
         
        }
      },
      
      {
        breakpoint: 1144,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
        }
      },

      {
        breakpoint: 991,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 450,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      }
    ]
  };
   
  
  return (
<Slider {...settings}>
      {/* <TheatreCard/>
      <TheatreCard/>
      <TheatreCard/>
      <TheatreCard/>
      <TheatreCard/>
      <TheatreCard/>
      <TheatreCard/>
      <TheatreCard/> */}

      {props.itemarr.map(item=>{
        return item;
      })}

      {/* <MovieCard/>
      <MovieCard/>
      <MovieCard/>
      <MovieCard/>
      <MovieCard/>
      <MovieCard/>
      <MovieCard/>
      <MovieCard/> */}

     </Slider>
  

    )
}

export default MultiItemCarousel;