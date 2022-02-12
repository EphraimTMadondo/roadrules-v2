export interface StringValue {
  value: string;
}

export function toStringValues ( subjects: string[] ) {

  return subjects
    .map( subject => toStringValue( subject ) );

}

function toStringValue ( subject: string ) {

  return {
    value: subject
  }

}

export function pad ( n: string, width: number, z: string ) {

  z = z || "0";
  n = n + "";

  if ( n.length >= width )
    return n;

  return new Array( width - n.length + 1 ).join( z ) + n;

}