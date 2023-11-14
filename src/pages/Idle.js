import React, {useState, useEffect} from "react";
import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";

const responsive = {
    desktop: {
        breakpoint: { max: 6000, min: 1024 },
        items: 1,
        slidesToSlide: 1 // optional, default to 1.
      },
      tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 1,
        slidesToSlide: 1 // optional, default to 1.
      },
      mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
        slidesToSlide: 1 // optional, default to 1.
      }
  };


  const idleItems = [
    {title: "Vision", content:"An internationally recognized university that provides relevant and innovative education and resesarch for lifelong learning and sustainable development."},
    {title: "Mission", content:"Palawan State University is committed to upgrade people's quality of life by providing education opportunities through excellent instruction, research and innovation, extension, production services, and transnational collabortaions"},
    {title: "Core Values", content:"<b>E</b>xcellence in service,<br><b>Q</b>uality assurance,<br><b>U</b>nity in diversity,<br><b>A</b>dvocacy for sustainable development,<br><b>L</b>eadership by example,<br><b>I</b>nnovation,<br><b>T</b>ransparency and<br><b>Y</b>outh empowerment<br><b classname='text-4xl'>(EQUALITY)</b>"},
    {title: "Quality Policy", content:"We Provide equal opportunities for relevant, innovative, and internationally recognized higher education programs and advanced studies for lifelong learning and sustainable development. <br><br>We Strongly commit to deliver excellence in instruction, research, extension, and transnational programs in order to meet the increasing levels of stakeholder demand as well as statutory and regulatory requirements.<br><br> The University shall continually monitor, review and upgrade its quality management system to ensure compliance with national and international standards and requirements."},
  ];



const Idle = () => {


    // const calculateOpacity = (nextSlide) => {
    //     return Math.abs(currentSlide - nextSlide) > 1 ? 0.5 : 1;
    // }
    const handleBeforeChange = (nextSlide) => {
       
        // const opacity = calculateOpacity(newSlide);
        document.querySelectorAll('.custom-carousel-item').forEach((item)=>{
            item.style.opacity = 0;
           
        })
        // setTimeout(()=>{
        //   }, 1000)
    }


    const handleAfterChange = (afterSlide)=> {
      setTimeout(()=>{
        document.querySelectorAll('.custom-carousel-item').forEach((item)=>{
            item.style.opacity = 1;
           
        })
      }, 1000)
    }
   
        return (
          
            <div className="w-3/4 p-2 mx-auto">
        <Carousel
            swipeable={false}
            draggable={false}
            showDots={false}
            responsive={responsive}
            ssr={true} // means to render carousel on server-side.
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={4000}
            keyBoardControl={true}
            customTransition="all .2 ease-in"
            transitionDuration={2000}
            containerClass="carousel-container"
            rewind={true}
            removeArrowOnDeviceType={["desktop","tablet", "mobile"]}
            deviceType={"desktop"}
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px custom-active" 
            // beforeChange={handleBeforeChange}
            // afterChange={handleAfterChange}
            
          >
            {idleItems.map((item, index)=>{

             return (
                <div key={index} className="custom-carousel-item mt-6">
                    <h1 className="font-bold text-black text-lg  lg:text-6xl uppercase mb-4">{item.title}</h1>
                <p dangerouslySetInnerHTML={{ __html: item.content }} className="text-lg lg:text-3xl text-black text-justify">
                    
                        </p>
                    </div>
             );
            })}
      
          </Carousel>
          </div>
        );
    
}


export default Idle;