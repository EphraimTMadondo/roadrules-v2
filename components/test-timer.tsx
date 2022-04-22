import { useEffect, useState } from 'react';
import { pad } from '../lib/strings';
import { CRUNCH_TIME, TEST_DURATION } from '../lib/tests';

interface Props {
  onTimerRunOut: () => void;
}

const redBorder = 'border border-solid rounded border-red-600';
const greenBorder = 'border border-solid rounded border-green-600';

export function TestTimer(props: Props) {
  const { onTimerRunOut } = props;

  const [msLeft, setMsLeft] = useState(TEST_DURATION);

  useEffect(() => {
    let timer: any;

    if (msLeft === 0) {
      onTimerRunOut();
    } else {
      timer = setTimeout(() => {
        setMsLeft((prevState) => prevState - 100);
      }, 100);
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return () => clearTimeout(timer);
  }, [onTimerRunOut, msLeft]);

  const secondsLeft = Math.floor(msLeft / 1000);
  const minutesLeft = Math.floor(secondsLeft / 60);

  const minutesString = pad(minutesLeft.toString(), 2, '0');
  const secondsString = pad((secondsLeft % 60).toString(), 2, '0');
  const msString = pad(Math.floor((msLeft % 1000) / 10).toString(), 2, '0');

  const crunchTime = msLeft < CRUNCH_TIME;

  const [border, bgColor] = crunchTime
    ? [redBorder, 'bg-red-600']
    : [greenBorder, 'bg-green-600'];

  return (
    <div className="flex flex-col justify-center items-stretch p-2">
      <div
        className={`flex flex-col justify-center items-end px-2 ${bgColor} ${border}`}
      >
        <span
          className="text-white font-semibold"
          style={{ fontVariantNumeric: 'tabular-nums' }}
        >
          {minutesString}:{secondsString}:{msString}
        </span>
      </div>
    </div>
  );
}
