import React, {SyntheticEvent, useState} from 'react';
import {Project} from './Project';
import {useDispatch} from 'react-redux';
import {AnyAction} from 'redux';
import {ThunkDispatch} from 'redux-thunk';
import {saveProject} from './state/projectActions';
import {ProjectState} from './state/projectTypes';

interface ProjectFormProps{
    project: Project;
    onCancel: () => void;
}

export default function ProjectForm({project: initialProject, onCancel} : ProjectFormProps){

    const [project, setProject] = useState(initialProject);
    const [errors, setErrors] = useState({name : '', description: '', budget:''});
    const dispatch = useDispatch<ThunkDispatch<ProjectState, any, AnyAction>>();

    function validate (project: Project){
            const {name, description, budget} = project;
            let errors: any = {name : '', description: '', budget:''};
            if(name.length === 0){
                errors.name = 'Name is required';
            }
            if(project.name.length<3){
                errors.name= 'Name needs to be at least 3 characters.';
            }
            if (project.description.length === 0) {
              errors.description = 'Description is required.';
            }
            if (project.budget === 0) {
              errors.budget = 'Budget must be more than $0.';
            }
            return errors;
    }

    function isValid(){
        return (errors.name.length===0 && errors.description.length === 0 && errors.budget.length===0);
    }

    const handleSubmit = (event: SyntheticEvent)=>{
        event.preventDefault();
        if(!isValid())return;
        dispatch(saveProject(project));
    }

    const handleChange = (event: any)=>{
        const {type, name, value, checked} = event.target;

        let updatedValue = type === 'checkbox' ? checked : value;

        if(type === 'number'){
            updatedValue = Number(updatedValue);
        }
        const change = {
            [name] : updatedValue
        }
        let updatedProject: Project = new Project({...project, ...change});
        setProject(updatedProject);
        setErrors(validate(updatedProject));
    }

    return (
        <form className="input-group vertical">
            <label htmlFor="name">Project Name</label>
            <input type="text" name="name" placeholder="enter name" value={project.name} onChange={handleChange}/>
            {errors.name.length > 0 && (
                <div className="card error">
                    <p>{errors.name}</p>
                </div>
            )}

            <label htmlFor="description">Project Description</label>
            <textarea name="description" placeholder="enter description" value={project.description} onChange={handleChange}></textarea>
            {errors.description.length > 0 && (
                <div className="card error">
                    <p>{errors.description}</p>
                </div>
            )}

            <label htmlFor="budget">Project Budget</label>
            <input type="number" name="budget" placeholder="enter budget" value={project.budget} onChange={handleChange}/>
            {errors.budget.length > 0 && (
                <div className="card error">
                    <p>{errors.budget}</p>
                </div>
            )}

            <label htmlFor="isActive">Active ?</label>
            <input type="checkbox" name="isActive" checked={project.isActive} onChange={handleChange}/>

            <div className="input-group">
                <button className="primary bordered medium" onClick={handleSubmit}>Save</button>
                <span/>
                <button type="button" className="bordered medium" onClick={onCancel}>cancel</button>
            </div>
        </form>
    );
}