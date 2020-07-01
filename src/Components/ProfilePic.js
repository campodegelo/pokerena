import React from "react";

export default function ProfilePic(props) {
    const srcImg = props.image || "/img/default.png";
    // const id = props.type || "profile-container";
    return (
        <div className="profile">
            <div className="profile__side profile__side--front" >
                <img
                    src={srcImg}
                    alt="avatar"
                    className="profile__picture"
                    onClick={() => props.clickHandler()}
                />
            </div>
            <div 
                className="profile__side profile__side--back" 
                onClick={() => props.clickHandler()}>

                <p className="profile__text">change<br></br>picture</p>
            </div>
        </div>
    );
}
