import { Button } from '@mantine/core';
import { Note } from '@prisma/client';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { FALLBACK_ERROR_MESSAGE } from '../../lib/errors';
import Layout from '../../components/layout';
import { Toolbar } from '../../components/toolbar';
import { getNotes } from '../../lib/notes';
import {
  createISRPageProps,
  getDataFromPageProps,
  PageProps,
} from '../../lib/props';

interface Data {
  notes: Note[];
  loadingError?: string;
}

export default function Notes(props: PageProps) {
  const data = getDataFromPageProps<Data>(props, {
    notes: [],
    loadingError: FALLBACK_ERROR_MESSAGE,
  });

  const { notes } = data;

  const router = useRouter();

  const back = useCallback(
    () => router.push('/driving-lessons-menu'),
    [router]
  );

  const title = 'Notes';

  return (
    <Layout title={title}>
      <Toolbar title={title} leftIcon="arrow_back" leftIconAction={back} />

      <div className="flex flex-col justify-start items-stretch pt-8">
        {notes.map((note) => (
          <div
            key={note.id}
            className="flex flex-col justify-start items-stretch py-3"
          >
            <Link passHref href={`/notes/${note.id}`}>
              <Button size="md" variant="light">
                {note.title}
              </Button>
            </Link>
          </div>
        ))}
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  try {
    const notes = await getNotes();

    return createISRPageProps<Data>({
      notes,
    });
  } catch ({ message }) {
    return createISRPageProps<Data>({
      notes: [],
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      loadingError: (message as string) || FALLBACK_ERROR_MESSAGE,
    });
  }
}
