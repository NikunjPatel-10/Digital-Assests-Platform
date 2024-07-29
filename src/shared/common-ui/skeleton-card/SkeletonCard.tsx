import { Card, CardBody, CardHeader } from "@nextui-org/react";

const SkeletonCard = () => {
  return (
    <Card className="w-full cursor-pointer p-4 animate-pulse">
      {/* Start : Card Header */}
      <CardHeader className="flex p-0">
        <div className="h-6 w-3/4 bg-gray-300 dark:bg-gray-500 rounded-md"></div>
      </CardHeader>
      {/* End : Card Header */}
      {/* Start : Card Body */}
      <CardBody className="p-0 mt-4 border-0 overflow-hidden">
        <div className="flex items-center justify-center h-[120px]">
          <div className="h-24 w-24 bg-gray-300 dark:bg-gray-500 rounded-lg"></div>
        </div>
      </CardBody>
      {/* End : Card Body */}
    </Card>
  );
};

export default SkeletonCard;
