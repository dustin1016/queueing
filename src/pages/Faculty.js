import React, {useState, useEffect} from "react";
import departments from "./departments";

const status = [
  "in",
  "out",
  "on leave",
  "on travel",
  "in-class",
  "admin"
];
const Faculty = () => {
    
    const [facultyList, setFacultyList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hasData, setHasData] = useState(false);
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [selectedFaculty, setSelectedFaculty] = useState(null);
    
    useEffect(()=>{
        if (!hasData){
            fetchList();   
        }
    },[]);

    // useEffect(()=>{
    //   if (selectedFaculty !== null){
    //     //update the status of the selected faculty
    //     const selectedId = selectedFaculty.faculty_idx;
    //     const stat = facultyList.find(x=>x.faculty_idx === selectedId).status;
    //     selectedFaculty.status = stat;
    //   }
    // },[facultyList]);


    
    const fetchList = async()=> {
        try {
            const response = await fetch('http://10.125.1.10/data.php/faculties');
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

      const handleDepartmentChange = (event) => {
        const id = event.target.value;
        
        setSelectedDepartment(event.target.value);
      };

      const handleFacultyClick = (id) => {
       


        const selectedProf = facultyList.find(x=>x.faculty_idx===parseInt(id));
        
        setSelectedFaculty(selectedProf);
      };

      function DeptSelection() {

        return (
            <div className="mb-4 w-1/4">
              <label htmlFor="department">Select a department: </label>
              <select className="p-1 border border-slate-600 rounded-md" id="department" value={selectedDepartment} onChange={handleDepartmentChange}>
                <option value="">Select Department</option>
                {departments.map(department => (
                  <option key={department.id} value={department.id}>
                    {department.name}
                  </option>
                ))}
              </select>
            </div>
          );
      }

      const FacultyListCard = React.memo(({ id, name, img }) => {
        const imgpath = img !== null ? "http://10.125.1.10/img/"+img : 'images/blank.webp';
       
        return (
            <div onClick={()=>handleFacultyClick(id)} className=" border-b cursor-pointer hover:bg-slate-500 border-black w-full p-3 flex flex-row items-center">
                <img src={imgpath} height={50} width={50} className="rounded-full object-cover object-top" />
                <p className="text-md lg:text-lg ml-3">{name}</p>
            </div>
        );
      })

      function FacultyListBox() {
            // const filteredList = facultyList.filter(x=>x.dpt_index===parseInt(selectedDepartment));
            const [searchInput, setSearchInput] = useState('');

            const filteredList = facultyList.filter((item) => {
              // Check if the item's name contains the search input (case-insensitive)
              return item.name.toLowerCase().includes(searchInput.toLowerCase());
            });
          
            const handleSearchInputChange = (event) => {
              setSearchInput(event.target.value);
            };
            return (
                <div>
                      <input
        type="text"
        placeholder="Search..."
        className="p-1 mb-3 border border-gray-600 rounded-md text-sm w-full"
        value={searchInput}
        onChange={handleSearchInputChange}
      />

                <p className="text-center mb-3 font-bold text-lg">Faculty List</p>
                    <div className="w-56 lg:w-64 overflow-y-auto h-96 shadow-lg shadow-amber-400/40 border-t border-black">
                    {   filteredList?.map((item, index)=>{
                        return(
                            <FacultyListCard id={item.faculty_idx} name={item.name} img={item.pic_name} key={item.faculty_idx} />
                        )
                    })}
                    </div>
                </div>
            )
      }

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
           
            // selectedFaculty.status = status
            setFacultyList(prevFacultyList => {
              const updatedList = prevFacultyList.map(faculty => {
                if (faculty.faculty_idx === selectedFaculty?.faculty_idx) {
                  return { ...faculty, status: status };
                }
                return faculty;
              });
              return updatedList;
            });

            return true
          } else {
            return false;
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }

      const handleStatusChange = async (newStatus) => {
        // Call the updateFacultyStatus function with newStatus
        if (await updateFacultyStatus(newStatus)){
          setSelectedFaculty((prevSelectedFaculty) => ({
            ...prevSelectedFaculty,
            status: newStatus,
          }));
  
        }

      
        
      };

      const StatusButton = ({ status, selectedStatus, onClick }) => {
        const isActive = status === selectedStatus;
        return (
          <button
            onClick={() => onClick(status)}
            className={`uppercase text-sm lg:text-xl p-3 border border-gray hover:border-black rounded-md ${
              isActive ? "bg-green-600 text-black" : ""
            }`}
          >
            {status}
          </button>
        );
      };
   
      function SelectedFaculty(){
          
          const imgpath = selectedFaculty !== null ? "http://10.125.1.10/img/"+selectedFaculty?.pic_name : 'images/blank.webp';
        return(
          <div className="flex flex-col md:flex-row border border-slate-800 rounded-md p-4">
            <div className="flex flex-col items-center justify-center mb-4">
              <div className="h-24 w-24 md:h-72 md:w-72">
                <img src={imgpath} className="object-cover w-full h-full object-top" />
              </div>
              <p className="text-center md:text-start text-md md:text-2xl">{selectedFaculty?.name}</p>
            </div>
            <div className="ml-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {status.map((item, index)=>{
                    // return(
                    //   <button key={index} onClick={()=>{updateFacultyStatus(item)}} className={`uppercase text-xl p-3 border border-gray hover:border-black rounded-md
                    //   ${selectedFaculty?.status===item && 'bg-green-600 text-black'}
                    //   `}>
                    //     {item}
                    //   </button>
                    // )
                    return(
                      <StatusButton
                      key={index}
                      status={item}
                      selectedStatus={selectedFaculty?.status}
                      onClick={handleStatusChange}
                    />
                    )
                  })}
                </div>
            </div>
          </div>
        )
      }
      return (
        <div className="p-1 relative ">
            
            {/* <DeptSelection  /> */}

            <div className=" p-4">
                <div className="flex flex-row">
                    <FacultyListBox />
                    <div className="ml-3 grow">
                      <SelectedFaculty />
                    </div>
                </div>
            </div>
        </div>
      )
}


export default Faculty;