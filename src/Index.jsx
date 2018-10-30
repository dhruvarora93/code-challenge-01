import React from 'react';
import { connect } from 'react-redux';

import { addProject, fetchProjects, upvoteProject } from './actions';

class Index extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      projectName: ''
    };

    this.handleAdd = this.handleAdd.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentDidMount() {
    this.props.getProjects();
  }

  handleAdd(value) {
    this.props.addProject(value || this.state.projectName);
    this.setState({ projectName: '' });
  }

  handleChange(e) {
    this.setState({ projectName: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.handleAdd();
  }

  handleKeyPress(e) {
    const { keyCode, target: { value } } = e;
    const submitting = keyCode === 13 || keyCode === 10;

    if (value.length > 0 && submitting) {
      this.handleAdd(value);
    }
  }

  render() {
    const { projectName } = this.state;
    const { error, loading, projects, upvoteProject } = this.props;
    const showContent = !loading && !error;
    const header = 'Community Projects';
    let message = 'Click a project to add your vote or suggest a new one.';

    if (loading) {
      message = 'Loading...'
    } else if (error) {
      message = 'Projects could not be loaded.'
    }

    return (
      <div className="container">
        <h1 className="header">{header}</h1>
        <h4 className="message">{message}</h4>

        {showContent && <ul className="project-list">
          {projects.map(project => (
            <li className="project" key={project.id} onClick={() => upvoteProject(project)}>
              <div className="project-name">{project.name}</div>
              <div className="project-votes">{`+${project.votes}`}</div>
            </li>
          ))}
        </ul>}

        {showContent && <div className="form">
          <input
            type="text"
            placeholder="Add project idea"
            onKeyDown={this.handleKeyPress}
            onChange={this.handleChange}
            value={projectName}
          />
          <button onClick={this.handleSubmit}>Submit</button>
        </div>}
      </div>
    );
  }
};

const mapStateToProps = state => {
  return {
    error: state.error,
    loading: state.loading,
    projects: Object.keys(state.projects).map(projectId => state.projects[projectId])
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getProjects: () => {
      dispatch(fetchProjects());
    },
    upvoteProject: (project) => {
      dispatch(upvoteProject(project));
    },
    addProject: (projectName) => {
      dispatch(addProject(projectName));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
