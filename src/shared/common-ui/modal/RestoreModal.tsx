import { Button } from "@nextui-org/react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const RestoreModal = ({ isToasterOpen, projectName, onRestore }: any) => {
    const [isRestoring, setIsRestoring] = useState<boolean>(false);

    // Simulate progress with a timer
    useEffect(() => {
        let progressTimer: NodeJS.Timeout;
        if (isToasterOpen) {
            setIsRestoring(true);
            progressTimer = setTimeout(() => {
                setIsRestoring(false);
                onRestore();
            }, 3000);
        } else {
            setIsRestoring(false);
        }

        return () => clearTimeout(progressTimer);
    }, [isToasterOpen, onRestore]);

    const modalMotion = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.2 } },
        exit: { opacity: 0, y: 20, transition: { duration: 0.2 } }
    };

    const buttonVariants = {
        initial: { backgroundPosition: "100% 0%" },
        animate: { backgroundPosition: "0% 0%", transition: { duration: 0.5 } }
    };

    const progressBarMotion = {
        initial: { width: "100%" },
        animate: { width: "0%", transition: { duration: 3, ease: "linear" } }
    };

    return (
        <AnimatePresence>
            {isToasterOpen && (
                <motion.div
                    key="restore-modal"
                    variants={modalMotion}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="absolute bottom-0 right-0 left-0 mx-auto max-h-32 z-20 flex flex-col justify-center items-center"
                    style={{ position: 'fixed', width: 'fit-content', padding: '10px 20px' }}
                >

                    <motion.div
                        className="w-full"
                        initial="initial"
                        animate={isRestoring ? "animate" : "initial"}
                        variants={buttonVariants}
                    >
                        <Button
                            className="w-full"
                            onClick={onRestore}
                            variant="solid"
                            color="primary"
                        >
                            {`Restore ${projectName}`}
                        </Button>
                    </motion.div>
                    <div className="flex flex-col justify-between items-start w-full mt-2">
                        <motion.div
                            className="bg-gray-200 rounded-full h-2 w-full overflow-hidden"
                            initial="initial"
                            animate={isRestoring ? "animate" : "initial"}
                            variants={progressBarMotion}
                        >
                            <motion.div
                                className="bg-primary h-2"
                                initial="initial"
                                variants={progressBarMotion}
                            />
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default RestoreModal;
