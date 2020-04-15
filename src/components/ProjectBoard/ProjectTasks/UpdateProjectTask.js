import React, { Component } from "react";
import { connect } from "react-redux";
import classnames from "classnames";
import { Link } from "react-router-dom";
import {
    getProjectTask,
    updateProjectTask
} from "../../../actions/backlogActions";
import PropTypes from "prop-types";

class UpdateProjectTask extends Component {
    constructor() {
        super();

        this.state = {
            id: "",
            projectSequence: "",
            summary: "",
            acceptanceCriteria: "",
            status: "",
            priority: "",
            dueDate: "",
            projectIdentifier: "",
            create_At: "",
            errors: {}
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        const { backlog_id, pt_id } = this.props.match.params;
        this.props.getProjectTask(backlog_id, pt_id, this.props.history);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }

        const {
            id,
            projectSequence,
            summary,
            acceptanceCriteria,
            status,
            priority,
            dueDate,
            projectIdentifier,
            create_At
        } = nextProps.project_task;

        this.setState({
            id,
            projectSequence,
            summary,
            acceptanceCriteria,
            status,
            priority,
            dueDate,
            projectIdentifier,
            create_At
        });
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();

        const UpdateProjectTask = {
            id: this.state.id,
            projectSequence: this.state.projectSequence,
            summary: this.state.summary,
            acceptanceCriteria: this.state.acceptanceCriteria,
            status: this.state.status,
            priority: this.state.priority,
            dueDate: this.state.dueDate,
            projectIdentifier: this.state.projectIdentifier,
            create_At: this.state.create_At
        };

        // console.log(UpdateProjectTask);
        this.props.updateProjectTask(
            this.state.projectIdentifier,
            this.state.projectSequence,
            UpdateProjectTask,
            this.props.history
        );
    }

    render() {
        const { errors } = this.state;
        return (
            <div className="add-PBI theHeight">
                <div className="container theFont">
                    <div className="row">
                        <div className="col-md-6 m-auto pt-5 pb-5">

                            <h2 className=" text-center">Update Mission Task</h2>
                            <p className="lead text-center">
                                Project Name: {this.state.projectIdentifier} | Project Task ID:{" "}
                                {this.state.projectSequence}{" "}
                            </p>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className={classnames("form-control", {
                                            "is-invalid": errors.summary
                                        })}
                                        name="summary"
                                        placeholder="Project Task summary"
                                        value={this.state.summary}
                                        onChange={this.onChange}
                                    />
                                    {errors.summary && (
                                        <div className="invalid-feedback">{errors.summary}</div>
                                    )}
                                </div>
                                <div className="form-group">
                  <textarea
                      className="form-control"
                      placeholder="Acceptance Criteria or Description"
                      name="acceptanceCriteria"
                      value={this.state.acceptanceCriteria}
                      onChange={this.onChange}
                      rows="5"
                  />
                                </div>
                                <h6>Due Date</h6>
                                <div className="form-group">
                                    <input
                                        type="date"
                                        className="form-control"
                                        name="dueDate"
                                        value={this.state.dueDate}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <select
                                        className="form-control "
                                        name="priority"
                                        value={this.state.priority}
                                        onChange={this.onChange}
                                    >
                                        <option value={0}>Select Priority</option>
                                        <option value={1}>High</option>
                                        <option value={2}>Medium</option>
                                        <option value={3}>Low</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <select
                                        className="form-control "
                                        name="status"
                                        value={this.state.status}
                                        onChange={this.onChange}
                                    >
                                        <option value="">Select Status</option>
                                        <option value="TO_DO">TO DO</option>
                                        <option value="IN_PROGRESS">IN PROGRESS</option>
                                        <option value="DONE">DONE</option>
                                    </select>
                                </div>

                                <input
                                    type="submit"
                                    className="btn btn-outline-dark btn-block mt-4 mb-3"
                                />
                                <Link
                                    to={`/projectBoard/${this.state.projectIdentifier}`}
                                    className="theFont theLinkColor text-center "
                                >
                                    Back to Mission Board
                                </Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

UpdateProjectTask.propTypes = {
    getProjectTask: PropTypes.func.isRequired,
    project_task: PropTypes.object.isRequired,
    updateProjectTask: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    project_task: state.backlog.project_task,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { getProjectTask, updateProjectTask }
)(UpdateProjectTask);