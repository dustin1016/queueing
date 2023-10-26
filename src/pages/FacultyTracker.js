import React, {useRef, useState, useEffect} from 'react';
import ListFaculty from './FacultyList';


const FacultyTracker = () =>{
    const [facultyList, setFacultyList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
      
      // fetchList();
        //  if (facultyList.length  === 0) {
        // }
      }, []);

      const fetchList = async()=> {
        try {
            const response = await fetch('http://10.125.77.143/qsrv/data.php/faculties');
            const jsonData = await response.json();
            // setData(jsonData);
           
            let data = jsonData.facultyList;
            if(data.length > 0) {
                setFacultyList(data);  
                setIsLoading(false); 
            }
          } catch (error) {
            console.error('Error fetching data:', error);
          }
      }

      
      return (
        <div className='border-2 border-black'>
         
            <ListFaculty />
          
        </div>
      );
}   


export default FacultyTracker;