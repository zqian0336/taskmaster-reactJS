import React, { Component } from "react";
import { Link } from "react-router-dom";
import { deleteProjectTask } from "../../../actions/backlogActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class ProjectTask extends Component {
    onDeleteClick(backlog_id, pt_id) {
        this.props.deleteProjectTask(backlog_id, pt_id);
    }

    leftTime(target) {
        if(!target) return "";
        var diff =  new Date(target).getTime() - Date.now();
        var days = Math.floor(diff/86400000);
        var count;
        if(days >=0){
            count = days + " Days Left"
        }else{
            days *= -1;
            count = days + " Days Ago"
        }
        return count;

    }
    render() {
        const { project_task } = this.props;
        let priorityString;
        let priorityClass;

        if (project_task.priority === 1) {
            priorityClass = "bg-high text-dark";
            priorityString = "HIGH";
        }

        if (project_task.priority === 2) {
            priorityClass = "bg-medium text-dark";
            priorityString = "MEDIUM";
        }

        if (project_task.priority === 3) {
            priorityClass = "bg-low text-dark";
            priorityString = "LOW";
        }

        return (
            <div className="card mb-1 bg-light cardSize">
                <div className={`card-header text-primary ${priorityClass}`}>
                    ID: {project_task.projectSequence} - Priority: {priorityString} -
                </div>
                <div className="card-body bg-light">
                    <h5 className="card-title">{project_task.summary}</h5>
                    <stong><p className="theFontSize">{this.leftTime(project_task.dueDate)}</p></stong>
                    <p className="card-text  OverFlow descSize">
                        {project_task.acceptanceCriteria}
                    </p>
                    <div className="editCard">
                        <Link
                            to={`/updateProjectTask/${project_task.projectIdentifier}/${
                                project_task.projectSequence
                            }`}
                            className="btn btn-sm btn-outline-dark"
                        >
                            View / Update
                        </Link>

                        <button
                            className="btn btn-sm btn-outline-dark ml-4"
                            onClick={this.onDeleteClick.bind(
                                this,
                                project_task.projectIdentifier,
                                project_task.projectSequence
                            )}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

ProjectTask.propTypes = {
    deleteProjectTask: PropTypes.func.isRequired
};
export default connect(
    null,
    { deleteProjectTask }
)(ProjectTask);