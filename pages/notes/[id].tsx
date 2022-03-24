import { Alert, Button } from '@mantine/core';
import { Note } from '@prisma/client';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
// import { useRouter } from 'next/router';
// import { useCallback } from 'react';
import Layout from '../../components/layout';
import { Toolbar } from '../../components/toolbar';
import { FALLBACK_ERROR_MESSAGE } from '../../lib/errors';
import { getNotes } from '../../lib/notes';
import {
  createSSRPageProps,
  getDataFromPageProps,
  PageProps,
} from '../../lib/props';

interface Data {
  note: Note | null;
  previousNoteId: number;
  nextNoteId: number;
  loadingError?: string;
}

export default function EditNotePage(props: PageProps) {
  const data = getDataFromPageProps<Data>(props, {
    note: null,
    previousNoteId: 0,
    nextNoteId: 0,
    loadingError: FALLBACK_ERROR_MESSAGE,
  });

  const { note, nextNoteId } = data;

  // const router = useRouter();

  const title = 'Note';

  // const back = useCallback(() => {
  //   if (previousNoteId) {
  //     return router.push(`/notes/${previousNoteId}`);
  //   }
  //   return router.push('/notes');
  // }, [previousNoteId, router]);

  // const forward = useCallback(
  //   () => router.push(`/notes/${nextNoteId}`),
  //   [router, nextNoteId]
  // );

  return (
    <Layout title={title}>
      <Toolbar
        title={note?.title || 'Note'}
        // leftIcon="arrow_back"
        // leftIconAction={back}
        // rightIcon={nextNoteId ? 'arrow_forward' : undefined}
        // rightIconAction={nextNoteId ? forward : undefined}
      />

      {note && (
        <>
          <div className="flex flex-col justify-center items-stretch py-4">
            <p
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{ __html: note.html }}
            />
          </div>

          {Boolean(nextNoteId) && (
            <div className="flex flex-col justify-center items-stretch pt-4">
              <Link passHref href={`/notes/${nextNoteId}`}>
                <Button size="md">NEXT</Button>
              </Link>
            </div>
          )}
          <div className="flex flex-col justify-center items-stretch pt-4">
            <Link passHref href="/notes">
              <Button variant="light" size="md">
                BACK TO LIST
              </Button>
            </Link>
          </div>
        </>
      )}

      {!note && (
        <div className="flex flex-col justify-start items-stretch pt-4">
          <Alert
            icon={<i className="material-icons">error</i>}
            title="Sorry"
            color="red"
          >
            We couldn't find that particular note.
          </Alert>
        </div>
      )}
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  try {
    const id = Number(params?.id || 0);

    const notes = (await getNotes()).sort((a, b) => a.refNumber - b.refNumber);

    const note = notes.find((el) => el.id === id);

    const [previousNoteId, nextNoteId] = (() => {
      if (!note) {
        return [0, 0];
      }

      const currentIndex = notes.indexOf(note);

      const previous = currentIndex === 0 ? 0 : notes[currentIndex - 1].id;

      const next =
        currentIndex === notes.length - 1 ? 0 : notes[currentIndex + 1].id;

      return [previous, next];
    })();

    return createSSRPageProps<Data>({
      note: note || null,
      previousNoteId,
      nextNoteId,
    });
  } catch (error: unknown) {
    const { message } = error as { message: string };
    return createSSRPageProps<Data>({
      note: null,
      previousNoteId: 0,
      nextNoteId: 0,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      loadingError: message || FALLBACK_ERROR_MESSAGE,
    });
  }
};
