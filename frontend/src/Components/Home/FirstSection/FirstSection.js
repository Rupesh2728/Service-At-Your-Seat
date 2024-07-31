import Section from '../Section/Section';

const FirstSection=({landingpage})=>{  
  const CauroselImgObjs=[
  {
      id:"1",
      imglink:"https://www.deccanrummy.com/rummy-promotions/images/movie-mania/movie-mania.jpg?rand=1",
      href:"#",
      interval:1000,
  },
  {
      id:"2",
      imglink:"https://cdn.grabon.in/gograbon/images/web-images/uploads/1618571888087/movie-ticket-offers.jpg",
      href:"#",
      interval:500,
  },
  {
      id:"3",
      imglink:"https://assetscdn1.paytm.com/images/catalog/view_item/942171/1646452176861.jpg",
      href:"#",
      interval:400,
  }
]


const contentresponsiveobj={
  lg:{span: 6, order: 1},
  md:{span: 12, order: 2},
  sm:{span: 12, order: 2},
  xs:{span: 12, order: 2}
}

const carouselresponsiveobj={
  lg:{span: 6, order: 2},
  md:{span: 12, order: 1},
  sm:{span: 12, order: 1},
  xs:{span: 12, order: 1}
}

const responsiveobj={
  content:contentresponsiveobj,
  carousel:carouselresponsiveobj,
}

const sectioncontent={
  title:"Don't you love a cushioned seat in a corner, by the fireside, with your slippers on your feet?",
  subtitle:"Reserve your Seats to Experience the Quality of the movie that make you stop & stare",
  btnname:"Book now",
  btnhref:"/User/MoviesPage",
}
  
  return (
   
       <Section responsiveobj={responsiveobj} landingpage={landingpage}
    imgobjarr={CauroselImgObjs} 
    content={sectioncontent}
    />

   
  );
}

export default FirstSection;