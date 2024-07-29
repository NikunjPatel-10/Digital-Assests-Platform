import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader
} from "@nextui-org/react";
import { ReactNode, useState } from "react";

const RightModal = ({
  onClose,
  isOpen,
  headerTitle,
  width = "w-[400px]",
  children,
}: {
  onClose: any;
  isOpen: boolean;
  headerTitle: string;
  width: string;
  isShowHeader?: boolean;
  children: ReactNode;
}) => {
  const openFromRight = {
    variants: {
      enter: {
        x: 0,
        opacity: 1,
        transition: {
          duration: 0.3,
          ease: "easeOut",
        },
      },
      exit: {
        x: 20,
        opacity: 0,
        transition: {
          duration: 0.2,
          ease: "easeIn",
        },
      },
    },
  };

  const [widthofModal,] = useState(width);

  return (
    <Modal
      size={"full"}
      isOpen={isOpen}
      onClose={onClose}
      backdrop={"blur"}
      scrollBehavior={"inside"}
      className={"right-0 fixed m-0 max-h-full " + widthofModal}
      motionProps={openFromRight}
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="px-7 flex flex-col gap-1 text-3xl font-bold">
              {headerTitle}
            </ModalHeader>
            <ModalBody className="px-7 h-full">{children}</ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default RightModal;
