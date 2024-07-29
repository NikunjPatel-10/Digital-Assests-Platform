import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { Button, Input, Spinner, Tooltip, useDisclosure } from '@nextui-org/react';
import { useEffect, useRef, useState } from 'react';
import { InView } from 'react-intersection-observer';
import { useDispatch, useSelector } from 'react-redux';
import { onChangeProjectsPerPage, selectCurrentPage, selectProjectsPerPage } from '../../../core/store/projectPageSlice';
import ProjectListTooltipConstant from '../utility/constants/tooltip.constant';
import { IProject, ProjectId } from '../utility/models/projectList.model';
import { useDeleteProjectMutation, useGetProjectListQuery } from '../utility/services/projectList.service';
import AddNewProjectModal from "./AddNewProjectModal";
import ProjectListCard from './ProjectListCard';
import ProjectListHeader from './ProjectListHeader';
import RestoreModal from "../../../shared/common-ui/modal/RestoreModal";
import { AnimatePresence } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import { useDebounce } from "../../../shared/hooks/useDebounce";

const Projects = () => {
    // States
    const [projectList, setProjectList] = useState<IProject[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [sort,] = useState("");
    const [, setScrollPosition] = useState<number>(0);
    const [deletedProjects, setDeletedProjects] = useState<IProject[]>([]);
    const [restoreToast, setRestoreToast] = useState<ProjectId[]>([]);
    const timerRefs = useRef<Map<number, NodeJS.Timeout>>(new Map());
    const debouncedSearchQuery = useDebounce(searchQuery, 500);
    // Redux Store
    const dispatch = useDispatch();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const currentPage = useSelector(selectCurrentPage);
    const projectsPerPage = useSelector(selectProjectsPerPage);
    const isEndOfProjects = projectList.length === projectsPerPage;
    const [deleteProject] = useDeleteProjectMutation();

    //** Fetch Project Data */
    const { data: projects, isLoading } = useGetProjectListQuery({
        page: currentPage,
        perPage: projectsPerPage,
        searchQuery: debouncedSearchQuery,
        sort
    });

    useEffect(() => {
        if (projects) {
            setProjectList(projects.projects);
        }
    }, [projects]);

    //** Filter Projects */
    const filteredProjects = projectList.filter(project => {
        return project.projectName.toLowerCase().includes(searchQuery.toLowerCase());
    });

    //** Handle infinite scroll */
    const handleInView = (inView: boolean) => {
        if (inView) {
            setTimeout(() => {
                const newProjectsPerPage = projectsPerPage + 5;
                dispatch(onChangeProjectsPerPage(newProjectsPerPage));
                const scrollPosition = window.scrollY;
                setScrollPosition(scrollPosition);
            }, 2000);
        }
    };

    //** Delete Projects by id */
    const handleDelete = async (project: IProject) => {
        // Add to restore toast and hide project immediately
        setRestoreToast((prevToasts) => [...prevToasts, { projectId: project.projectId, projectName: project.projectName }]);
        setProjectList((prevList) => prevList.filter(p => p.projectId !== project.projectId));
        setDeletedProjects((prevDeleted) => [...prevDeleted, project]);

        const timerId = setTimeout(async () => {
            try {
                await deleteProject({ projectId: project.projectId }).unwrap();
                setRestoreToast((prevToasts) => prevToasts.filter(toast => toast.projectId !== project.projectId));
                timerRefs.current.delete(project.projectId);
            } catch (error) {
                toast.error('Failed to delete project:');
                handleRestore(project.projectId);
            }
        }, 3000);

        timerRefs.current.set(project.projectId, timerId);
    };

    //** Restore Project */
    const handleRestore = (projectId: number) => {
        const project = deletedProjects.find(p => p.projectId === projectId);
        if (project) {
            setProjectList((prevList) => [...prevList, project]);
            setDeletedProjects((prevDeleted) => prevDeleted.filter(p => p.projectId !== projectId));
        }
        if (timerRefs.current.has(projectId)) {
            clearTimeout(timerRefs.current.get(projectId)!);
            timerRefs.current.delete(projectId);
        }
        setRestoreToast((prevToasts) => prevToasts.filter(toast => toast.projectId !== projectId));
    };

    return (
        <>
            <ToastContainer />
            <div className="relative">
                {/* Start : Input Project Search */}
                <div className="flex">
                    <Input
                        type="search"
                        placeholder="Search"
                        size="lg"
                        radius="md"
                        value={searchQuery}
                        startContent={<MagnifyingGlassIcon height={30} width={30} fill="#636363" />}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        classNames={{ mainWrapper: 'flex items-center' }}
                    />
                </div>
                {/* End : Input Project Search */}
                {/* Start : Project Header */}
                <div className="flex">
                    <ProjectListHeader totalCount={projectList?.length} isLoading={!projectList} />
                </div>
                {/* End : Project Header */}
                {/* Start : Project List */}
                {isLoading ? (
                    <div className="flex justify-center items-center h-full">
                        <Spinner />
                    </div>
                ) : (
                    <div className="m-auto grid max-w-7xl grid-cols-1 gap-5 mt-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
                        {/* Start : Add New Project Action Button */}
                        <Tooltip color="primary" content={ProjectListTooltipConstant.AddNewProject} offset={-35}>
                            <Button
                                onClick={onOpen}
                                className="max-w-[400px] h-[192px] cursor-pointer p-4 flex flex-col items-center justify-center sm:h-full mx-auto w-full"
                                variant="flat"
                                color="primary"
                            >
                                <span className="text-7xl">+</span>
                                {projectList && projectList.length === 0 && (
                                    <span className="text-lg mb-4 text-gray-400">No Projects.<br />Add New Project</span>
                                )}
                            </Button>
                        </Tooltip>
                        {/* End : Add New Project Action Button */}
                        {/* Start : Project List Cards */}
                        {filteredProjects.length > 0 ? (
                            <AnimatePresence>
                                {filteredProjects?.map((item) => (
                                    <ProjectListCard key={item.projectId} project={item} handleDelete={handleDelete} />
                                ))}
                            </AnimatePresence>
                        ) : (
                            <div className="text-center mt-10">No projects found.</div>
                        )}
                        {/* End : Project List Cards */}
                    </div>
                )}
                {/* End : Project List */}
                {/* Start : Loader */}
                {isEndOfProjects && (
                    <InView as="div" onChange={handleInView} className="flex justify-center w-full p-16">
                        <Spinner />
                    </InView>
                )}
                {/* End : Loader */}
                {/* Start : Add New Project Modal */}
                <AddNewProjectModal isOpen={isOpen} onClose={onClose} />
                {/* End : Add New Project Modal */}
                {restoreToast.map((toast) => (
                    <RestoreModal
                        key={toast.projectId}
                        isToasterOpen={true}
                        projectName={toast.projectName}
                        onRestore={() => handleRestore(toast.projectId)}
                    />
                ))}
            </div>
        </>
    );
};

export default Projects;
