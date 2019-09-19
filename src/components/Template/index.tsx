import * as React from 'react';

interface TemplateProps {}
const Template: React.FunctionComponent<TemplateProps> = ({ children }) => (
  <>{children}</>
);

export default Template;
