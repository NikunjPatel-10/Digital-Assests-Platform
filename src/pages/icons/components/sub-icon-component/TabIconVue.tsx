import { Snippet } from "@nextui-org/react";
import { toPascalCase } from "../../utility/functions/pascalCase";

const TabIconVue = ({ iconName }: { iconName: string; }) => {
  return (
    <Snippet className="bg-transparent" symbol="">
      <span> {`<script setup>`}</span>
      <span>
        {" "}
        &nbsp;
        {`import { ${toPascalCase(
          iconName
        )} } from 'icons-react';`}
      </span>
      <span> &nbsp;{``}</span>
      <span> {`</script>`}</span>
      <span> {`<template>`}</span>
      <span>&nbsp;{`<${toPascalCase(iconName)} />`}</span>
      <span> {`</template>`}</span>
    </Snippet>
  );
};

export default TabIconVue;
