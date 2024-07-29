
export const CardMotion = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
};

export const CardInfoMotion = {
    rest: {
        opacity: 0,
        y: 30,
        transition: {
            duration: 0.2,
            type: "tween",
            ease: "easeOut"
        },
    },
    hover: {
        opacity: 1,
        y: 55,
        transition: {
            duration: 0.2,
            type: "tween",
            ease: "easeOut"
        },
    },
    exit: {
        opacity: 0,
        y: 30,
        transition: {
            duration: 0.1,
            type: "tween",
            ease: "easeOut"
        },
    }
};