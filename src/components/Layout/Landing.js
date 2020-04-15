import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
// import "node_modules/video-react/dist/video-react.css";
import ReactPlayer from 'react-player'
import {login} from "../../actions/securityActions";
import classnames from "classnames";
import Video from "../../assets/orange.mp4";


class Landing extends Component {
    componentDidMount() {
        if (this.props.security.validToken) {
            this.props.history.push("/dashboard");
        }
    }


    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            errors: {}
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.security.validToken) {
            this.props.history.push("/dashboard");
        }

        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }

    onSubmit(e) {
        e.preventDefault();
        const LoginRequest = {
            username: this.state.username,
            password: this.state.password
        };

        this.props.login(LoginRequest);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    render() {
        const { errors } = this.state;

        const theTitle = {
            fontSize: "60px",

        };

        const theForm = {
            marginTop: "30px",
            width: "70%"
        };




        return (
            <div className="theHeight" >
                <ReactPlayer

                    url={Video}
                    loop
                    muted

                    playing={true}
                    className="the_video"
                    width='100%'
                    height='100%'

                />

                <div className= "text-left the_title_board" >

                    <h1 className="textShadow" style={theTitle}>TaskMaster</h1>
                    <h3 className="textShadow" >Schedule your Life, Succeed in Life</h3>

                    <form onSubmit={this.onSubmit} style={theForm}>
                        <div className="form-group">
                            <input
                                type="text"
                                className={classnames("form-control ", "theBorderRadius",{
                                    "is-invalid": errors.username
                                })}
                                placeholder="Email Address"
                                name="username"
                                value={this.state.username}
                                onChange={this.onChange}

                            />
                            {errors.username && (
                                <div className="invalid-feedback">{errors.username}</div>
                            )}
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className={classnames("form-control ", "theBorderRadius", {
                                    "is-invalid": errors.password
                                })}
                                placeholder="Password"
                                name="password"
                                value={this.state.password}
                                onChange={this.onChange}

                            />
                            {errors.password && (
                                <div className="invalid-feedback">{errors.password}</div>
                            )}
                        </div>

                        <input type="submit" className="blockShadow btn btn-light btn-block theBorderRadius mt-4 mb-3 " />
                        <Link className=" mr-2 mt-10 theLinkColor theFont" to="/register" >
                            <strong>Create New Account</strong>
                        </Link>
                        {/*btn btn-sm btn-secondary*/}
                    </form>
                 </div>

            </div>
        );
    }
}

Landing.propTypes = {
    login: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    security: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    security: state.security,
    errors: state.errors
});

export default connect(mapStateToProps, { login } )(Landing);;