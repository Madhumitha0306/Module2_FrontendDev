import { useState } from "react";

function StudentProfile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [semester, setSemester] = useState("");

  return (
    <div>
      <h2>Student Profile</h2>

      <form>
        <div>
          <label>Name:</label><br />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <br />

        <div>
          <label>Email:</label><br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <br />

        <div>
          <label>Semester:</label><br />
          <input
            type="number"
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
          />
        </div>
      </form>
    </div>
  );
}

export default StudentProfile;