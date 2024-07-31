import Section from '../Section/Section';


const ThirdSection=({landingpage})=>{
  const CauroselImgObjs=[
    {
        id:"1",
        imglink:"https://miro.medium.com/max/1400/1*Ic13gSTEtkiIth4_MjJR8Q.png",
        href:"#",
        interval:1000,
    },
    {
        id:"2",
        imglink:"https://in.bmscdn.com/webin/static/group-halprice2.jpg",
        href:"#",
        interval:500,
    },
    {
        id:"3",
        imglink:"https://b.zmtcdn.com/data/menus/180/19335180/9d7b8db90d56eeaa98a464c4c5a6fd7f.jpg",
        href:"#",
        interval:400,
    }
  ]

  const sectioncontent={
    title:"If you are what you eat, then You only want to eat the good stuff ?",
    subtitle:"Don't Miss Your Movie Watch Time,Order your snack from your Seat",
    btnname:"Order Your Snacks",
    btnhref:"/User/SnacksPage",
  }


  const contentresponsiveobj={
    lg:{span: 6, order: 2},
    md:{span: 12, order: 2},
    sm:{span: 12, order: 2},
    xs:{span: 12, order: 2}
  }
  
  const carouselresponsiveobj={
    lg:{span: 6, order: 1},
    md:{span: 12, order: 1},
    sm:{span: 12, order: 1},
    xs:{span: 12, order: 1}
  }
  
  const responsiveobj={
    content:contentresponsiveobj,
    carousel:carouselresponsiveobj,
  }
  
  return (       
    <Section responsiveobj={responsiveobj} landingpage={landingpage} 
    imgobjarr={CauroselImgObjs} 
    content={sectioncontent}
    />   
);
}

export default ThirdSection;