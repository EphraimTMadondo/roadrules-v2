import { Alert, Button } from '@mantine/core';
import { Note } from '@prisma/client';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Layout from '../../components/layout';
import { Toolbar } from '../../components/toolbar';
import { getNotes } from '../../lib/notes';

interface Data {
  note: Note | null;
  previousNoteId: number;
  nextNoteId: number;
}

interface NotePageProps {
  data: string;
}

export default function NotePage ( props: NotePageProps ) {

  const data: Data = JSON.parse( props.data );

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

  const data: Data = {
    note: note || null,
    previousNoteId,
    nextNoteId
  };

  const props: NotePageProps = {
    data: JSON.stringify( data )
  };

  return {
    props,
    revalidate: 10
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
