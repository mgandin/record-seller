import * as React from 'react'

import { Record } from '../interfaces/record'

type ListDetailProps = {
  record: Record
}

const ListDetail = ({ record: record }: ListDetailProps) => (
  <div>
    <h1>Detail for {record.name}</h1>
    <p>ID: {record.id}</p>
  </div>
)

export default ListDetail