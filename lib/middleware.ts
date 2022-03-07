/* eslint-disable no-console */
import type { NextApiRequest } from 'next';

export function logRequest(req: NextApiRequest) {
  console.log('\n');
  console.log('\nURL:', req.url);
  console.log('\nMETHOD:', req.method);
  console.log('\nHeaders:', JSON.stringify(req.headers));
  // console.log( "\nSession:", JSON.stringify( req.session ) );

  console.log('\n\nBody:', JSON.stringify(req.body));
}
