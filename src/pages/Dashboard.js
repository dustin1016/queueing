import React, {useState, useEffect} from 'react';
import FacultyTracker from './FacultyTracker';
import Clock from './Clock';
const Dashboard = () => {

  
    const [queue, setQueue] = useState([]);
    const [tempQueue, setTempQueue] = useState([]);
    const [hasData, setHasData] = useState(false);
    const [facultyFlag, setFacultyFlag] = useState(false);
    
    const fetchQueue = async () => {
      try {
        const response = await fetch('http://localhost/qsrv/data.php/getActiveQ');
        const jsonData = await response.json();
        // setData(jsonData);
       
        let data = jsonData.queue;
        if(data.length > 0) {
          setQueue(data);
          setTempQueue(data);
          setHasData(true);
          
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    useEffect(() => {
      fetchQueue();
      setTimeout(() => {
        setFacultyFlag(true);
    }, 2000);
      const intervalId = setInterval(fetchQueue, 5000);

      // Clean up the interval when the component unmounts
      return () => clearInterval(intervalId);

   
      // const eventSource = new EventSource('http://localhost/qsrv/index.php');
  
      // eventSource.onmessage = (event) => {
      //   const data = JSON.parse(event.data);
      //   setMessages((prevMessages) => [...prevMessages, data.message]);
      //   console.log(data.message);
        
      // };
  
      // return () => {
      //   eventSource.close();
      // };
      // if (!hasData) {
      //   fetchQueue();
      // }
    }, []);







    function FlexBox(window){
      //box UI to show current numbers being served
      const n = queue.find(x=>x.window === window);
        return (
          <div className='p-3 border rounded-t-md h-60 border-gray-600 text-center flex flex-col'>
              <p className='text-4xl font-bold'>Window {window}</p>
              <hr className='border-y border-gray-900 my-4' />
              <p className='text-8xl font-bold'>
                {n!==undefined && n.q_num}
                
              </p>
          </div>
        )
    }

    function DashView() {
      return (
        <>
          <div className='w-[100%] relative flex flex-row'>
            <div className='flex-initial w-[30%]'>
              <FacultyTracker />
              
            
            </div>
              <div className='flex-1 w-[70%] p-3 fixed top-12 right-0'>
              <div className='flex flex-row mb-6 items-center justify-center'>
                <img src='images/cba-logo.png' height={100} width={100} />
                <h2 className='text-center text-4xl font-bold ml-6'>College of Business and Accountancy</h2>
              </div>
                <p className='text-6xl font-bold text-center text-gray-900 mb-6'>NOW SERVING:</p>
                <div className='flex flex-row justify-evenly'>
                  {FlexBox(1)}
                  {FlexBox(2)}
                  {FlexBox(3)}
                </div>
                <Clock />
              </div>
            
          </div>
        </>
      );
    }


    //main UI
  return (
    <div className=''>
     
    
     <DashView />
   
    </div>
  );
};

export default Dashboard;