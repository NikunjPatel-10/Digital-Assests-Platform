import { Tab, Tabs } from "@nextui-org/react";
import { useState } from "react";
import TabIconAngular from "./TabIconAngular";
import TabIconHTML from "./TabIconHTML";
import TabIconReact from "./TabIconReact";
import TabIconVue from "./TabIconVue";

const TabsTechnology = ({ iconDetails }: { iconDetails: any; }) => {
  const [selected, setSelected] = useState("html");
  const handleSelect = (key: any) => {
    setSelected(key);
  };
  return (
    <Tabs
      aria-label="Options"
      color="primary"
      variant="underlined"
      classNames={{
        panel: "bg-gray-100 dark:bg-gray-950 rounded-b-lg",
        base: "bg-gray-100 dark:bg-gray-950 w-full rounded-t-lg",
        tabList:
          "gap-6 w-full relative rounded-none p-0 border-b border-divider",
        cursor: "w-full bg-primary",
        tab: "max-w-fit px-0 h-12 ",
        tabContent: "group-data-[selected=true]:text-primary",
      }}
      className="p-3"
      selectedKey={selected}
      onSelectionChange={(key) => handleSelect(key)}
    >
      <Tab key="html" title="HTML">
        <TabIconHTML iconName={iconDetails?.iconName}></TabIconHTML>
      </Tab>
      <Tab key="react" title="React">
        <TabIconReact iconName={iconDetails?.iconName}></TabIconReact>
      </Tab>
      <Tab key="vue" title="Vue">
        <TabIconVue iconName={iconDetails?.iconName}></TabIconVue>
      </Tab>
      <Tab key="angular" title="Angular">
        <TabIconAngular iconName={iconDetails?.iconName}></TabIconAngular>
      </Tab>
    </Tabs>
  );
};

export default TabsTechnology;
