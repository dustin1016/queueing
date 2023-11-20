import React, {useState, useEffect} from "react";
import Modal from 'react-modal';
import { useLocation } from 'react-router-dom';

export default function Client()
{

  const [modalOpen, setModalOpen] = useState(false);
  const [queueData, setQueueData] = useState([]);
  const [numToDispense, setNumToDispense] = useState(null);
   // Use the useLocation hook to get the current location
   const location = useLocation();

   // Parse the query parameters from the location
   const queryParams = new URLSearchParams(location.search);
 
   // Get the value of the 'window' query parameter
   const windowValue = queryParams.get('window');
  useEffect(()=>{
    if (queueData.length === 0){
      fetchQueue();
    }
    console.log(windowValue)
  }, [queueData]);
  function  openMod(){
    setModalOpen(true);
  }

  function closeMod() {
    setNumToDispense(null);
    setModalOpen(false);
  }

  function afterCloseModal() {
    setNumToDispense(null);
  }
  const fetchQueue = async () => {
    try {
      const response = await fetch('http://10.125.1.10/qsrv/data.php/getQueue');
      const jsonData = await response.json();
      // setData(jsonData);
     
      let data = jsonData.result;
      if(data.length > 0) {
        setQueueData(data);
      
        // setHasData(true);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  

  async function serveNumber(index) {
    try {
      const response = await fetch('http://10.125.1.10/qsrv/data.php/serve',
       {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({index: index,window: windowValue})
      }).finally(()=>fetchQueue())

   
    
     
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  async function insertData(purpose)  {
  
    try {
      const response = await fetch('http://10.125.1.10/qsrv/data.php/insert',
       {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({purpose: purpose})
      }).finally(()=>fetchQueue())

      const jsonData = await response.json();
      setNumToDispense(jsonData.qNum);

    
     
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  function ServeView() {
    const serving = queueData.filter(function(item){
      return item.q_status === "serving";
    })

    return(
      <>
        <div>
          
        </div>
      </>
    );
  }

    function QueueView() {
        const viewData = queueData.filter(function(item){
          return item.q_status === "queued";
        })
      return (
        <div>

       
          <div className="p-2 grid grid-cols-6 gap-4 mt-4">
            {viewData.map((item, index) => {
              return(
                <div key={index} className="border-2 border-gray-800 rounded-lg p-3 text-center">
                  
                  <p className="text-3xl">{item.q_num}</p>
                  <p>{item.q_purpose}</p>
                  <button onClick={()=>{serveNumber(item.q_index)}} className="border border-gray-800 bg-green-700 text-black text-md py-2 px-4 rounded-md mt-3">Serve</button>
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    function NewQueueModal() {
      return(
        <Modal
        isOpen={modalOpen}
        
        onRequestClose={afterCloseModal}
        ariaHideApp={false}
        contentLabel="New Request"
        className=""

      >
      

    
      <div className="flex flex-row justify-between border-b-2 pb-2 border-gray-700">
        <h1 className="text-2xl">New Request</h1>
        <button className="text-2xl px-2 py-1 bg-slate-700 text-white cursor-pointer rounded-md" onClick={closeMod}>
        &times;
        </button>
      </div>

      <div className="flex flex-col md:flex-row  justify-evenly text-center p-3">
        <button onClick={()=>{insertData("Enrollment Concerns")}} className="bg-blue-700/70 text-white text-md md:text-2xl py-2 px-4 rounded-md mb-4">Enrollment<br />Concerns</button>
        <button onClick={()=>{insertData("Document Request")}} className="bg-blue-700/70 text-white text-md md:text-2xl py-2 px-4 rounded-md mb-4">Document<br />Request</button>
        <button onClick={()=>{insertData("Other Concerns")}} className="bg-blue-700/70 text-white text-md md:text-2xl py-2 px-4 rounded-md">Other<br />Concerns</button>
      </div>

      {numToDispense !== null && (
        <div className="mt-5 ">
        <p className="text-green-700 font-bold text-center text-2xl">Request Queued with number:</p>
        <p className="text-5xl text-green-800 font-bold text-center">{numToDispense}</p>
        </div>
       
      )}
   
      </Modal>
      );
    }


    
    return (
        <div className="p-3">
          <h2 className="mb-3">Number Dispensing</h2>
          {/* <p>This is the client page.</p> */}
          <button onClick={openMod} className="px-3 py-1 border border-gray-700 rounded-md hover:bg-green-600 hover:text-white">	&#43; Add</button>
          <NewQueueModal />
          {queueData.length > 0 ? 
          <QueueView />
          : <>
            <p className="text-center text-slate-700 text-2xl">No active queue at the moment.</p>
          </> }
        </div>
      );
}