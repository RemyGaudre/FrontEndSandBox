import React from 'react';
import {Project} from './Project';
import {Link} from 'react-router-dom';

interface ProjectCardProp{
    project: Project;
    onEdit: (project: Project) => void;
}

function formatDescription(description: string): string{
    return description.substring(0,60) + '...';
}

export default function ProjectCard(props : ProjectCardProp){

    const {project, onEdit} = props;

    const handleEditClick = (projectBeingEdited: Project) => {
        onEdit(projectBeingEdited);
    };

    return (
        <div className="card">
            <img src={project.imageUrl} alt={project.name}/>
            <section className="section dark">
                <Link to={'/projects/'+project.id}>
                <h5 className="strong">
                <strong>{project.name}</strong>
                </h5>
                <p>{formatDescription(project.description)}</p>
                <p>Budget : {project.budget.toLocaleString()}</p>
                </Link>
                <button className="bordered" onClick={()=>handleEditClick(project)}>
                    <span className="icon-edit"></span>
                    Edit
                </button>
            </section>
        </div>
    );
}