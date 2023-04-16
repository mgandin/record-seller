import { GetStaticProps } from 'next'
import Link from 'next/link'

import { Record } from '../../interfaces/record'
import Layout from '../../components/Layout'
import List from '../../components/List'
import type { GetServerSideProps } from 'next';
import { apiHttpClient } from '../../utils/constant'


type Props = {
  records: Record[]
}

const WithStaticProps = ({ records }: Props) => (
  <Layout title="Records List">
    <h1>Records List</h1>
    <List records={records} />
    <p>
      <Link href="/">Go home</Link>
    </p>
  </Layout>
)

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const records: Record[] = await apiHttpClient.get('/records');
  return { props: { records } }
}

export default WithStaticProps