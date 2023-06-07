import Link from "next/link";

import { Album } from "../../interfaces/record";
import Layout from "../../components/Layout";
import List from "../../components/List";
import type { GetServerSideProps } from "next";
import { apiHttpClient } from "../../utils/constant";

type Props = {
  albums: Album[];
};

const WithStaticProps = ({ albums }: Props) => (
  <Layout title="Records List">
    <h1>Records List</h1>
    <List albums={albums} />
    <p>
      <Link href="/">Go home</Link>
    </p>
  </Layout>
);

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const albums: Album[] = await apiHttpClient.get("/albums");
  return { props: { albums } };
};

export default WithStaticProps;
