import { useEffect, useState } from "react";
import Header from "./Header";
import Content from "./Content";
import Nav from "./Nav";
import NewPost from "./NewPost";
import UserPage from "./UserPage";
import { Routes, Route } from "react-router-dom";

import apiRequest from "./apiRequest";
import { useNavigate } from "react-router-dom";

function App() {
  const [users, setUsers] = useState([]);
  const API_URL = "https://jsonplaceholder.typicode.com/comments";
  const [edituser, setEditUser] = useState({
    id: "",
    name: "",
    email: "",
  });
  const [fetchError, setFetchError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw Error("Did not get expected result");
        const users = await response.json();
        const newlist = users.slice(0, 8);
        setUsers(newlist);
        console.log(newlist);
      } catch (err) {
        console.log(`Error: ${err.message}`);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (e) => {
    if (e.target.name === "delete") {
      const index = users.findIndex(
        (user) => user.id === parseInt(e.target.id)
      );
      users.splice(index, 1);
    }
    setUsers([...users]);
    const deleteOptions = {
      method: "DELETE",
    };

    const reqUrl = `${API_URL}/${users.id}`;
    const result = await apiRequest(reqUrl, deleteOptions);
    if (result) setFetchError(result);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUsers([edituser, ...users]);
    setEditUser({ id: "", name: "", email: "" });
    navigate("/");

    const postOptions = {
      method: "POST",
      header: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(edituser),
    };
    const result = await apiRequest(API_URL, postOptions);
    if (result) setFetchError(result);
    console.log(result);
  };

  const handleSave = async (e) => {
    const index = users.findIndex((user) => user.id === edituser.id);
    if (index >= 0) {
      users[index] = edituser;
      setUsers([...users]);
      setEditUser({ id: "", name: "", email: "" });
      navigate("/");
    }
    const upadateOptions = {
      method: "PATCH",
      header: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(edituser),
    };
    const reqUrl = `${API_URL}/${edituser.id}`;
    const result = await apiRequest(reqUrl, upadateOptions);
    if (result) setFetchError(result);
  };

  const handleEdit = (e) => {
    if (e.target.name === "edit") {
      const editpost = users.find((user) => user.id === parseInt(e.target.id));
      if (editpost) setEditUser(editpost);
    }
  };

  return (
    <div className="App">
      <Header />
      <Nav />
      <Routes>
        <Route
          exact
          path="/"
          element={<Content users={users} handelDelete={handleDelete} />}
        />
        <Route
          path="/user/:id"
          element={
            <UserPage
              users={users}
              setUsers={setUsers}
              edituser={edituser}
              setEditUser={setEditUser}
              handleSave={handleSave}
              handleEdit={handleEdit}
            />
          }
        />
        <Route
          path="newpost"
          element={
            <NewPost
              edituser={edituser}
              setEditUser={setEditUser}
              users={users}
              setUsers={setUsers}
              handleSubmit={handleSubmit}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
