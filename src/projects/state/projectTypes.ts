import {Project} from '../Project';

//action types
export const LOAD_PROJECTS_REQUEST = 'LOAD_PROJECTS_REQUEST';
export const LOAD_PROJECTS_SUCCESS = 'LOAD_PROJECTS_SUCCESS';
export const LOAD_PROJECTS_FAILURE = 'LOAD_PROJECTS_FAILURE';
export const SAVE_PROJECT_REQUEST = 'SAVE_PROJECT_REQUEST';
export const SAVE_PROJECT_SUCCESS = 'SAVE_PROJECT_SUCCESS';
export const SAVE_PROJECT_FAILURE = 'SAVE_PROJECT_FAILURE';
export const DELETE_PROJECT_REQUEST = 'DELETE_PROJECT_REQUEST';
export const DELETE_PROJECT_SUCCESS = 'DELETE_PROJECT_SUCCESS';
export const DELETE_PROJECT_FAILURE = 'DELETE_PROJECT_FAILURE';


export interface ProjectAction {
  type: any;
  payload?:any;
}

interface LoadProjectsRequest extends ProjectAction {
    type: typeof LOAD_PROJECTS_REQUEST;
}

interface LoadProjectsSuccess extends ProjectAction {
    type: typeof LOAD_PROJECTS_SUCCESS;
    payload: {projects: Project[]; page: number};
}

interface LoadProjectsFailure extends ProjectAction {
  type: typeof LOAD_PROJECTS_FAILURE;
  payload: { message: string };
}

interface SaveProjectRequest extends ProjectAction {
  type: typeof SAVE_PROJECT_REQUEST;
}

interface SaveProjectSuccess extends ProjectAction {
  type: typeof SAVE_PROJECT_SUCCESS;
  payload: Project;
}

interface SaveProjectFailure extends ProjectAction {
  type: typeof SAVE_PROJECT_FAILURE;
  payload: { message: string };
}

interface DeleteProjectRequest extends ProjectAction {
  type: typeof DELETE_PROJECT_REQUEST;
}

interface DeleteProjectSuccess extends ProjectAction {
  type: typeof DELETE_PROJECT_SUCCESS;
  payload: Project;
}

interface DeleteProjectFailure extends ProjectAction {
  type: typeof DELETE_PROJECT_FAILURE;
  payload: { message: string };
}


export type ProjectActionTypes =
  | LoadProjectsRequest
  | LoadProjectsSuccess
  | LoadProjectsFailure
  | SaveProjectRequest
  | SaveProjectSuccess
  | SaveProjectFailure
  | DeleteProjectRequest
  | DeleteProjectSuccess
  | DeleteProjectFailure;

export interface ProjectState {
  loading: boolean;
  projects: Project[];
  error: string | undefined;
  page: number;
}