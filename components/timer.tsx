import { pad } from '../lib/strings';

interface Props {
  secondsLeft: number;
  crunchTime: boolean;
}

const redBorder = 'border border-solid rounded border-red-600';
const greenBorder = 'border border-solid rounded border-green-600';

export function Timer(props: Props) {
  const { secondsLeft, crunchTime } = props;

  const minutesValue = Math.floor(secondsLeft / 60);

  const minutes = pad(minutesValue.toString(), 2, '0');
  const seconds = pad((secondsLeft % 60).toString(), 2, '0');

  const [border, bgColor] = crunchTime
    ? [redBorder, 'bg-red-600']
    : [greenBorder, 'bg-green-600'];

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
