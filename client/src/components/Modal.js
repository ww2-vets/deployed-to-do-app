import { useState } from "react";
import {useCookies} from "react-cookie";

const Modal = ({ mode, setShowModal, getData, task }) => {
  const [cookies, setCookies, removeCookie] = useCookies(null);
  const editMode = mode === "edit" ? true : false;

  console.log("mode: " + mode);
  console.log("editMode: " + editMode);

  const [data, setData] = useState({
    user_email: editMode ? task.user_email : cookies.Email,
    title: editMode ? task.title : null,
    progress: editMode ? task.progress : 50,
    date: editMode ? task.date : new Date(),
  });

  // Create a new post
  const postData = async (event) => {
    event.preventDefault();

    console.log("POST DATA: " + JSON.stringify(data));

    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data), // body can only transport String
      });

      // // this clean axios code works too!
      // const response = await axios.post(`http://localhost:8000/todos`, data);

      if (response.status === 200) {
        console.log("WORKED!");
        setShowModal(false);
        getData();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const editData = async (event) => {
    event.preventDefault();

    console.log("PUT DATA: " + JSON.stringify(data));
    console.log("PUT ID: " + JSON.stringify(task.id));

    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${task.id}`, {
        method: "PUT",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data), // body can only transport String
      });

      if (response.status === 200) {
        console.log("UPDATED!");
        setShowModal(false);
        getData(); // refresh todo list with updated data
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    // data is existing data in useState
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log("changing data: " + JSON.stringify(data));
  };

  return (
    <div className="overlay">
      <div className="modal">
        <div className="form-title-container">
          <h3>Let's {mode} your task</h3>
          <button
            onClick={() => {
              setShowModal(false);
            }}
          >
            Cancel
          </button>
        </div>
        <form>
          <input
            require
            maxlength={30}
            placeholder=" Type your task here"
            name="title"
            value={data.title}
            onChange={handleChange}
          />
          <br />
          <label for="range">Drag to indicate you current progress</label>
          <input
            required
            type="range"
            id="range"
            min="0"
            max="100"
            name="progress"
            value={data.progress}
            onChange={handleChange}
          />
          <input
            className={mode}
            type="submit"
            onClick={editMode ? editData : postData}
          />
        </form>
      </div>
    </div>
  );
};

export default Modal;
