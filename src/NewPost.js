import React from "react";

const NewPost = ({ edituser, setEditUser, users, setUsers, handleSubmit }) => {
  return (
    <div>
      <form className="newPostForm">
        <label>
          <b>Enter UserName</b>
        </label>
        <input
          type="text"
          placeholder="Name"
          autoComplete="off"
          name="name"
          value={edituser.name}
          onChange={(e) =>
            setEditUser({ ...edituser, [e.target.name]: e.target.value })
          }
        />

        <label>
          <b>Enter E-mail</b>
        </label>
        <input
          type="text"
          name="email"
          autoComplete="off"
          placeholder="Email"
          value={edituser.email}
          onChange={(e) =>
            setEditUser({ ...edituser, [e.target.name]: e.target.value })
          }
        />
        <button onClick={handleSubmit}>
          <b>Submit</b>
        </button>
      </form>
    </div>
  );
};

export default NewPost;
