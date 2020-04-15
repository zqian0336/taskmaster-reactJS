import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createProject } from "../../actions/projectActions";
import classnames from "classnames";
import {Link} from "react-router-dom";

class AddProject extends Component {
    constructor() {
        super();

        this.state = {
            projectName: "",
            projectIdentifier: "",
            description: "",
            start_date: "",
            end_date: "",
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    //life cycle hooks
    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        const newProject = {
            projectName: this.state.projectName,
            projectIdentifier: this.state.projectIdentifier,
            description: this.state.description,
            start_date: this.state.start_date,
            end_date: this.state.end_date
        };
        this.props.createProject(newProject, this.props.history);
    }

    render() {
        const { errors } = this.state;

        return (
            <div>
                <div className="project theHeight theFont pt-5 pb-5">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6 m-auto">
                                <h5 className="display-4 text-center">Create Your Mission</h5>
                                <hr />
                                <form onSubmit={this.onSubmit}>
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            className={classnames("form-control ", {
                                                "is-invalid": errors.projectName
                                            })}
                                            placeholder="Project Name"
                                            name="projectName"
                                            value={this.state.projectName}
                                            onChange={this.onChange}
                                        />
                                        {errors.projectName && (
                                            <div className="invalid-feedback">
                                                {errors.projectName}
                                            </div>
                                        )}
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            className={classnames("form-control ", {
                                                "is-invalid": errors.projectIdentifier
                                            })}
                                            placeholder="Unique Project ID"
                                            name="projectIdentifier"
                                            value={this.state.projectIdentifier}
                                            onChange={this.onChange}
                                        />
                                        {errors.projectIdentifier && (
                                            <div className="invalid-feedback">
                                                {errors.projectIdentifier}
                                            </div>
                                        )}
                                    </div>
                                    <div className="form-group">
                    <textarea
                        className={classnames("form-control ", {
                            "is-invalid": errors.description
                        })}
                        placeholder="Project Description"
                        name="description"
                        value={this.state.description}
                        onChange={this.onChange}
                        rows="5"
                    />
                                        {errors.description && (
                                            <div className="invalid-feedback">
                                                {errors.description}
                                            </div>
                                        )}
                                    </div>
                                    <h6>Start Date</h6>
                                    <div className="form-group">
                                        <input
                                            type="date"
                                            className="form-control "
                                            name="start_date"
                                            value={this.state.start_date}
                                            onChange={this.onChange}
                                        />
                                    </div>
                                    <h6>Estimated End Date</h6>
                                    <div className="form-group">
                                        <input
                                            type="date"
                                            className="form-control "
                                            name="end_date"
                                            value={this.state.end_date}
                                            onChange={this.onChange}
                                        />
                                    </div>

                                    <input
                                        type="submit"
                                        className="btn btn-outline-dark btn-block mt-4 mb-4"
                                    />
                                    <Link
                                        to={`/projectBoard/`}
                                        className="theFont theLinkColor text-center "
                                    >
                                        Go Back
                                    </Link>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

AddProject.propTypes = {
    createProject: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { createProject }
)(AddProject);