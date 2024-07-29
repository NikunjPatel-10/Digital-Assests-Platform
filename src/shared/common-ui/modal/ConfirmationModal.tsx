import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader
} from "@nextui-org/react";
import { ReactNode } from "react";


const ConfirmationModal = ({
    children,
    action,
    onClose,
    isOpen,
    onDelete
}: {
    children: ReactNode;
    action: string;
    onClose: any;
    isOpen: any;
    onDelete: any;
}) => {
    return (
        <Modal backdrop={'blur'} isOpen={isOpen} onClose={onClose}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">{`Confirm action ${action.toUpperCase()}`}</ModalHeader>
                        <ModalBody>
                            <span>{children}</span>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={onClose}>
                                Close
                            </Button>
                            <Button color="primary" onPress={onDelete}>
                                Delete
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default ConfirmationModal;