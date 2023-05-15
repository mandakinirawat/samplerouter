import React from "react";
import { Link } from "react-router-dom";

const Content = ({ users, handelDelete }) => {
  return (
    <main className="main">
      <ul>
        {users.map((user) => (
          <li key={user.id} style={{display: 'flex', justifyContent: 'space-between'}}>
            <p>
              <Link to={`/user/${user.id}`}>
                <h3>{user.name}</h3>
              </Link>
              {user.email}
            </p>
            <button name="delete" id={user.id} onClick={handelDelete}>
              delete
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default Content;
