import { TrashIcon } from "@heroicons/react/16/solid";
import { Card, Chip } from "@nextui-org/react";
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { addCurrentIconDetails } from "../../../../core/store/iconListData";
import RestoreModal from "../../../../shared/common-ui/modal/RestoreModal";
import { useDeleteIconMutation } from "../../utility/services/iconsListById.service";
import { baseUrl } from "../../../../environments/environment";
import { CardMotion, CardInfoMotion } from "../../utility/constants/iconCardAnimation.constant";


const IconCard = ({ iconsData, onOpen }: any) => {
  const dispatch = useDispatch();
  const [deleteIcon] = useDeleteIconMutation();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [deletedIcons, setDeletedIcons] = useState<any[]>([]);
  const [restoreToast, setRestoreToast] = useState<any[]>([]);
  const timerRefs = useRef<Map<number, NodeJS.Timeout>>(new Map());
  const [localIconsData, setLocalIconsData] = useState(iconsData);

  useEffect(() => {
    setLocalIconsData(iconsData);
  }, [iconsData]);

  const openIconDetailModal = (item: any) => {
    dispatch(addCurrentIconDetails(item));
    onOpen();
  };

  const handleDeleteIcon = (item: any) => {
    const iconId = item.iconId;
    const iconName = item.iconName;

    setRestoreToast((prevToasts) => [...prevToasts, { iconId, iconName }]);
    setDeletedIcons((prevDeleted) => [...prevDeleted, item]);
    setLocalIconsData((prevData: any) => ({
      ...prevData,
      data: {
        ...prevData.data,
        result: {
          ...prevData.data.result,
          icons: prevData.data.result.icons.filter((icon: any) => icon.iconId !== iconId)
        }
      }
    }));

    const timerId = setTimeout(async () => {
      try {
        await deleteIcon({ iconId }).unwrap();
        setRestoreToast((prevToasts) => prevToasts.filter(toast => toast.iconId !== iconId));
        timerRefs.current.delete(iconId);
      } catch (error) {
        console.error('Failed to delete icon:', error);
        handleRestore(iconId);
      }
    }, 3000);

    timerRefs.current.set(iconId, timerId);
  };

  const handleRestore = (iconId: number) => {
    const icon = deletedIcons.find(p => p.iconId === iconId);
    if (icon) {
      setDeletedIcons((prevDeleted) => prevDeleted.filter(p => p.iconId !== iconId));
      setLocalIconsData((prevData: any) => ({
        ...prevData,
        data: {
          ...prevData.data,
          result: {
            ...prevData.data.result,
            icons: [...prevData.data.result.icons, icon]
          }
        }
      }));
    }
    if (timerRefs.current.has(iconId)) {
      clearTimeout(timerRefs.current.get(iconId)!);
      timerRefs.current.delete(iconId);
    }
    setRestoreToast((prevToasts) => prevToasts.filter(toast => toast.iconId !== iconId));
  };


  return (
    <>
      <AnimatePresence>
        {localIconsData?.data?.result?.icons?.map((item: any, index: number) => (
          <motion.div
            key={item.iconId}
            variants={CardMotion}
            initial="initial"
            animate="animate"
            exit="exit"
            className="relative group cursor-pointer"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => openIconDetailModal(item)}
          >
            <Card
              className="p-0 flex items-center justify-center h-[92px] w-[92px] hover:bg-blue-100/[.9] group overflow-hidden shadow-md hover:shadow-none"
            >
              <img
                className="h-[40px] group-hover:h-[54px] transition-all duration-300 ease-in-out rounded-none"
                height={100}
                width={100}
                src={`${baseUrl}/${item?.iconImages[0]?.iconImagePath}`}
                alt={`Image of ${item?.iconImages[0]?.iconName} icon`}
              />
            </Card>
            <AnimatePresence>
              {hoveredIndex === index && (
                <motion.div
                  className="absolute bottom-2 flex justify-center w-full z-10 p-2"
                  variants={CardInfoMotion}
                  initial="rest"
                  animate="hover"
                  exit="exit"
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.8 }}
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                  >
                    <Chip
                      color="primary"
                      onClick={() => openIconDetailModal(item)}
                    >
                      {item?.iconName}
                    </Chip>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.8 }}
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                  >
                    <Chip
                      variant="faded"
                      className="ms-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteIcon(item);
                      }}
                    >
                      <TrashIcon className="text-danger" height={18} />
                    </Chip>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </AnimatePresence>
      {restoreToast.map((toast) => (
        <RestoreModal
          key={toast.iconId}
          isToasterOpen={true}
          projectName={toast.iconName}
          onRestore={() => handleRestore(toast.iconId)}
        />
      ))}
    </>
  );
};

export default IconCard;
