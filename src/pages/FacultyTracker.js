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

   

      
      return (
        <div className='border-2 border-black'>
         
            <ListFaculty />
          
        </div>
      );
}   


export default FacultyTracker;