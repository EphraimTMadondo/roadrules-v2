import { Avatar, Group, Text, UnstyledButton } from '@mantine/core';
import { Note } from '@prisma/client';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import Layout from '../../components/layout';
import { Toolbar } from '../../components/toolbar';
import { FALLBACK_ERROR_MESSAGE } from '../../lib/errors';
import { getNotes } from '../../lib/notes';
import {
  createSSRPageProps,
  getDataFromPageProps,
  PageProps,
} from '../../lib/props';
import { withSessionSsr } from '../../lib/with-session';
import { getCurrentUser } from '../api/trpc/[trpc]';

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

  const title = 'Notes';

  return (
    <Layout title={title}>
      <Toolbar title={title} />

      <div className="flex flex-col justify-start items-stretch pt-8">
        {notes.map((note) => (
          <div
            key={note.id}
            className="flex flex-col justify-start items-stretch py-4"
          >
            <Link passHref href={`/notes/${note.id}`}>
              <UnstyledButton className="rounded-md border border-slate-200 border-solid shadow-sm">
                <Group className="flex items-start p-4" noWrap>
                  <div className="py-2">
                    <Avatar size={40} color="green">
                      {note.refNumber}
                    </Avatar>
                  </div>
                  <div>
                    <div className="py-2">
                      <Text size="lg" weight="semibold" lineClamp={1}>
                        {note.title}
                      </Text>
                    </div>
                    <Text size="xs" color="gray">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua...
                    </Text>
                  </div>
                </Group>
              </UnstyledButton>
            </Link>
          </div>
        ))}
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = withSessionSsr<PageProps>(
  async ({ req }) => {
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

      const notes = (await getNotes()).sort(
        (a, b) => a.refNumber - b.refNumber
      );

      return createSSRPageProps<Data>({
        notes,
      });
    } catch ({ message }) {
      return createSSRPageProps<Data>({
        notes: [],
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        loadingError: (message as string) || FALLBACK_ERROR_MESSAGE,
      });
    }
  }
);
