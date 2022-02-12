import { pad } from "./strings";

export function gvDateFormat ( dateInput: Date ) {

  const year = dateInput.getFullYear().toString();
  const month = pad( ( dateInput.getMonth() + 1 ).toString(), 2, "0" );
  const date = pad( dateInput.getDate().toString(), 2, "0" );

  const hours = pad( ( dateInput.getHours() ).toString(), 2, "0" );
  const minutes = pad( dateInput.getMinutes().toString(), 2, "0" );
  const seconds = pad( dateInput.getSeconds().toString(), 2, "0" );

  return `${ year }-${ month }-${ date } ${ hours }:${ minutes }:${ seconds }`;

}