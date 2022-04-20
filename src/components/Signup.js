import { useState, useEffect } from 'react';
import SignupForm from './SignupForm';

function Signup(props) {
  const [users, setUsers] = useState(localStorage.getItem('storedUsers') || '');

  useEffect(() => {
    localStorage.setItem('storedUsers', `${users}`);
  }, [users]);

  function addUserHandler(data) {
    const newUserData = { ...data };
    const storedUsers = JSON.parse(localStorage.getItem('storedUsers') || '[]');

    if (storedUsers.some((user) => user.email === newUserData.email)) {
      console.log(
        'Signup Failure! Email already in use. Use a different email or try logging in.'
      );
    } else {
      storedUsers.push(newUserData);
      localStorage.setItem('storedUsers', JSON.stringify(storedUsers));
      setUsers(JSON.stringify(storedUsers));
    }
  }

  return <SignupForm onAddUser={addUserHandler} />;
}

export default Signup;
