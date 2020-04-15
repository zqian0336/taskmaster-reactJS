import React, { Component } from "react";
import ProjectItem from "./Project/ProjectItem";
import CreateProjectButton from "./Project/CreateProjectButton";
import { connect } from "react-redux";
import { getProjects } from "../actions/projectActions";
import PropTypes from "prop-types";



class Dashboard extends Component {
    componentDidMount() {
        this.props.getProjects();
    }



    render() {
        const { projects } = this.props.project;

        const theDashBoard = {
            display:"flex"
        };

        return (

            <div className="projects theHeight">
                <div className="container">

                    <h1 className="display-4 text-center theFont">Mission</h1>
                    <br />
                    <CreateProjectButton />

                    <br />
                    <hr />
                    <div style={theDashBoard} className="row">
                    {projects.map(project => (
                        <div className="col-md-6 col-sm-12 ">
                            <ProjectItem key={project.id} project={project} />
                        </div>
                    ))}
                    </div>


                </div>
            </div>
        );
    }
}

Dashboard.propTypes = {
    project: PropTypes.object.isRequired,
    getProjects: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    project: state.project
});

export default connect(
    mapStateToProps,
    { getProjects }
)(Dashboard);