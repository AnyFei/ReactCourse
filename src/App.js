import React, {useState} from 'react';
import AddUser from './Components/AddUser';
import UserList from './Components/UserList';

function App() {
  const[usersList, setUsersList] = useState([]);

  const addUserHandler = (uname, uage) =>{
    setUsersList((prevUsersList) => {
      return [...prevUsersList, {name: uname, age: uage, id: Math.random()}];
    });
  };
  return (
    <div>
      <AddUser onAddUser={addUserHandler}/>
      <UserList users={usersList}/>
    </div>
  );
}

export default App;
