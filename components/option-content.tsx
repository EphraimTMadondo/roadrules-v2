import { OptionId } from "../lib/questions-client-logic";

interface OptionContentProps {
  optionId: OptionId;
  question: ThreeOptioned;
}

interface ThreeOptioned {
  option1: string;
  option2: string;
  option3: string;
}

export function OptionContent ( props: OptionContentProps ) {

  const { optionId, question } = props;

  const map: [ OptionId, string ][] = [
    [ "option1", question.option1, ],
    [ "option2", question.option2, ],
    [ "option3", question.option3, ]
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