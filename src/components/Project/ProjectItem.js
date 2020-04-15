
import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteProject } from "../../actions/projectActions";


class ProjectItem extends Component {
    onDeleteClick = id => {
        this.props.deleteProject(id);
    };

    leftTime(target) {
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
        const { project } = this.props;


        return (
            <div className="container">
                <div className="card card-body bg-light mb-3 theFont theBorderRadius cardSize OverFlow">
                    <div className="row">
                        <div className="col-md-7 sol-sm-7 cardSize">
                            <Link className="theLinkColor theLinkFocus" to={`/projectBoard/${project.projectIdentifier}`}><h3>{project.projectName}</h3></Link>
                            <span className="mx-auto ">No. {project.projectIdentifier}</span>
                            <p className="OverFlow descSize2">{project.description}</p>

                            <div className="editCard">
                                <span>Start : {project.start_date}</span>
                                <br/>
                                <span>Due: {project.end_date}</span>
                                <strong><p>{this.leftTime(project.end_date)}</p></strong>
                            </div>


                        </div>
                        {/*<div className="col-lg-6 col-md-4 col-8">*/}

                        {/*</div> d-none d-lg-block*/ }
                        <div className="col-md-5 col-sm-5   ">
                            <ul className="list-group">
                                <Link to={`/projectBoard/${project.projectIdentifier}`}>
                                    <li className="list-group-item board">
                                        <p className="theLinkColor"><i className="fa fa-flag-checkered pr-1 "></i>Mission Board</p>
                                    </li>
                                </Link>
                                <Link to={`/updateProject/${project.projectIdentifier}`}>
                                    <li className="list-group-item update">
                                        <p className="theLinkColor"><i className="fa fa-edit pr-1"></i>Update Info</p>
                                    </li>
                                </Link>

                                <li
                                    className="list-group-item delete"
                                    onClick={this.onDeleteClick.bind(
                                        this,
                                        project.projectIdentifier
                                    )}
                                >
                                    <p className="theLinkColor"><i className="fa fa-minus-circle pr-1"></i>Delete Mission </p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ProjectItem.propTypes = {
    deleteProject: PropTypes.func.isRequired,

};

export default connect(
    null,
    { deleteProject }
)(ProjectItem);