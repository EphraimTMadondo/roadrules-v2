interface CustomCenterProps {
  children: React.ReactNode;
}

export function CustomCenter ( { children }: CustomCenterProps ) {

  return (
    <div className="column start-stretch xs-100 sm-60 gt-sm-40">
      {children}
    </div>
  )

}