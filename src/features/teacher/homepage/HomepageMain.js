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
        const path = role === "teacher" ? "getByTeacherId" : "getByClassId";
        const response = await fetch(`http://127.0.0.1:8000/api/class/${path}/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        setClasses(result.original || []);
        console.log(result.original || []);
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
            console.log(e.class_teachers?.[0]?.id);

            const teacherCount = e.teacher_count || 0;
            const studentCount = e.students_count || 0;

            return (
              <Item
                key={index}
                idh={e.class_teachers?.[0]?.id || null}
                classes_name={e.name}
                student_count={studentCount}
                teacher_count={teacherCount}
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
