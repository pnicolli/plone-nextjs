import { getServerQueryClient, client as ploneClient } from '@/lib/client';

export async function generateMetadata({
  params,
}: {
  params: { path?: string[] };
}) {
  const { path = [] } = params;
  const queryClient = getServerQueryClient();
  const { getContentQuery } = ploneClient;

  const data = await queryClient.fetchQuery(
    getContentQuery({ path: '/' + path.join('/') })
  );

  return {
    title: `${data.title || ''} - Next Plone Site`,
  };
}

export default async function View({
  params,
}: {
  params: { path?: string[] };
}) {
  const { path = [] } = params;
  const queryClient = getServerQueryClient();
  const { getContentQuery } = ploneClient;

  const data = await queryClient.fetchQuery(
    getContentQuery({ path: '/' + path.join('/') })
  );

  return (
    <main>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </main>
  );
}
