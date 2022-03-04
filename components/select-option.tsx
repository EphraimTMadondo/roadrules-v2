import { Checkbox } from "@mantine/core";
import { grey_border, red_border, teal_border } from "../lib/tailwind-utils";

interface SelectOptionProps {
  id: string;
  content: string;
  selected: boolean;
  onClick?: () => void;
  wrong?: boolean;
  disabled?: boolean;
}

export function SelectOption ( props: SelectOptionProps ) {

  const { id, content, selected } = props;
  const { onClick, disabled, wrong } = props;

  const borderMap: [ boolean | undefined, string ][] = [
    [ selected && !wrong, teal_border ],
    [ wrong, red_border ],
    [ !selected && !wrong, grey_border ],
  ];

  const border = borderMap
    .find( el => el[ 0 ] )?.[ 1 ];

  const hoverClass = disabled ?
    "" :
    " hover:cursor-pointer";

  const className = `flex flex-row justify-start items-center ${ border }${ hoverClass }`;

  return (
    <>
      {
        border &&
        <div onClick={onClick} className={className}>
          <span className="text-md font-semi-bold pr-2">
            {id}. {content}
          </span>
          <span className="grow"></span>
          <Checkbox
            checked={selected}
            disabled={disabled}
            readOnly
          />
        </div>
      }
    </>
  )

}