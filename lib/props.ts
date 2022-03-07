export interface PageProps {
  data: string;
}

interface Data {
  loadingError?: string;
}

export function getDataFromPageProps<CustomData extends Data>(
  props: PageProps,
  defaultData: CustomData
) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const data: CustomData = props?.data ? JSON.parse(props.data) : defaultData;

  return data;
}

export function createSSRPageProps<CustomData extends Data>(data: CustomData) {
  const props: PageProps = {
    data: JSON.stringify(data),
  };

  return {
    props,
  };
}

export function createISRPageProps<CustomData extends Data>(data: CustomData) {
  const props: PageProps = {
    data: JSON.stringify(data),
  };

  return {
    props,
    revalidate: 10,
  };
}
