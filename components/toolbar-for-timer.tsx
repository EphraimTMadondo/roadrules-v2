import * as React from 'react';
import { UpgradeBar } from './upgrade-bar';

interface ToolbarProps {
  RightElement: JSX.Element;
  paid: boolean;
}

export function ToolbarForTimer(props: ToolbarProps) {
  const { RightElement, paid } = props;

  return (
    <div className="flex flex-row justify-center items-center bg-slate-50/50 border rounded border-slate-50">
      {!paid && (
        <>
          <div style={{ visibility: 'hidden' }}>
            <UpgradeBar />
          </div>
          <div className="grow" />
        </>
      )}
      <div className="flex flex-col justify-center items-stretch">
        {RightElement}
      </div>
      {!paid && (
        <>
          <div className="grow" />
          <UpgradeBar />
        </>
      )}
    </div>
  );
}
