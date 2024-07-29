import { Skeleton } from '@nextui-org/react';

const SkeletonIconList = () => {
  const skeletons = Array.from({ length: 15 });

  return (
    <>
      {skeletons.map((_, index) => (
        <Skeleton key={index} className="p-4 rounded-xl h-[100px] w-[100px]" />
      ))}
    </>
  );
};

export default SkeletonIconList;