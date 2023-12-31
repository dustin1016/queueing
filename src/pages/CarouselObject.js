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


const CarouselObject = ({deptName, facultyList, carouselSPeed}) => {

    // const {setNextDept} = nextDept;

    useEffect(()=>{
        
    },[facultyList]);

    const ColoredText = ({stat}) => {
      var color = 'text-gray-700' //default is out

      switch (stat) {
        case "in":
          color = 'text-green-700'
          break;
          case "on leave":
        
            color = 'text-rose-600'
            break;
            case "on travel":
              color = 'text-fuchsia-600'
              break;
      
        default:
          break;
      }

      return (
        <p className={`text-lg mxl:text-2xl font-semibold  ${color} capitalize`}>{stat}</p>
      )
    }

    const CarouselItem=()=> {



        return(
            <Carousel
            swipeable={false}
            draggable={false}
            showDots={false}
            responsive={responsive}
            ssr={true} // means to render carousel on server-side.
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={carouselSPeed}
            keyBoardControl={true}
            customTransition="transform 300ms ease-in-out"
            transitionDuration={1000}
            containerClass="carousel-container"
            
            removeArrowOnDeviceType={["desktop","tablet", "mobile"]}
            deviceType={"desktop"}
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
            
          >
            {facultyList.map((item, index)=>{

              const imgpath = item.pic_name !== null ? `http://10.125.1.10/img/${encodeURIComponent(item.pic_name)}` : 'images/blank.webp';
          
                return (
                  <div className="w-full" key={item.faculty_idx}>
                    <div  className="flex flex-row justify-start items-center">
                      
                      <div className={`w-56 h-56 md:h-20 md:w-20 lg:h-28 lg:w-28 xl:h-28 xl:w-28 mxl:h-56 mxl:w-56 bg-cover bg-top rounded-full`} style={{ backgroundImage: `url(${imgpath})` }} >
                          {/* <img src={imgpath} className="h-full w-full rounded-full object-cover object-top" /> */}
                      </div>
                      <div className="flex flex-col ml-6">
                        <p className="text-xl font-semibold">{item.name}</p>
                        <ColoredText stat={item.status} />
                      </div>

                    </div>
                  </div>
                );
            })}
      
          </Carousel>
        )
    }

    return (
      <div className="my-4">
        <h2 className="text-xl text-black font-semibold text-center mb-3">{deptName}</h2>
        {/* <button className="text-2xl p-3 border border-black" onClick={nextDept}>next dept</button> */}
       <CarouselItem />
        

      </div>
    )
}


export default CarouselObject;