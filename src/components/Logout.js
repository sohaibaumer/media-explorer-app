import { useNavigate } from 'react-router-dom';
import { addSnackbar } from '../store';
import { useDispatch } from 'react-redux';
import LogoutIcon from '@mui/icons-material/Logout';
import { Typography } from '@mui/material';

function Logout(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function logoutHandler() {
    localStorage.removeItem('loggedInUser');
    dispatch(addSnackbar({ message: 'Logout Success! ', style: 'success' }));
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
