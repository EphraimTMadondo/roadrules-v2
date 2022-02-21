export interface Question {
  refNumber: number;
  text: string;
  image: string;

  option1: string;
  option2: string;
  option3: string;

  correctOption: string;
  correctlyAnswered: number;
  incorrectlyAnswered: number;

  questionTypeId: number;
  explanation: string;
}

export type OptionId = "A" | "B" | "C";

export function getOptionContent ( optionId: OptionId, question: Question ) {

  const map: [ OptionId, string ][] = [
    [ "A", question.option1, ],
    [ "B", question.option2, ],
    [ "C", question.option3, ]
  ];

  const match = map
    .find( pair => pair[ 0 ] === optionId );

  return match?.[ 1 ] || "";

}

export const QUESTIONS: Question[] = [
  {
    refNumber: 1,
    text: "When an oncoming vehicle's lights are on bright beam what do you do?",
    image: "",

    option1: "Put down the sun visor.",
    option2: "Switch on your lights.",
    option3: "Slow down and cast your eyes slightly to the left.",

    correctOption: "C",
    correctlyAnswered: 5,
    incorrectlyAnswered: 2,

    questionTypeId: 2,
    explanation: "Casting your eyes to the left will assist you to deal with the dazzling effect of the bright beam of the oncoming vehicle."
  },
  {
    refNumber: 2,
    text: "What is the function of a clutch pedal?",
    image: "",

    option1: "It keeps the driver ever alert.",
    option2: "It avoid noise when changing gears.",
    option3: "It adds fuel to the engine.",

    correctOption: "B",
    correctlyAnswered: 5,
    incorrectlyAnswered: 2,

    questionTypeId: 2,
    explanation: "The clutch helps the vehicle to disengage the gears from the engine thus avoiding noise when changing gears."
  },
  {
    refNumber: 3,
    text: "A restriction sign signifies?",
    image: "",

    option1: "That I should not exceed stated speed.",
    option2: "The existence of danger.",
    option3: "That I must not proceed.",

    correctOption: "A",
    correctlyAnswered: 5,
    incorrectlyAnswered: 2,

    questionTypeId: 2,
    explanation: "A restriction sign has a mandatory or regulatory effect on the driver, the driver must not exceed the stated speed, weight, width, length or height."
  },
];

export function getQuestions () {

  return QUESTIONS;

}