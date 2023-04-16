import React from 'react'
import Link from 'next/link'

import { Record } from '../interfaces/record'

type Props = {
  record: Record
}

const ListItem = ({ record }: Props) => (
  <Link href="/record/[id]" as={`/record/${record.id}`}>
    {record.id}:{record.name}
  </Link>
)

export default ListItem