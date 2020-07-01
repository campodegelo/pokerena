import React from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

const Window = ({show, onClose, item}) => {
    return(
        <Modal
            isOpen={show}
            onRequestClose={onClose}
            overlayClassName={"overlay"}
            className={"modal"}
        >
            <div className={"close-btn-ctn"}>
                <h1>{item.title}</h1>
                <button className={"close-btn"} onClick={onClose}>X</button>
            </div>
            <div>
                <h2>{item.first} {item.last}</h2>
                <p>{item.content}</p>
                <h2>{item.status}</h2>
                <p>{item.icon}</p>
            </div>
        </Modal>
    )
}

export default Window;
