import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { enroll } from "../enrollmentSlice";

function CoursesPage() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const course = {
    id: 1,
    name: "React Fundamentals",
    code: "CS101",
    credits: 4,
  };

  function handleEnroll() {
    dispatch(enroll(course));

    navigate("/profile");
  }

  return (
    <div>
      <h2>Courses Page</h2>

      <button onClick={handleEnroll}>
        Enroll
      </button>
    </div>
  );
}

export default CoursesPage;