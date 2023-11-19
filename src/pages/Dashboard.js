import React, {useState, useEffect} from 'react';
import FacultyTracker from './FacultyTracker';
import Clock from './Clock';
import Queue from './Queue';
import BldgImage from '../images/bldg.png';
const Dashboard = () => {

  
    const [queue, setQueue] = useState([]);
    const [tempQueue, setTempQueue] = useState([]);
    const [hasData, setHasData] = useState(false);
    const [facultyFlag, setFacultyFlag] = useState(false);
    
    // const fetchQueue = async () => {
    //   try {
    
    //     const response = await fetch('http://localhost/qsrv/data.php/getActiveQ');
    //     const jsonData = await response.json();
    //     // setData(jsonData);
       
    //     let data = jsonData.queue;
    //     if(data.length > 0) {
    //       setQueue(data);
    //       setTempQueue(data);
    //       setHasData(true);
          
    //     }
    //   } catch (error) {
    //     console.error('Error fetching data:', error);
    //   }
    // };
    // useEffect(() => {
    //   fetchQueue();
    // //   setTimeout(() => {
    // //     setFacultyFlag(true);
    // // }, 2000);
    //   const intervalId = setInterval(fetchQueue, 5000);

    //   // Clean up the interval when the component unmounts
    //   return () => clearInterval(intervalId);

   
     
    // }, []);







    function FlexBox(window){
      //box UI to show current numbers being served
      const n = queue.find(x=>x.window === window);
        return (
          <div className='p-3 border rounded-t-md lg:w-60 lg:h-60 xl:h-72 xl:w-72 border-gray-600 text-center flex flex-col'>
              <p className='text-4xl font-bold'>Window {window}</p>
              <hr className='border-y border-gray-900 my-4' />
              <p className='text-8xl font-bold'>
                {n!==undefined && n.q_num}
                
              </p>
          </div>
        )
    }

    


    //main UI
  return (
    <div className='relative'>
          <div className='w-[100%] relative flex flex-row'>
            <div className='flex-initial w-[30%]'>
              <FacultyTracker />
              
            
            </div>
            <div>
            <div className='flex flex-row mb-6 p-3 items-center justify-center ' >
                <img src='images/cba-logo.png' height={150} width={150} />
                <h2 className='text-center lg:text-2xl xl:text-4xl font-bold ml-3'>College of Business and Accountancy</h2>
              </div>

              <div className='flex-1 w-[70%] p-3 fixed lg:top-8 xl:top-12 2xl:top-28 right-0 bg-cover ' >
             
              <Queue />
              </div>
            
            </div>
          </div>
          <img src={BldgImage} className='absolute right-0 bottom-0 -z-50' />
        </div>
  );
};

export default Dashboard;