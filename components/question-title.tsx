interface Props {
  questionNumber: number;
  numQuestions: number;
  title: string;
}

export function QuestionTitle ( props: Props ) {

  const { questionNumber, numQuestions, title } = props;

  return (
    <div className="flex flex-col justify-center items-center py-4">
      <span className="text-md font-semibold py-2">
        Question {questionNumber} of {numQuestions}
      </span>
      <span className="text-md py-2 text-center">
        {title}
      </span>
    </div>
  )

}