import { Button } from '@mantine/core';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Layout from '../../components/layout';
import { Toolbar } from '../../components/toolbar';
import { getNotes, Note } from '../../lib/notes';

interface NotesProps {
  notes: Note[];
}

export default function Notes ( props: NotesProps ) {

  const { notes } = props;

  const router = useRouter();

  function back () {
    // router.back();
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

  const notes = getNotes();

  const props: NotesProps = { notes };

  return {
    props,
    revalidate: 10,
  }

}