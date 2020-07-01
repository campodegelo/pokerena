import React from "react";
import axios from "../script/axios";

export default class BioEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bio: props.bio
        };
    }
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    submit() {
        axios
            .post("/editBio", {
                id: this.props.id,
                bio: this.state.bio
            })
            .then(({ data }) => {
                this.props.setBio(data.bio);
                this.setState({
                    bio: data.bio,
                    editorIsVisible: false,
                    error: false
                });
            })
            .catch(() =>
                this.setState({
                    error: true
                })
            );
    }
    render() {
        return (
            <div>
                {this.state.error && (
                    <div className="error">
                        Ops! An error happened. Try again!
                    </div>
                )}
                {this.state.bio && !this.state.editorIsVisible && (
                    <div>
                        <h1 className="headers-titles">
                            {this.props.first} {this.props.last}
                        </h1>
                        <h2 id="bio-content">{this.props.bio}</h2>
                        <button
                            onClick={() =>
                                this.setState({
                                    editorIsVisible: true
                                })
                            }
                        >
                            edit
                        </button>
                    </div>
                )}
                {this.state.editorIsVisible && (
                    <div>
                        <h2>Please tell something about yourself</h2>
                        <textarea
                            name="bio"
                            id="bio-text"
                            rows="10"
                            cols="50"
                            value={this.state.bio}
                            onChange={e => this.handleChange(e)}
                        />
                        <button onClick={() => this.submit()}>save</button>
                    </div>
                )}
                {!this.state.bio && !this.state.editorIsVisible && (
                    <div>
                        <h1>
                            {this.props.first} {this.props.last}
                        </h1>
                        <button
                            onClick={() =>
                                this.setState({
                                    editorIsVisible: true
                                })
                            }
                        >
                            add bio
                        </button>
                    </div>
                )}
            </div>
        );
    }
}
