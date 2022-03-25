import { Checkbox } from '@mantine/core';

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

  const border = (() => {
    if (selected && !wrong) return 'teal-border';

    if (wrong) return 'red-border';

    return 'grey-border';
  })();

  return (
    <div
      role="button"
      onClick={onClick}
      onKeyPress={onClick}
      className={`flex flex-row justify-start items-center p-4 ${border} ${
        disabled ? '' : 'hover:cursor-pointer'
      }`}
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
