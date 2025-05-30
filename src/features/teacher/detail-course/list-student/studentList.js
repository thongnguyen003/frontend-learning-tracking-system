import React, { useState, useEffect } from "react"; // Import useState and useEffect
import { Link,useNavigate,useParams } from "react-router-dom";

const StudentList = ({ classId }) => {
  const navigate = useNavigate(); 
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const {id}=useParams();
  const rediretor = (path)=>{
    const nextPath = path +"/"+ id;
    navigate(nextPath);
  }
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/students/byCourseId/${id}`);
        const data = await response.json();
        if(data.error){
          console.log(data.error)
        }else{
          setStudents(data);
        }
      } catch (error) {
        console.error('Error fetching students:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
    console.log(students)
  }, [classId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
      <div className="bg-white p-6 rounded-md shadow-md mt-2">
        <h2 className="text-lg font-bold mb-4">Student List</h2>
        <div className="text-right font-semibold mb-4">
          {students.length} Students
        </div>
        <div className="space-y-2">
          {(students && students.length >0) &&(
              students.map((student, index) => (
              <div key={student.id} className="flex items-center justify-between p-2 border-b">
                <div className="flex items-center">
    
                  <span className="flex-1">{index + 1}. {student.student_name}</span>
                </div>
                  <img
                    src={student.image || 'default-image-url'} // Use a default image if none provided
                    alt={`Image of ${student.name}`}
                    className="rounded-full w-10 h-10 mr-3"
                    style={{ verticalAlign: 'middle' }} // Ensures vertical alignment
                  />
                <div>
                  <button onClick={()=>rediretor("/student/course")} className="bg-[#00b33c] text-white text-sm font-semibold rounded-md px-3 py-1 mr-2">
                    Info
                  </button>
                  <button onClick={()=>rediretor()} className="bg-[#00b33c] text-white text-sm font-semibold rounded-md px-3 py-1">
                    LG
                  </button>
                </div>
              </div>
            ))
          ) }
        </div>
      </div>
  );
};

export default StudentList;