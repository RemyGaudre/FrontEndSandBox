import {Project} from './Project';
const baseUrl = 'http://localhost:4000';
const url = '${baseUrl}/projects';

function translateStatusToErrorMessage(status: number){
    switch(status){
        case 401:
            return 'Please login again.';
        case 403:
            return 'You do not have permission to view the project(s).';
        default:
            return 'There was an error retrieving the projct(s). Please try again.';
    }
}

function checkStatus(response: any){
    if(response.ok){
        return response;
    } else {
        const httpErrorInfo = {
            status: response.status,
            statusText: response.statusText,
            url: response.url
        };
        console.log('log server http error: ${JSON.stringify(httpErrorInfo)}');
        let errorMessage = translateStatusToErrorMessage(httpErrorInfo.status);
        throw new Error(errorMessage);
    }
}

function parseJSON(response: Response){
    return response.json();
}

// eslint-disable-next-line
function delay(ms: number) {
  return function (x: any): Promise<any> {
    return new Promise((resolve) => setTimeout(() => resolve(x), ms));
  };
}

function convertToProjectModels(data: any[]): Project[] {
  let projects: Project[] = data.map(convertToProjectModel);
  return projects;
}

function convertToProjectModel(item: any): Project {
  return new Project(item);
}

const projectApi = {
  get(page = 1, limit = 20) {
    return fetch(`http://localhost:4000/projects?_page=${page}&_limit=${limit}&_sort=name`)
      .then(delay(600))
      .then(checkStatus)
      .then(parseJSON)
      .then(convertToProjectModels)
      .catch((error: TypeError) => {
        console.log('log client error ' + error);
        throw new Error(
          'There was an error retrieving the projects. Please try again.'
        );
      });
  },
  put(project: Project){
  let puturl = 'http://localhost:4000/projects/'+project.id;
  console.log(puturl);
    return fetch('http://localhost:4000/projects/'+project.id, {
        method: 'PUT',
        body: JSON.stringify(project),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(checkStatus)
        .then(parseJSON)
        .catch((error: TypeError) => {
            console.log('log client error ' + error);
            throw new Error ('There was an updating error');
        });
  },
  find(id: number){
    return fetch('http://localhost:4000/projects/'+id)
        .then(checkStatus)
        .then(parseJSON)
        .then(convertToProjectModel);
  }
};

export { projectApi };