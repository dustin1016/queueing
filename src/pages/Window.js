import React, {useState, useEffect} from "react";
import Modal from 'react-modal';
import { useLocation } from 'react-router-dom';

function isNumeric(input) {
  // Use the JavaScript built-in function isNaN() to check if the input is numeric
  // isNaN() returns true if the input is NaN (Not a Number), false otherwise
  return !isNaN(input);
}

export default function Window() {

  


   
      //variable to hold current number being served by window
      const [myNum, setMyNum]= useState(null);
      const [index, setIndex] = useState(null);
      const [myWindow, setMyWindow] = useState(1); //default window number
      const [errorMsg, setErrorMsg] = useState(null);
      const [numServed, setNumServed] = useState(false);
      const [showWindow, setShowWindow] = useState(true);
      const [isNumber, setIsNumber] = useState(true);
       // Use the useLocation hook to get the current location
       const location = useLocation();
  // Parse the query parameters from the location
  const queryParams = new URLSearchParams(location.search);
                  
  // Get the value of the 'window' query parameter
  const windowValue = queryParams.get('window');
        useEffect(() => {
          //fetch the number previously being served by the window
         fetchNum(1);
          if (windowValue !== null){        
            setMyWindow(windowValue);     
          }
       
      
        }, []);

        useEffect(()=>{
          fetchNum(1);
          
        }, [myWindow]);


        async function fetchNum(cmd) {
          setErrorMsg(null);
          setMyNum(null)
          try {
            const response = await fetch('http://10.125.1.10/qsrv/data.php/fetchNum',
             {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({window: myWindow, cmd: cmd})
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
            const response = await fetch('http://10.125.1.10/qsrv/data.php/serveNext',
             {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({window: myWindow, index: index})
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
    
      
          const handleButtonClick = () => {
            // Logic to update the number value (for example, incrementing it by 1)
            const inputValue = parseInt(document.getElementById('windowNumberInput').value);
            if(isNumeric(inputValue)){
              setIsNumber(true);
              setMyWindow(inputValue);
              //fetch the number being served for the set window number
              // fetchNum(1);
            } else {
              setIsNumber(false)
            }
         
          };

    

        const SetWindowWidget = () => {

          return (
          
                        <div className="w-32 flex flex-col text-center p-3">
                {/* Input field to enter the number */}
                <input type="text" className="mb-3 p-2 border border-gray-500 rounded-md"   id="windowNumberInput" />

                {/* Button to update the number value */}
                <button onClick={handleButtonClick} className="mb-3 border border-blue-800 bg-blue-600 hover:bg-blue-400 text-white rounded-md p-2 text-sm">Set Window Number</button>

                {!isNumber && <p className="text-red-700 text-sm">Input Numbers Only</p>}
              </div>
            
          )
        }

     
        //UI
        return(
       <div>
        <h2 className="text-center text-2xl font-semibold">Window Number: {myWindow}</h2>
           <div className="container w-3/4 mx-auto  mt-5 flex items-center justify-center">
            <div className=" border rounded-md border-yellow-500 p-3 text-center">
            {myNum !== null ? 
           <>
           <p className="text-2xl text-black mb-3">
              Currently Serving:
           </p>
              {errorMsg === null && 
               <p className={`text-4xl font-bold ${numServed ? 'text-green-600' : 'text-black'} mb-3`}>
                {myNum}
              </p>
              }
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

            {showWindow && <SetWindowWidget />}
          </div>
       </div>
        );


}