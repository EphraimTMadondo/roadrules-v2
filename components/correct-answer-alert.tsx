export function CorrectAnswerAlert() {
  return (
    <div className="flex flex-row justify-center items-center py-8 bg-teal-50">
      <span className="text-md p-2 text-center font-semibold text-teal-500">
        Correct!
      </span>
      <i className="p-2 material-icons text-teal-500">check_circle</i>
    </div>
  );
}
