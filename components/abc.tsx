import { OptionId } from "../lib/questions-client-logic";

interface ABCProps {
  optionId: OptionId;
}

export function ABC ( props: ABCProps ) {

  const { optionId } = props;

  const map: [ OptionId, string ][] = [
    [ "option1", "A" ],
    [ "option2", "B" ],
    [ "option3", "C" ],
  ];

  const match = map
    .find( pair => pair[ 0 ] === optionId );

  const displayValue = match?.[ 1 ] || "";

  return (
    <span>
      {displayValue}
    </span>
  )

}