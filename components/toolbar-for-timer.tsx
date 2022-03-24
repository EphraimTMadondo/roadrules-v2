import * as React from 'react';

interface ToolbarProps {
  title: string;
  RightElement: (props: any) => JSX.Element;
}

export function ToolbarForTimer(props: ToolbarProps) {
  const { title } = props;
  const { RightElement } = props;

  return (
    <div className="flex flex-row justify-start items-center bg-slate-50/50 border rounded border-slate-50">
      <div className="flex flex-col justify-start items-center invisible">
        <RightElement />
      </div>
      <div className="grow" />
      <span className="text-lg text-center font-semibold">{title}</span>
      <div className="grow" />
      {/* <div className="flex flex-col justify-center items-center">
        <span className="text-lg text-center font-semibold">{title}</span>
      </div> */}
      <div className="flex flex-col justify-center items-stretch">
        <RightElement />
      </div>
    </div>
  );
}
