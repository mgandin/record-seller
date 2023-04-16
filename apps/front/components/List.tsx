import * as React from 'react'
import ListItem from './ListItem'
import { Record } from '../interfaces/record'

type Props = {
  records: Record[]
}

const List = ({ records }: Props) => (
  <ul>
    {records.map((record) => (
      <li key={record.id}>
        <ListItem record={record} />
      </li>
    ))}
  </ul>
)

export default List