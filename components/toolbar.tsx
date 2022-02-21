import { ActionIcon, Text } from '@mantine/core';
import * as React from 'react';

interface ToolbarProps {
  leftIcon?: string;
  leftIconAction?: () => any;
  title: string;
  rightIcon?: string;
  rightIconAction?: () => any;
}

export function Toolbar ( props: ToolbarProps ) {

  const { leftIcon, leftIconAction, title, rightIcon, rightIconAction } = props;

  return (
    <div className="flex flex-row justify-start items-center bg-slate-50/50 border rounded border-slate-50">
      {
        !leftIcon &&
        <ActionIcon variant="light" color="teal" size="xl" style={{ visibility: "hidden" }}>
          <i className="material-icons font-semibold">
            menu
          </i>
        </ActionIcon>
      }
      {
        leftIcon &&
        <ActionIcon variant="light" color="teal" onClick={leftIconAction} size="xl">
          <i className="material-icons font-semibold">
            {leftIcon}
          </i>
        </ActionIcon>
      }
      <div className="grow"></div>      
      <span className="text-lg font-semibold">{title}</span>      
      <div className="grow"></div>
      {
        !rightIcon &&
        <ActionIcon variant="light" color="teal" size="xl" style={{ visibility: "hidden" }}>
          <i className="material-icons font-semibold">
            menu
          </i>
        </ActionIcon>
      }
      {
        rightIcon &&
        <ActionIcon variant="light" color="teal" onClick={rightIconAction} size="xl">
          <i className="material-icons font-semibold">
            {rightIcon}
          </i>
        </ActionIcon>
      }
    </div>
  )

}