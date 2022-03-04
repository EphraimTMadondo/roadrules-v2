import { Alert, Button } from '@mantine/core';
import { Note } from '@prisma/client';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Layout from '../../components/layout';
import { Toolbar } from '../../components/toolbar';
import { FALLBACK_ERROR_MESSAGE } from '../../lib/errors';
import { getNotes } from '../../lib/notes';
import { createISRPageProps, getDataFromPageProps, PageProps } from '../../lib/props';

interface Data {
  note: Note | null;
  previousNoteId: number;
  nextNoteId: number;
  loadingError?: string;
}

export default function NotePage ( props: PageProps ) {

  const data = getDataFromPageProps<Data>( props, {
    note: null,
    previousNoteId: 0,
    nextNoteId: 0,
    loadingError: FALLBACK_ERROR_MESSAGE
  } );

  const { note, previousNoteId, nextNoteId } = data;

  const router = useRouter();

  const title = "Note";

  function back () {

    if ( previousNoteId )
      return router.push( "/notes/" + previousNoteId );

    return router.push( "/notes" );

  }

  function forward () {
    return router.push( "/notes/" + nextNoteId );
  }

  return (
    <Layout title={title}>

      <Toolbar
        title={note?.title || "Note"}
        leftIcon="arrow_back"
        leftIconAction={back}
        rightIcon={nextNoteId ? "arrow_forward" : undefined}
        rightIconAction={nextNoteId ? forward : undefined}
      />

      {
        note &&
        <>
          <div className="flex flex-col justify-center items-stretch py-4">
            <p dangerouslySetInnerHTML={{ __html: note.html }}>
            </p>
          </div>

          {
            Boolean( nextNoteId ) &&
            <div className="flex flex-col justify-center items-stretch pt-4">
              <Link href={`/notes/${ nextNoteId }`}>
                <Button size="md">
                  NEXT
                </Button>
              </Link>
            </div>
          }
          <div className="flex flex-col justify-center items-stretch pt-4">
            <Link href="/notes">
              <Button variant="light" size="md">
                BACK TO LIST
              </Button>
            </Link>
          </div>
        </>
      }

      {
        !note &&
        <div className="flex flex-col justify-start items-stretch pt-4">
          <Alert icon={<i className="material-icons">error</i>} title="Sorry" color="red">
            We couldn't find that particular note.
          </Alert>
        </div>
      }

    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ( { params } ) => {

  try {

    const id = Number( params?.id || 0 );

    const notes = await getNotes();

    const note = notes
      .find( note => note.id === id );

    const [ previousNoteId, nextNoteId ] = ( () => {

      if ( !note )
        return [ 0, 0 ];

      const currentIndex = notes.indexOf( note );

      const previousNoteId = currentIndex === 0 ?
        0 :
        notes[ currentIndex - 1 ].id;

      const nextNoteId = currentIndex === notes.length - 1 ?
        0 :
        notes[ currentIndex + 1 ].id;

      return [ previousNoteId, nextNoteId ];

    } )();

    return createISRPageProps<Data>( {
      note: note || null,
      previousNoteId,
      nextNoteId
    } );

  } catch ( error: any ) {

    return createISRPageProps<Data>( {
      note: null,
      previousNoteId: 0,
      nextNoteId: 0,
      loadingError: error?.message || FALLBACK_ERROR_MESSAGE
    } );

  }

}

export async function getStaticPaths () {

  const notes = await getNotes();

  const paths = notes
    .map( note => {

      return {
        params: {
          id: note.id.toString()
        },
      }

    } );

  return {
    paths,
    fallback: 'blocking'
  }

}