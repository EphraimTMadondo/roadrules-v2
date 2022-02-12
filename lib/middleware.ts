import type { NextApiRequest, NextApiResponse } from 'next';

export function logRequest ( req: NextApiRequest, res: NextApiResponse ) {

  console.log( "\n" );
  console.log( "\nURL:", req.url );
  console.log( "\nMETHOD:", req.method );
  console.log( "\nHeaders:", JSON.stringify( req.headers ) );
  console.log( "\nSession:", JSON.stringify( req.session ) );

  console.log( "\n\nBody:", JSON.stringify( req.body ) );

}