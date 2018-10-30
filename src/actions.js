import fetch from 'cross-fetch';

import {
  PROJECTS_REQUEST,
  PROJECTS_SUCCESS,
  PROJECTS_ERROR,
  ADD_PROJECT,
  UPVOTE_PROJECT
} from './constants';

export const projectsRequest = () => {
  return {
    type: PROJECTS_REQUEST
  }
};

export const projectsSuccess = projects => {
  return {
    type: PROJECTS_SUCCESS,
    projects
  }
};

export const projectsError = () => {
  return {
    type: PROJECTS_ERROR
  };
};

export const fetchProjects = () => {
  return dispatch => {
    dispatch(projectsRequest());

    return fetch('/projects')
      .then(res => res.json())
      .then(json => dispatch(projectsSuccess(json)))
      .catch(error => dispatch(projectsError()));
  }
};

export const addProject = projectName => {
  return {
    type: ADD_PROJECT,
    projectName
  };
};

export const upvoteProject = project => {
  return {
    type: UPVOTE_PROJECT,
    project
  }
};
