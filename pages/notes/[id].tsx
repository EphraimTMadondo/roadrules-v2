import { Alert, Button } from '@mantine/core';
import { Note } from '@prisma/client';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { getNotes } from '../../lib/notes';
import Layout from '../../components/layout';
import { Toolbar } from '../../components/toolbar';
import { FALLBACK_ERROR_MESSAGE } from '../../lib/errors';
import {
  createSSRPageProps,
  getDataFromPageProps,
  PageProps,
} from '../../lib/props';
import { withSessionSsr } from '../../lib/with-session';
import { getCurrentUser } from '../api/trpc/[trpc]';

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

  const title = 'Note';

  return (
    <Layout title={title}>
      <Toolbar title={note?.title || 'Note'} />

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
                <Button>NEXT</Button>
              </Link>
            </div>
          )}
          <div className="flex flex-col justify-center items-stretch pt-4">
            <Link passHref href="/notes">
              <Button variant="light">BACK TO LIST</Button>
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

export const getServerSideProps: GetServerSideProps = withSessionSsr<PageProps>(
  async ({ req, params }) => {
    try {
      const currentUser = getCurrentUser(req.session);

      if (!currentUser) {
        return {
          redirect: {
            destination: '/sign-in',
            permanent: false,
          },
        };
      }

      const id = Number(params?.id || 0);

      const notes = (await getNotes()).sort(
        (a, b) => a.refNumber - b.refNumber
      );

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
  }
);
