import { pad } from "../lib/strings";

interface Props {
  secondsLeft: number;
  crunchTime: boolean;
}

export function Timer ( props: Props ) {

  const { secondsLeft, crunchTime } = props;

  const minutesValue = Math.floor( secondsLeft / 60 );

  const minutes = pad( minutesValue.toString(), 2, "0" );
  const seconds = pad( ( secondsLeft % 60 ).toString(), 2, "0" );

  return (
    <>
      <Wrapper>
        {
          !crunchTime &&
          <GreenContainer>
            <Text>
              {minutes}:{seconds}
            </Text>
          </GreenContainer>
        }
        {
          crunchTime &&
          <RedContainer>
            <Text>
              {minutes}:{seconds}
            </Text>
          </RedContainer>
        }
      </Wrapper>
    </>
  )

}

interface ChildrenProps {
  children: any;
}

function Wrapper ( props: ChildrenProps ) {

  const { children } = props;

  return (
    <div className="flex flex-col p-2">
      {children}
    </div>
  )

}

function GreenContainer ( props: ChildrenProps ) {

  const { children } = props;

  return (
    <div className="flex flex-col px-2 bg-teal-600 border rounded border-solid border-teal-600">
      {children}
    </div>
  )

}

function RedContainer ( props: ChildrenProps ) {

  const { children } = props;

  return (
    <div className="flex flex-col px-2 bg-red-600 border rounded border-solid border-red-600">
      {children}
    </div>
  )

}

function Text ( props: ChildrenProps ) {

  const { children } = props;

  return (
    <span className="text-white font-semibold">
      {children}
    </span>
  )

}