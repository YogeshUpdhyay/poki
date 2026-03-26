import { useParams, Navigate } from 'react-router-dom';
import { getProjectBySlug } from '../../data/projectsData';
import Website from '../website/Website';
import Project from '../project/Project';

/**
 * Wrapper for /work/:slug routes.
 * Resolves the slug → project data → renders the correct template.
 */
const ProjectDetail = () => {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);

  // Unknown slug → redirect to /work
  if (!project) {
    return <Navigate to="/work" replace />;
  }

  // Render the correct template with the project data
  if (project.template === 'website') {
    return <Website project={project} />;
  }

  return <Project project={project} />;
};

export default ProjectDetail;
