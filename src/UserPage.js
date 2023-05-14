import { React, useState } from "react";
import { useParams, Link} from "react-router-dom";

const UserPage = ({ users, setUsers, edituser, setEditUser,handleSave,handleEdit }) => {
  
  const { id } = useParams();
  const user = users.find((user) => user.id.toString() === id);

  return (
    <main className="userpage">
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={edituser.name}
        onChange={(e) =>
          setEditUser({ ...edituser, [e.target.name]: e.target.value })
        }
      />

      <input
        type="text"
        name="email"
        placeholder="Email"
        value={edituser.email}
        onChange={(e) =>
          setEditUser({ ...edituser, [e.target.name]: e.target.value })
        }
      />
      <button onClick={handleSave}>Save</button>

      {user && (
        <div>
          <h3>{user.name}</h3>
          {user.email}
          <>
            <button name="edit" id={user.id} onClick={handleEdit}>
              Edit
            </button>
          </>
        </div>
      )}
      {!user && (
        <>
          <h3>Requested user post not found</h3>
          <Link to="/"> Visit to HomePage</Link>
        </>
      )}
    </main>
  );
};

export default UserPage;
