import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import { Typography } from '@mui/material';

function Logout(props) {
  const navigate = useNavigate();
  function logoutHandler() {
    localStorage.removeItem('loggedInUser');
    console.log('Logout Success! ');
    navigate('/', true);
  }

  return (
    <button
      onClick={logoutHandler}
      className="relative flex justify-start items-center gap-4 w-[90%] h-full text-[#262626] hover:font-bold hover:bg-[#f5f5f5]"
    >
      <LogoutIcon />
      <Typography>Logout</Typography>
    </button>
  );
}

export default Logout;
