import * as React from 'react';

// interface UpgradeBarProps {}

export function UpgradeBar() {
  return (
    <div className="flex flex-col p-2">
      <div className="flex flex-col px-2 bg-green-600 rounded">
        <span className="text-white font-semibold">UPGRADE</span>
      </div>
    </div>
  );
}
