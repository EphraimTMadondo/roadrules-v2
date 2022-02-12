interface CustomCenterProps {
  children: React.ReactNode;
}

export function CustomCenter ( { children }: CustomCenterProps ) {

  return (
    <div className="column start-stretch xs-100 sm-80 gt-sm-60">
      {children}
    </div>
  )

}