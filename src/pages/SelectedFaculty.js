import React, {useState, useEffect} from "react";
const status = [
    "in",
    "out",
    "on leave",
    "on travel"
  ];

const SelectedFaculty=({selectedFaculty})=>{

    const [facultyStatus, setFacultyStatus]=useState("out");


    useEffect(()=>{
       setFacultyStatus(selectedFaculty.status) 
    },[]);

    

    const updateFacultyStatus = async(status) => {
        try {
          const response = await fetch('http://10.125.1.10/data.php/updateFacultyStatus',
          {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({id: selectedFaculty?.faculty_idx, status: status})
          });
          const jsonData = await response.json();
          
         
          let data = jsonData;
          if (data.result) {
            //update UI -> faculty status
            console.log(status)
            selectedFaculty.status = status
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }

}



export default SelectedFaculty;