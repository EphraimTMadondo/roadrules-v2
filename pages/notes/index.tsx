import { Button } from '@mantine/core';
import { Note } from '@prisma/client';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Layout from '../../components/layout';
import { Toolbar } from '../../components/toolbar';
import { getNotes } from '../../lib/notes';

interface Data {
  notes: Note[];
}

interface NotesProps {
  data: string;
}

export default function Notes ( props: NotesProps ) {

  const data: Data = JSON.parse( props.data );

  const { notes } = data;

  const router = useRouter();

  function back () {
    router.push( "/driving-lessons-menu" );
  }

  const title = "Notes";

  return (
    <Layout title={title}>

      <Toolbar
        title={title}
        leftIcon="arrow_back"
        leftIconAction={back}
      />

      <div className="flex flex-col justify-start items-stretch pt-8">
        {
          notes
            .map( note => (
              <div
                key={note.id}
                className="flex flex-col justify-start items-stretch py-3"
              >
                <Link href={"/notes/" + note.id}>
                <Button size="md" variant="light">
                  {note.title}
                </Button>
                </Link>
              </div>
            ) )
        }
      </div>

    </Layout>
  )
}

export async function getStaticProps () {

  const notes = await getNotes();

  const data: Data = { notes };

  const props: NotesProps = { 
    data: JSON.stringify( data )
   };

  return {
    props,
    revalidate: 10,
  }

}