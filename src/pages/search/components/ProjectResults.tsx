import CardList from "../../../shared/common-ui/Card";

const ProjectResults = ({ searchResults }: any) => {
    const projects = searchResults?.projects;

    if (projects?.length === 0) {
        return <span>no results found</span>;
    }

    return (
        <>
            {searchResults?.projects?.map((project: any) => (
                <div key={project.projectId}>
                    <CardList item={project}></CardList>
                </div>
            ))}
        </>
    );
};

export default ProjectResults;