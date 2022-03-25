import { ActionIcon } from '@mantine/core';
import * as React from 'react';

interface ToolbarProps {
  leftIcon?: string;
  leftIconAction?: () => any;
  title: string;
  rightIcon?: string;
  rightIconAction?: () => any;
  RightElement?: (props: any) => JSX.Element;
}

export function Toolbar(props: ToolbarProps) {
  const { leftIcon, leftIconAction, title } = props;
  const { rightIcon, rightIconAction, RightElement } = props;

  return (
    <div className="flex flex-row justify-start items-center bg-slate-50/50 border rounded border-slate-50">
      {!leftIcon && !RightElement && (
        <ActionIcon
          variant="light"
          color="teal"
          size="xl"
          style={{ visibility: 'hidden' }}
        >
          <i className="material-icons font-semibold">menu</i>
        </ActionIcon>
      )}
      {!leftIcon && RightElement && (
        <div className="flex flex-col justify-start items-center invisible">
          <RightElement />
        </div>
      )}
      {leftIcon && (
        <ActionIcon
          variant="light"
          color="teal"
          onClick={leftIconAction}
          size="xl"
        >
          <i className="material-icons font-semibold">{leftIcon}</i>
        </ActionIcon>
      )}
      <div className="grow" />
      <span className="text-lg text-center font-semibold">{title}</span>
      <div className="grow" />
      {!rightIcon && !RightElement && (
        <ActionIcon
          variant="light"
          color="teal"
          size="xl"
          style={{ visibility: 'hidden' }}
        >
          <i className="material-icons font-semibold">menu</i>
        </ActionIcon>
      )}
      {rightIcon && (
        <ActionIcon
          variant="light"
          color="teal"
          onClick={rightIconAction}
          size="xl"
        >
          <i className="material-icons font-semibold">{rightIcon}</i>
        </ActionIcon>
      )}
      {RightElement && (
        <div
          className="flex flex-col justify-center items-stretch"
          style={{ flex: '0 0 auto', overflow: 'hidden' }}
        >
          <RightElement />
        </div>
      )}
    </div>
  );
}
