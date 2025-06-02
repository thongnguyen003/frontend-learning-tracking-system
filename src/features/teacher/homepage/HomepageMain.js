import { useState, useEffect } from "react";
import Item from "./components/Item";

const HomepageMain = () => {
  const [classe, setClasses] = useState([]); 

  const currentUser = JSON.parse(sessionStorage.getItem("current_user"));
  const id = currentUser?.account?.id;
  const role = currentUser?.role;

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/class/getByTeacherId/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        setClasses(result || []);
        console.log(result || []);
      } catch (error) {
        console.error("Failed to fetch classes:", error);
      }
    };
    fetchClasses();
  }, [id, role]); 

  return (
    <main style={{ width: "100%", boxSizing: "border-box" }}>
      <p className="fs-5 mb-3">List classes</p>
      <div className="row">
        {Array.isArray(classe) && classe.length > 0 ? (
          classe.map((e, index) => {

            return (
              <Item
                key={index}
                idh={e.id}
                classes_name={e.name}
                student_count={e.students_count}
                teacher_count={e.class_teachers_count}
                start_day={e.start_day}
              />
            );
          })
        ) : (
          <p>No class available.</p>
        )}
      </div>
    </main>
  );
};

export default HomepageMain;
