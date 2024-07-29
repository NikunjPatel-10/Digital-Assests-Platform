import { TrashIcon } from "@heroicons/react/16/solid";
import { Card, CardBody, CardHeader, Chip, Image } from "@nextui-org/react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import { baseUrl } from "../../environments/environment";

const CardList = ({ item, onOpen }: any) => {
  const { projectName, projectLogo, projectImagePath, projectId } = item;
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleOpen = () => {
    onOpen();
  };

  const cardMotion = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
    hover: { scale: 1.05, transition: { duration: 0.3 } }
  };

  const cardInfoMotion = {
    rest: {
      opacity: 0,
      y: 0,
      transition: {
        duration: 0.2,
        type: "tween",
        ease: "easeOut"
      },
    },
    hover: {
      opacity: 1,
      y: 5,
      transition: {
        duration: 0.2,
        type: "tween",
        ease: "easeOut"
      },
    },
    exit: {
      opacity: 0,
      y: 0,
      transition: {
        duration: 0.1,
        type: "tween",
        ease: "easeOut"
      },
    }
  };




  return (
    <>
      <AnimatePresence>
        <motion.div
          key={projectId}
          variants={cardMotion}
          initial="initial"
          animate="animate"
          exit="exit"
          whileHover="hover"
          className="relative group cursor-pointer"
          onMouseEnter={() => setHoveredIndex(projectId)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <Card className="w-full cursor-pointer p-4">
            {/* Start : Card Header */}
            <CardHeader className="flex p-0 relative">
              <span className="text-md">{projectName}</span>
            </CardHeader>
            {/* End : Card Header */}
            {/* Start : Card Body */}
            <Link to={`/projects/${projectId}`}>
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
                        src={`${baseUrl}/${projectImagePath}`}
                        alt={`This is an image of ${projectName}`}
                      />
                      {/* End : Project Logo */}
                    </>
                  ) : (
                    <span>No logo available</span>
                  )}
                </div>
              </CardBody>
            </Link>
            {/* End : Card Body */}
          </Card>
          <AnimatePresence>
            {hoveredIndex === projectId && (
              <motion.div
                className="absolute top-0 right-2 z-50 p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                variants={cardInfoMotion}
                initial="rest"
                animate="hover"
                exit="exit"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
              >
                <Chip
                  size="sm"
                  variant="light"
                  color="danger"
                  className="p-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpen();
                  }}
                >
                  <TrashIcon className="text-danger" height={20} />
                </Chip>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default CardList;
