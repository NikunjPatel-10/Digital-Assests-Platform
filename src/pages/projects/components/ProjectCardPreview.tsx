import { Card, CardBody, CardHeader, Image } from "@nextui-org/react";
import { ProjectFormConstants } from "../utility/constants/createProject.constant";

interface IProps {
    projectName: string,
    projectLogo: File,
}

const ProjectCardPreview = ({ projectName, projectLogo }: IProps) => {
    const renderImage = () => {
        if (projectLogo instanceof File) {
            return URL.createObjectURL(projectLogo);
        }
        return projectLogo;
    };

    return (
        <Card className="w-full cursor-pointer p-4">
            {/* Start : Card Header */}
            <CardHeader className="flex p-0 relative">
                <span className="text-md">{projectName}</span>
            </CardHeader>
            {/* End : Card Header */}
            {/* Start : Card Body */}
            <CardBody className="p-0 mt-4 border-0 overflow-hidden">
                <div className="flex items-center justify-center h-[120px]">
                    {projectLogo ? (
                        <>
                            {/* Start : Project Logo */}
                            <Image
                                height={100}
                                width={100}
                                className="object-cover"
                                radius="lg"
                                src={renderImage()}
                                alt={`This is an image of ${projectName}`}
                            />
                            {/* End : Project Logo */}
                        </>
                    ) : (
                        <span>{ProjectFormConstants.SELECT_LOGO}</span>
                    )}
                </div>
            </CardBody>
            {/* End : Card Body */}
        </Card>
    );
};

export default ProjectCardPreview;