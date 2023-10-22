import React, {useRef, useState, useEffect} from 'react';
import CarouselObject from './CarouselObject';
const departments = [
    {id:1,name:"Accountancy"},
    {id:2,name:"FM/HRM/Business Economics"},
    {id:3,name:"Mktg. Mgt./Entrep./Public Ad"},
    {id:4,name:"Admin Staff"}
]

const ListFaculty = () => {
    const [activeDept, setActiveDept] = useState(1);
    const [facultyList, setFacultyList] = useState([]);
    const [hasData, setHasData] = useState(false);
    const [deptName, setDeptName]=useState("Accountancy");
    const [filteredList, setFilteredList] = useState([]);
    
    useEffect(() => {
        updateData();   
        
      }, [activeDept]);

      useEffect(() => {
        updateData();  
      }, [facultyList]);



      useEffect(() => {
        if (!hasData){
            fetchList();   
        }
      }, []);

     function updateData() {

        //update the dept name in UI
        const dptname = departments.find(x=>x.id===activeDept).name;
        setDeptName(dptname);

        //update the list of faculty array
        const filter = facultyList.filter(x=>x.dpt_index === activeDept);
        setFilteredList(filter);
        setHasData(true)
      }

      const fetchList = async()=> {
        try {
            const response = await fetch('http://localhost/qsrv/data.php/faculties');
            const jsonData = await response.json();
            // setData(jsonData);
           
            let data = jsonData.facultyList;
            if(data.length > 0) {
                setFacultyList(data);
                
                
            }
          } catch (error) {
            console.error('Error fetching data:', error);
          }
      }

      const nextDept=()=>{
      
        if (activeDept === 4) {
                        setActiveDept(1);
        } else {
            setActiveDept(activeDept+1);
            
        }   

      }
      


      const CarouselGroup = () => {
        return (
            departments.map((item, index)=>{
                
                const filterList = facultyList.filter(x=>x.dpt_index === item.id);
                return (
                    <CarouselObject deptName={item.name} facultyList={filterList} carouselSPeed={5000+(item.id * 10)} key={index} />
                )
            })
        )
      }


      return (
        <div className='bg-gradient-to-r from-amber-400 to-amber-600  h-screen px-3 pt-3'>
            {/* {CarouselObject(nextDept, deptName, filteredList)} */}

            {hasData ? <CarouselGroup /> : <p>has no  data</p>}
        </div>
      );
  }



  export default ListFaculty;