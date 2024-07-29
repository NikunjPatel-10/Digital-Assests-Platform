import { Snippet } from "@nextui-org/react";
import { toPascalCase } from "../../utility/functions/pascalCase";

const TabIconAngular = ({ iconName }: { iconName: string; }) => {
  return (
    <Snippet className="bg-transparent" symbol="">
      <span className="text-slate-500"> {` // app.module.ts`}</span>
      <span>
        {" "}
        &nbsp;
        {`import { IconAngularModule, ${toPascalCase(
          iconName
        )} } from 'icon-angular';`}
      </span>
      <span> &nbsp;{`@NgModule({`}</span>
      <span> &nbsp; &nbsp; {` imports: [`}</span>
      <span>
        {" "}
        &nbsp; &nbsp;&nbsp; &nbsp;
        {`IconAngularModule.pick({ ArrowLeftCircle })`}
      </span>
      <span> &nbsp;{`],`}</span>
      <span> {`})`}</span>
      <span> </span>
      <span> </span>
      <span className="text-slate-500"> {`// app.component.html`}</span>
      <span> {`<icon name="${iconName}"></icon>`}</span>
    </Snippet>
  );
};

export default TabIconAngular;
