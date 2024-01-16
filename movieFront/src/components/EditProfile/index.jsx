import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { editUser } from "../../redux/userSlice";
import axios from "axios";

import "./index.scss";

const EditProfile = ({ setModal, user }) => {
  const [nameValue, setNameValue] = useState("");
  const [avatarValue, setAvatarValue] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    setNameValue(user && user.name);
  }, [user]);

  const handleAvatar = (event) => {
    const image = event.target.files[0];
    setAvatarValue(image);
  };

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", nameValue);
    formData.append("avatar", avatarValue);

    const response = await axios({
      method: "PATCH",
      url: `${import.meta.env.VITE_API_URL}/users/profile`,
      data: formData,
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    dispatch(editUser(response.data));
    setModal(false);
  }

  return (
    <div className="editProfile">
      <div className="editProfile__container">
        <div className="editProfile__closeRow">
          <FontAwesomeIcon
            icon={faTimes}
            className="editProfile__icon"
            onClick={() => setModal(false)}
          />
        </div>
        <h2>Edit your information</h2>
        <form
          action=""
          className="editProfile__form"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <label htmlFor="" className="editProfile__label">
            {nameValue}
          </label>
          <input
            type="text"
            placeholder="Change your name"
            value={nameValue}
            onChange={(event) => setNameValue(event.target.value)}
          />
          <label htmlFor="" className="editProfile__label">
            Change your avatar
          </label>
          <input
            id="avatar"
            type="file"
            name="avatar"
            className="editProfile__label"
            onChange={handleAvatar}
          />
          <button className="editProfile__button">Confirm</button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
