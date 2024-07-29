
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { closeIconsDetailModal } from "../../../../core/store/slice";
import IconCard from "./IconCard";
import { Modal, ModalBody, ModalContent, useDisclosure } from "@nextui-org/react";
import IconDetail from "./IconsDetailModal";


const IconListWrapper = ({ iconListData }: any) => {
  // Redux Dispatch
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();

  //** Effect to close icon detail modal when unmounting */
  useEffect(() => {
    return () => {
      dispatch(closeIconsDetailModal());
    };
  }, [dispatch]);

  return (
    <>
      {/* Start : Flag for no data */}
      {iconListData &&
        iconListData?.data?.result?.icons?.length == 0 && (
          <div>
            <span className="text-lg  my-4 text-gray-400">
              No Icons present
            </span>
          </div>
        )}
      {/* End : Flag for no data */}
      {/* Start : Icon Card */}
      <IconCard onOpen={onOpen} iconsData={iconListData}></IconCard>
      {/* End : Icon Card */}
      <Modal
        backdrop='blur'
        size='5xl'
        isOpen={isOpen}
        onClose={onClose}
        classNames={{ closeButton: 'hidden' }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>
                <IconDetail onClose={onClose}></IconDetail>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default IconListWrapper;