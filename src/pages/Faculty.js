import React, {useState, useEffect} from "react";
import departments from "./departments";

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



    const fetchList = async()=> {
        try {
            const response = await fetch('http://localhost/qsrv/data.php/faculties');
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
        // const imgpath = img !== null ? "http://localhost/qsrv/img/"+img : 'images/blank.webp';
       
        return (
            <div onClick={()=>handleFacultyClick(id)} className=" border-b cursor-pointer hover:bg-slate-500 border-black w-full p-3 flex flex-row items-center">
                {/* <img src={imgpath} height={50} width={50} className="rounded-full object-cover" /> */}
                <p className="text-lg ml-3">{name}</p>
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
                    <div className="w-64 overflow-y-auto h-96 shadow-lg shadow-amber-400/40 border-t border-black">
                    {   filteredList?.map((item, index)=>{
                        return(
                            <FacultyListCard id={item.faculty_idx} name={item.name} img={item.pic_name} key={item.faculty_idx} />
                        )
                    })}
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
                    <p className="grow ml-3">{selectedFaculty?.name}</p>
                </div>
            </div>
        </div>
      )
}


export default Faculty;