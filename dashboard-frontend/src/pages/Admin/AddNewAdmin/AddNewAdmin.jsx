import React, { useState } from "react";
import "./AddNewAdmin.css";

import { useHttpClient } from "../../../hooks/http-hook";

export default function AddNewAdmin() {

  const { sendRequest } = useHttpClient();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 
  const addNewAdminHandler = async (e) => {
    e.preventDefault();

    try {
      const responseData = await sendRequest(
        "http://localhost:3500/admin/add-new-admin",
        "POST",
        JSON.stringify({
          email,
          password,
          username,
        }),
        {
          "Content-Type": "application/json",
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="add-admin__container">
      <h4 className="fw-bold">Add new Admin</h4>
      <form onSubmit={addNewAdminHandler} className="w-100">
            <input type="text" className="form-control mb-2" required onChange={(e) => setUsername(e.target.value)} />
            <input type="email" className="form-control mb-2" required  onChange={(e) => setEmail(e.target.value)} />
            <input type="password" className="form-control mb-2" required  onChange={(e) => setPassword(e.target.value)} />
           <button type="submit" className="btn btn-primary">submit</button>
          </form>
    </div>
  );
}
