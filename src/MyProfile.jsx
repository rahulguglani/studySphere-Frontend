import Topbar from "./Topbar";
import UserDetails from "./components/UserDetails";
import { useNavigate } from "react-router-dom";
import './myprofile.css'

const MyProfile = () => {
    const navigate = useNavigate();
    function checkToken() {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          navigate('/');
          return false;
        }
        fetch('http://localhost:3000/student/checkToken', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        .then(response => {
          if (!response.ok) {
            localStorage.removeItem('accessToken');
            navigate('/');
          }
          return response.json();
        })
        .then(data => {
          console.log(data.userId);
        })
        .catch(error => {
          console.error('Error checking token:', error);
        });
      }
      checkToken();
  return (
    <div className="profile-container">
        <Topbar/>
        <h2>My Profile</h2>
        <div>
            <UserDetails/>
        </div>
    </div>
  )
}

export default MyProfile;