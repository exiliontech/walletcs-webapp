import React from 'react';
import ToolTipsWCS from "../ToolTipsWCS";
import QuestionIcon from "./QuestionIcon";

const QuestionMarkButton = (props) => {
  const { onClick } = props;

  return (
      <ToolTipsWCS {...props}>
        <QuestionIcon onClick={onClick}/>
      </ToolTipsWCS>);
};

export default QuestionMarkButton;
