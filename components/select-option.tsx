import { Checkbox } from '@mantine/core';
import { greyBorder, redBorder, tealBorder } from '../lib/tailwind-utils';

interface SelectOptionProps {
  id: string;
  content: string;
  selected: boolean;
  onClick?: () => void;
  wrong?: boolean;
  disabled?: boolean;
}

export function SelectOption(props: SelectOptionProps) {
  const { id, content, selected } = props;
  const { onClick, disabled, wrong } = props;

  const borderMap: [boolean | undefined, string][] = [
    [selected && !wrong, tealBorder],
    [wrong, redBorder],
    [!selected && !wrong, greyBorder],
  ];

  const border = borderMap.find((el) => el[0])?.[1] || '';

  const hoverClass = disabled ? '' : ' hover:cursor-pointer';

  const className = `flex flex-row justify-start items-center ${border}${hoverClass}`;

  return (
    <div
      role="button"
      onClick={onClick}
      onKeyPress={onClick}
      className={className}
      aria-hidden="true"
    >
      <span className="text-md font-semi-bold pr-2">
        {id}. {content}
      </span>
      <span className="grow" />
      <Checkbox checked={selected} disabled={disabled} readOnly />
    </div>
  );
}
