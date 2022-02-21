import { Alert, Button } from '@mantine/core';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Layout from '../../components/layout';
import { Toolbar } from '../../components/toolbar';
import { getNotes, Note } from '../../lib/notes';

interface NotePageProps {
  note: Note | null;
  lastNote?: boolean;
}

export default function NotePage ( props: NotePageProps ) {

  const { note, lastNote } = props;

  const router = useRouter();

  const title = "Note";

  function back () {
    // router.back();
    router.push( "/notes" );
  }

  return (
    <Layout title={title}>

      <Toolbar
        title={note?.title || "Note"}
        leftIcon="arrow_back"
        leftIconAction={back}
      />

      {
        note &&
        <>
          <div className="flex flex-col justify-center items-stretch py-4">
            <p>
              {note.content}
            </p>
          </div>

          {
            !lastNote &&
            <div className="flex flex-col justify-center items-stretch pt-4">
              <Link href={`/notes/${ note.id + 1 }`}>
                <Button type="submit" size="md">
                  NEXT
                </Button>
              </Link>
            </div>
          }
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

  const notes = getNotes();

  const note = notes
    .find( note => note.id === id );

  const lastNote = note ?
    notes.indexOf( note ) === notes.length - 1 :
    true;

  const props: NotePageProps = {
    note: note || null,
    lastNote
  };

  return {
    props,
    revalidate: 10
  }

}

export async function getStaticPaths () {

  const notes = getNotes();

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
