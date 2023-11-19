import React, { useState, useEffect, useMemo } from 'react';


const IdleCarousel = () => {
  const idleItems = useMemo(()=> [
    { title: "Vision", content: "An internationally recognized university that provides relevant and innovative education and resesarch for lifelong learning and sustainable development.", timeToNext: 10000, isVid: false, textSizeClass:"text-lg lg:text-3xl xl:text-4xl text-black" },
    { title: "Mission", content: "Palawan State University is committed to upgrade people's quality of life by providing education opportunities through excellent instruction, research and innovation, extension, production services, and transnational collabortaions", timeToNext: 10000, isVid: false, textSizeClass:"text-lg lg:text-3xl xl:text-4xl text-black" },
    { title: "Core Values", content: "<b>E</b>xcellence in service,<br><b>Q</b>uality assurance,<br><b>U</b>nity in diversity,<br><b>A</b>dvocacy for sustainable development,<br><b>L</b>eadership by example,<br><b>I</b>nnovation,<br><b>T</b>ransparency and<br><b>Y</b>outh empowerment<br><b classname='text-4xl'>(EQUALITY)</b>", timeToNext: 10000, isVid: false, textSizeClass:"text-lg lg:text-3xl xl:text-4xl text-black" },
    { title: "Quality Policy", content: "We Provide equal opportunities for relevant, innovative, and internationally recognized higher education programs and advanced studies for lifelong learning and sustainable development. <br><br>We Strongly commit to deliver excellence in instruction, research, extension, and transnational programs in order to meet the increasing levels of stakeholder demand as well as statutory and regulatory requirements.<br><br> The University shall continually monitor, review and upgrade its quality management system to ensure compliance with national and international standards and requirements.", timeToNext: 15000, isVid: false, textSizeClass:"text-lg lg:text-xl xl:text-2xl text-black" },
    { title: "", content: "videos/intro.mp4", timeToNext: 190000, isVid: true, textSizeClass:"text-lg lg:text-xl xl:text-2xl text-black" },
  ], []);

  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeOut(true); // Trigger fade-out effect

      setTimeout(() => {
        // Move to the next item in the carousel after the fade-out
        setCurrentItemIndex((prevIndex) => (prevIndex + 1) % idleItems.length);
        setFadeOut(false); // Reset fade-out to trigger fade-in for the next item
      }, 1000); // Adjust the timing to match the fade-out transition duration
    }, idleItems[currentItemIndex].timeToNext);

    return () => clearInterval(interval);
  }, [currentItemIndex, idleItems]);

  return (
    <div className={`idle-carousel-container mt-20 ${idleItems[currentItemIndex].isVid ? 'w-[90%] p-4' : 'w-3/4 p-2'}   mx-auto`}>
      {
        idleItems[currentItemIndex].isVid ? (
          <div className={`idle-carousel-item ${fadeOut ? 'fade-out' : 'fade-in'}`}>
            <video autoPlay muted controls className='z-50 shadow-xl'>
              <source src={process.env.PUBLIC_URL + idleItems[currentItemIndex].content} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        ) : (
          <div className={`idle-carousel-item ${fadeOut ? 'fade-out' : 'fade-in'}`}>
        <h2 className='font-bold text-black text-lg  lg:text-6xl xl:text-6xl uppercase mb-4'>{idleItems[currentItemIndex].title}</h2>
        <p className={`${idleItems[currentItemIndex].textSizeClass}`} dangerouslySetInnerHTML={{ __html: idleItems[currentItemIndex].content }}></p>
      </div>
        )
      }
      
    </div>
  );
};

export default IdleCarousel;
