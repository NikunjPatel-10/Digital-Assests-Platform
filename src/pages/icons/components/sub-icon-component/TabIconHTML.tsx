import { Snippet } from '@nextui-org/react';

const TabIconHTML = ({ iconName }: { iconName: string; }) => {

  return (
    <Snippet className="bg-transparent" symbol="">
      <span className="w-full flex">
        {`<span class="${iconName}"></span>`}
      </span>
    </Snippet>
  );
};

export default TabIconHTML;
