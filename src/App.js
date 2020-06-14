import React, { useState } from "react";
import UsersTable from '../src/UserTables'
import AddUserForm from '../src/AddUsersFrom'
import EditUserForm from '../src/EditUserForm'
import './App.css';
import './style.css';

export default function MyComponent(props) {
  

  //initialStateawal
  const usersData = [
    { id: 1, name: 'Tania', username: 'floppydiskette' },
    { id: 2, name: 'Craig', username: 'siliconeidolon' },
    { id: 3, name: 'Ben', username: 'benisphere' },
  ]

  
  //hook in users
  const [users, setUsers] = useState(usersData)


  //create user
  const addUser = user => {
    user.id = users.length + 1
    setUsers([...users, user])
  }

  //delete user
  const deleteUser = id => {
    setUsers(users.filter(user => user.id !== id))
  }

  //edit user
  const [editing, setEditing] = useState(false)
  const initialFormState = { id: null, name: '', username: '' }
  const [currentUser, setCurrentUser] = useState(initialFormState)

  const editRow = user => {
    setEditing(true)
    setCurrentUser({ id: user.id, name: user.name, username: user.username })
  }

  const updateUser = (id, updatedUser) => {
    setEditing(false)
  
    setUsers(users.map(user => (user.id === id ? updatedUser : user)))
  }


  return (
    <div className="container">
    <h1>CRUD App with Hooks</h1>
    <div className="flex-row">
      <div className="flex-large">
        <div className="flex-large">
          {editing ? (
            <div>
              <h2>Edit user</h2>
              <EditUserForm
                setEditing={setEditing}
                currentUser={currentUser}
                updateUser={updateUser}
              />
            </div>
          ) : (
            <div>
              <h2>Add user</h2>
              <AddUserForm addUser={addUser} />
            </div>
          )}
        </div>
      </div>
      <div className="flex-large">
        <h2>View users</h2>
        <UsersTable users={users} deleteUser={deleteUser} editRow={editRow}/>
        
      </div>
    </div>
  </div>
  );
}
