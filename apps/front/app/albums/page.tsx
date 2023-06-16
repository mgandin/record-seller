import Link from "next/link";

import { Album } from "../../interfaces/record";
import Layout from "../../components/Layout";
import List from "../../components/List";
import { apiHttpClient } from "../../utils/constant";

const WithStaticProps = async () => {
  const albums: Album[] = await apiHttpClient.get("/albums");
  return (
    <Layout title="Records List">
      <h1>Records List</h1>
      <List albums={albums} />
      <p>
        <Link href="/">Go home</Link>
      </p>
    </Layout>
  );
};

export default WithStaticProps;
