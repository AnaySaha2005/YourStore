import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import "./Profile.css";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ItemList from "./ItemList";
import { login, logout } from "./redux/isLogged/isLogged";
const Profile = () => {
  const userData = useSelector((state) => state.isLogged.loginData);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [state, setState] = useState({
    username: userData.name,
    email: userData.email,
  });
  const [file, setFile] = useState(null);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };
  const onFileChange = (e) => {
    setFile(e.target.files[0]); // The file selected by the user
  };
  async function update(event) {
    event.preventDefault();
    const formData = new FormData();

    const username = state.username;
    const email = state.email;
    const password = state.password;
    formData.append("file", file);
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("description", event.target[3].value);
    try {
      const fetch = await axios.patch(import.meta.env.VITE_API_URL+"/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (fetch.data.expired) {
        navigate("/login");
        toast.error("Login first");
      } else {
        if (fetch.data.error) toast.error(fetch.data.error);
        else {
          toast.success(fetch.data.success);
          dispatch(login(fetch.data.data));
        }
      }
    } catch (e) {
      console.log(e);
    }
  }
  async function deleteAcc() {
    const password = state.password;
    if (state.password == "") toast.error("enter password");
    else
      try {
        const fetch = await axios.delete(import.meta.env.VITE_API_URL+"/" + password, {
          password,
        });
        if (fetch.data.expired) {
          navigate("/login");
          toast.error("Login first");
        } else {
          if (fetch.data.error) toast.error(fetch.data.error);
          else {
            toast.success(fetch.data.success);
            let result = await axios.get(import.meta.env.VITE_API_URL+"/logout", {
              withCredentials: true,
            });
            dispatch(logout());
          }
        }
      } catch (e) {}
  }
  return (
    <div className=" container ">
      <div className="card-body text-center">
        <h2>Your Profile</h2>
        <img
          src={
            userData.image 
          }
          alt="profile image"
          className="pfp"
        />

        <form onSubmit={update}>
          <div class="form-group">
            <input
              onChange={handleChange}
              type="text"
              class="form-control"
              name="username"
              defaultValue={userData.name}
            />
          </div>
          <br />
          <div class="form-group">
            <input
              onChange={handleChange}
              type="email"
              class="form-control"
              name="email"
              aria-describedby="emailHelp"
              defaultValue={userData.email}
            />
            <small id="emailHelp" class="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div class="form-group">
            <input
              onChange={onFileChange}
              type="file"
              class="form-control"
              name="image"
              placeholder="Enter image"
              aria-describedby="emailHelp"
            />
          </div>
          <br />
          {userData.type == "Retailer" ? (
            <div class="form-group">
              <textarea
                onChange={handleChange}
                type="text"
                class="form-control"
                name="description"
                defaultValue={userData.description}
                placeholder="Enter Description of your shop"
              />
            </div>
          ) : (
            <></>
          )}
          <br />
          <div class="form-group">
            <input
              onChange={handleChange}
              required
              type="password"
              class="form-control"
              name="password"
              placeholder="Enter Password"
            />
          </div>
          <br />
          <br />
          <button className="btn btn-dark" type="button" onClick={deleteAcc}>
            Delete Account
          </button>
          &nbsp;&nbsp;
          <button type="submit" className="btn btn-dark">
            Update
          </button>
          &nbsp;&nbsp;
        </form>
      </div>
      {userData.type == "Retailer" ? <ItemList /> : <></>}
    </div>
  );
};

export default Profile;
