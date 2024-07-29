import { Chip, Skeleton, Tooltip } from '@nextui-org/react';
import ProjectList from '../utility/constants/projectList.constant';
import ProjectListTooltipConstant from '../utility/constants/tooltip.constant';

function ProjectListHeader({ totalCount, isLoading }: { totalCount: any, isLoading: boolean; }) {
  return <>
    <h2 className="font-bold text-3xl flex items-center mt-5 selc">
      {ProjectList.ProjectListTitle}
      <Tooltip content={ProjectListTooltipConstant.TotalProject + (totalCount > 1 ? 's' : "")} color='secondary' >
        <Chip
          className="ms-2 text-medium"
          variant="flat"
          radius="sm"
          color='secondary'
        >
          {isLoading ? (<Skeleton className="p-1"></Skeleton>) : totalCount}
        </Chip>
      </Tooltip>
    </h2>
  </>;
}

export default ProjectListHeader;
