import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

function Profile() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [userUid, setUserUid] = useState("");
  const [formDate, setFormDate] = useState({
    fullname: "",
    gender: "",
    birthdate: "",
    interest: [],
  });

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log("user", user);
      if (user) {
        const uid = user.uid;
      } else {
        navigate("/");
      }
    });
  }, []);

  const handleCheckbox = (event) => {
    if (event.target.checked) {
      setFormDate({
        ...formDate,
        interest: [...formDate.interest, event.target.value],
      });
    } else {
      setFormDate({
        ...formDate,
        interest: formDate.interest.filter(
          (interest) => interest !== event.target.value
        ),
      });
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg max-w-lg w-full">
        <form>
          <h3 className="text-2xl font-bold text-center mb-4">Profile</h3>
          <div className="mt-4">
            <label className="block">Full Name</label>
            <input
              type="text"
              value={formDate.fullname}
              onChange={(e) => setFormDate(e.target.value)}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              required
            />
          </div>
          <div className="mt-4">
            <label className="block">Gender</label>
            <div className="flex gap-4">
              <label>
                <input
                  type="radio"
                  value="Male"
                  onChange={(e) => setFormDate(e.target.value)}
                />{" "}
                Male
              </label>
              <label>
                <input
                  type="radio"
                  value="Female"
                  onChange={(e) => setFormDate(e.target.value)}
                />{" "}
                Female
              </label>
            </div>
          </div>
          <div className="mt-4">
            <label className="block">Birthdate</label>
            <input
              type="date"
              value={formDate.birthdate}
              onChange={(e) => setFormDate(e.target.value)}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              required
            />
          </div>
          <div className="mt-4">
            <label className="block">Interests</label>
            <div className="flex flex-wrap gap-4">
              <label>
                <input
                  type="checkbox"
                  value="Reading"
                  onChange={handleCheckbox}
                />{" "}
                Reading
              </label>
              <label>
                <input
                  type="checkbox"
                  value="Traveling"
                  onChange={handleCheckbox}
                />{" "}
                Traveling
              </label>
              <label>
                <input
                  type="checkbox"
                  value="Gaming"
                  onChange={handleCheckbox}
                />{" "}
                Gaming
              </label>
              {/* Add more interests as needed */}
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            {email} {userUid}
            <button className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900">
              Update Profile
            </button>
            <button
              type="button"
              onClick={() => signOut(auth)}
              className="px-6 py-2 text-white bg-red-500 rounded-lg hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Profile;
