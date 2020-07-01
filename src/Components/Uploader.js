import React from "react";
import axios from "../scripts/axios";

export default class Uploader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.files[0]
        });
    }
    upload() {
        let formData = new FormData();
        // formData.append("file", e.target.files[0]);
        formData.append("file", this.state.file);

        axios.post("/upload", formData).then(({ data }) => {
            console.log("data from upload : ", data);
            this.props.setImageUrl(data[0].image);
        });
    }
    render() {
        return (
            <div className="popup">
                <div className="popup__content">
                    <h3 className="popup__text">Change Picture</h3>
                    <span className="popup__close" onClick={() => this.props.closeModal()}> 
                        {" "}
                        X{" "}
                    </span>

                    <div className="form__group">
                        <input
                            type="file"
                            accept="image/*"
                            name="file"
                            className="popup__input"
                            onChange={e => this.handleChange(e)}
                        />
                        <label htmlFor="file" className="form__label">File name</label>
                        <button className="btn btn--primary btn--animated popup__btn" onClick={() => this.upload()}>upload</button>
                    </div>
                </div>
            </div>
        );
    }
}
