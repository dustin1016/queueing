import React, {useState, useEffect} from "react";
import Modal from 'react-modal';
import { useLocation } from 'react-router-dom';

export default function Window() {

  


   
      //variable to hold current number being served by window
      const [myNum, setMyNum]= useState(null);
      const [index, setIndex] = useState(null);
      const [myWindow, setMyWindow] = useState(null);
      const [errorMsg, setErrorMsg] = useState(null);
      const [numServed, setNumServed] = useState(false);
       // Use the useLocation hook to get the current location
       const location = useLocation();
  // Parse the query parameters from the location
  const queryParams = new URLSearchParams(location.search);
                  
  // Get the value of the 'window' query parameter
  const windowValue = queryParams.get('window');
        useEffect(() => {
       
          if (myWindow === null){
         

            
            setMyWindow(windowValue);
            
          }

          if (myNum === null){
            fetchNum(1);
          }

       
      
        }, []);


        async function fetchNum(cmd) {
          setErrorMsg(null);
      
          try {
            const response = await fetch('http://localhost/qsrv/data.php/fetchNum',
             {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({window: windowValue, cmd: cmd})
            })

            const jsonData = await response.json();
            if(jsonData.result){
              console.log(jsonData.data)
              let d = jsonData.data;
              setMyNum(d.num);
              setIndex(d.id);
            } else {
              setErrorMsg(jsonData.message);
            }
      
         
          
           
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        }

        async function serveNext() {
          //remove error messages
          setErrorMsg(null);
          //set the current number's status as served in UI
          setNumServed(true);
          try {
            const response = await fetch('http://localhost/qsrv/data.php/serveNext',
             {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({window: windowValue, index: index})
            })

            const jsonData = await response.json();
            if(jsonData.result){
              console.log(jsonData.data)
              let d = jsonData.data;
              //set the current number's status as false in UI
                setNumServed(false);
              setMyNum(d.num);
              setIndex(d.id);
            } else {
              setErrorMsg(jsonData.message);
            }
      
         
          
           
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        }

        function FetchButton(){
          return(
            <button onClick={()=>fetchNum(2)} className="border border-gray-700 bg-gray-500 hover:bg-gray-400 text-white rounded-md p-3 text-md">
            Fetch a Number
          </button>
          )
        }

        function ServeButton(){
          return(
            <button onClick={serveNext} className="border border-blue-800 bg-blue-600 hover:bg-blue-400 text-white rounded-md p-3 text-md">
            Serve Next
          </button>
          )
        }


     
        //UI
        return(
          <>
            <div className="container w-64 mx-auto border mt-5 rounded-md border-yellow-500 p-3 text-center">
            {myNum !== null ? 
           <>
           <p className="text-2xl text-black mb-3">
              Currently Serving:
           </p>
               <p className={`text-4xl font-bold ${numServed ? 'text-green-600' : 'text-black'} mb-3`}>
                {myNum}
              </p>
           </>
                : <p className="text-md text-black mb-3">
                No number being served
              </p>}
           
              {errorMsg !== null && 
                <p className="text-md text-gray-600 mb-3">
                {errorMsg}
              </p>
              }
            {myNum === null ? <FetchButton /> : <ServeButton />}
            </div>
          </>
        );


}