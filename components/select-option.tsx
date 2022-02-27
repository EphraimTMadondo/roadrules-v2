import { Checkbox } from "@mantine/core";

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

  return (
    <>
      {
        selected && !wrong &&
        <SelectedContainer onClick={onClick}>
          <span className="text-md font-semi-bold pr-2">
            {id}. {content}
          </span>
          <span className="grow"></span>
          <Checkbox
            checked={selected}
            disabled={disabled}
            readOnly
          />
        </SelectedContainer>
      }
      {
        wrong &&
        <WrongContainer onClick={onClick}>
          <span className="text-md font-semi-bold pr-2">
            {id}. {content}
          </span>
          <span className="grow"></span>
          <Checkbox
            checked={selected}
            disabled={disabled}
            readOnly
          />
        </WrongContainer>
      }
      {
        !selected && !wrong &&
        <NormalContainer onClick={onClick}>
          <span className="text-md font-semi-bold pr-2">
            {id}. {content}
          </span>
          <span className="grow"></span>
          <Checkbox
            checked={selected}
            disabled={disabled}
            readOnly
          />
        </NormalContainer>
      }
    </>
  )

}

interface ContainerProps {
  children: any;
  onClick?: () => void;
}

function NormalContainer ( props: ContainerProps ) {

  const { children, onClick } = props;

  return (
    <div
      onClick={onClick}
      className="flex flex-row justify-start items-center rounded p-4 border border-solid border-slate-300 hover:cursor-pointer"
    >
      {children}
    </div>
  )

}

function WrongContainer ( props: ContainerProps ) {

  const { children, onClick } = props;

  return (
    <div
      onClick={onClick}
      className="flex flex-row justify-start items-center rounded p-4 border border-solid border-red-600 hover:cursor-pointer"
    >
      {children}
    </div>
  )

}

function SelectedContainer ( props: ContainerProps ) {

  const { children, onClick } = props;

  return (
    <div
      onClick={onClick}
      className="flex flex-row justify-start items-center rounded p-4 border border-solid border-teal-600 hover:cursor-pointer"
    >
      {children}
    </div>
  )

}