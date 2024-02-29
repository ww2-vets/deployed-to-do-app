import Modal from "./Modal"
import { useState } from "react";
import {useCookies} from "react-cookie";

// destructuring props as listName
const ListHeader = ({listName, getData}) => {
  const [cookies, setCookies, removeCookie] = useCookies(null);

  const [showModal, setShowModal] = useState(false);

    const signOut = () => {
        console.log("SIGN OUT");
        removeCookie('Email');
        removeCookie('AuthToken');
        window.location.reload();
    }

    return (
      <div className="list-header">
        <h1>{listName}</h1>
        <div className="button-container">
            <button onClick={() => setShowModal(true)} className="create">ADD NEW</button>
            <button onClick={signOut} className="signout">SIGN OUT</button>
        
        </div>
        {/* if showModal state is true then show modal form  */}
        {showModal && <Modal mode={'create'} setShowModal={setShowModal} getData={getData} />}
      </div>
    );
  }
  
  export default ListHeader;
  