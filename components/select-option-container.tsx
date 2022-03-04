interface Props {
  children: any;
}

export function SelectOptionContainer ( props: Props ) {

  const { children } = props;

  return (
    <div className="flex flex-col justify-center items-stretch py-2">
      {children}
    </div>
  )

}