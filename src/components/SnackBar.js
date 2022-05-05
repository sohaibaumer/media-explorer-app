import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { removeSnackbar } from '../store';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import CancelIcon from '@mui/icons-material/Cancel';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { Typography } from '@mui/material';

function SnackBar(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(removeSnackbar({ id: props.id }));
    }, 3000);
    return () => clearTimeout(timer);
  }, [dispatch, props.id]);

  function closeSnackbarHandler() {
    dispatch(removeSnackbar({ id: props.id }));
  }

  return (
    <div
      className={`mx-2 space-x-2 relative bg-zinc-50 border-2 flex justify-center items-center shadow-lg rounded-lg p-4 2xs:space-x-8 mt-2`}
    >
      <div>
        {props.style === 'success' ? (
          <TaskAltIcon sx={{ color: '#166534' }} />
        ) : (
          <ErrorOutlineIcon sx={{ color: '#991b1b' }} />
        )}
      </div>
      <Typography>{props.message}</Typography>
      <CancelIcon
        sx={{ color: props.style === 'success' ? '#166534' : '#991b1b' }}
        onClick={closeSnackbarHandler}
      />
    </div>
  );
}

export default SnackBar;
