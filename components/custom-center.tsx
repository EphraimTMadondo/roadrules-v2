
interface CustomCenterProps {
  children: React.ReactNode;
}

export function CustomCenter ( props: CustomCenterProps ) {

  const { children } = props;

  return (
    <div className="flex flex-col justify-start items-stretch w-full sm:w-4/5 md:w-2/5">
      {children}
    </div>
  )

}