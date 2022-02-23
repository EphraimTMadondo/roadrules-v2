import { Checkbox } from "@mantine/core";

interface SelectOptionProps {
  id: string;
  content: string;
  selected: boolean;
  onClick: () => void;
}

export function SelectOption ( props: SelectOptionProps ) {

  const { id, content, selected, onClick } = props;

  return (
    <div
      onClick={onClick}
      className={
        "flex flex-row justify-start items-center rounded p-4 border border-solid hover:cursor-pointer" +
        ( selected ? " border-teal-600" : " border-slate-300" )
      }
    >
      <span className="text-md font-semi-bold pr-2">
        {id}. {content}
      </span>
      <span className="grow"></span>
      <Checkbox checked={selected} readOnly/>
    </div>
  )

}