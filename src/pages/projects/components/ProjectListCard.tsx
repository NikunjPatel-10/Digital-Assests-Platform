import { useState } from "react";
import { useDisclosure } from "@nextui-org/react";
import CardList from "../../../shared/common-ui/Card";
import ConfirmationModal from "../../../shared/common-ui/modal/ConfirmationModal";
import RestoreModal from "../../../shared/common-ui/modal/RestoreModal";
import { motion, AnimatePresence } from "framer-motion";
import { CardMotion } from "../utility/constants/projectCardAnimation.constant";

function ProjectListCard({ project, handleDelete }: any) {
    const { projectId, projectName } = project;
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isToasterOpen, setIsToasterOpen] = useState<boolean>(false);
    const [deleteTimer, _] = useState<NodeJS.Timeout | null>(null);
    const [isDeleted, setIsDeleted] = useState<boolean>(false);

    const onDelete = () => {
        setIsToasterOpen(true);
        onClose();
        handleDelete(project);
        setIsDeleted(true);
    };

    const onRestore = () => {
        if (deleteTimer) {
            clearTimeout(deleteTimer);
        }
        setIsToasterOpen(false);
        setIsDeleted(false);
    };

    return (
        <AnimatePresence>
            {!isDeleted && (
                <motion.div
                    key={projectId}
                    variants={CardMotion}
                    initial="initial"
                    exit="exit"
                    className="relative group cursor-pointer"
                >
                    <ConfirmationModal
                        onClose={onClose}
                        isOpen={isOpen}
                        action="delete"
                        onDelete={onDelete}
                    >
                        Are you sure you want to delete?
                    </ConfirmationModal>
                    <div className="flex flex-col max-w-[400px] mx-auto">
                        {/* Start : Project Cards */}
                        <CardList item={project} onOpen={onOpen}></CardList>
                        {/* End : Project Cards */}
                    </div>
                    <AnimatePresence>
                        {isToasterOpen && (
                            <RestoreModal
                                isToasterOpen={isToasterOpen}
                                projectName={projectName}
                                onRestore={onRestore}
                            />
                        )}
                    </AnimatePresence>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default ProjectListCard;
