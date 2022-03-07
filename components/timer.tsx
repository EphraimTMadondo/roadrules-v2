import { pad } from '../lib/strings';
import { redBorder, tealBorder } from '../lib/tailwind-utils';

interface Props {
  secondsLeft: number;
  crunchTime: boolean;
}

export function Timer(props: Props) {
  const { secondsLeft, crunchTime } = props;

  const minutesValue = Math.floor(secondsLeft / 60);

  const minutes = pad(minutesValue.toString(), 2, '0');
  const seconds = pad((secondsLeft % 60).toString(), 2, '0');

  const [border, bgColor] = crunchTime
    ? [redBorder, 'bg-teal-600']
    : [tealBorder, 'bg-red-600'];

  return (
    <div className="flex flex-col p-2">
      <div className={`flex flex-col px-2 ${bgColor} ${border}`}>
        <span className="text-white font-semibold">
          {minutes}:{seconds}
        </span>
      </div>
    </div>
  );
}
