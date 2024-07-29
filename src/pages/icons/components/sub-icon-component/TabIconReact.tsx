import { Snippet } from '@nextui-org/react';
import { toPascalCase } from '../../utility/functions/pascalCase';

const TabIconReact = ({ iconName }: { iconName: string; }) => {
  return (
    <Snippet className="bg-transparent" symbol="">
      <span>
        {" "}
        {`import { ${toPascalCase(
          iconName
        )} } from 'icons-react';`}
      </span>
      <span> {`const App = () => {`}</span>
      <span>
        {" "}
        {`return (<${toPascalCase(iconName)} />);`}
      </span>
      <span> {`}`}</span>
      <span> {`export default App;`}</span>
    </Snippet>
  );
};

export default TabIconReact;
