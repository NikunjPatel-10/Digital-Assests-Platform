import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { Skeleton } from "@nextui-org/react";
import { Link } from "react-router-dom";

const PageHeader = ({ title, url }: { title: string; url: string; }) => {
  return (
    <header className="flex items-center ">
      <Link to={url} className="p-1 hover:bg-slate-200 dark:hover:bg-slate-900 rounded">
        <ArrowLeftIcon className="h-7 " />
      </Link>
      {title ? (
        <h2 className="text-2xl ms-2 font-medium">{title}</h2>
      ) : (
        <Skeleton className="p-2 w-[150px]"></Skeleton>
      )}
    </header>
  );
};

export default PageHeader;
