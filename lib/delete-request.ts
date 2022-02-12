import axios from "axios";
import { FALLBACK_ERROR_MESSAGE } from "./errors";

export async function deleteRequest<ReturnType> ( url: string ): Promise<[ ReturnType | undefined, Error | undefined ]> {

  try {

    const headers = { 'Content-Type': 'application/json' };

    const response = await axios.delete<ReturnType>( url, {
      headers, withCredentials: true
    } );

    console.log( "PUT REPONSE: ", url, response.data );

    return [ response.data, undefined ];

  } catch ( reason: any ) {

    return [ undefined, new Error( reason?.message || FALLBACK_ERROR_MESSAGE ) ];

  }

}