import * as React from 'react'

import { Album } from '../interfaces/record'

type ListDetailProps = {
  album: Album
}

const ListDetail = ({ album: Album }: ListDetailProps) => (
  <div>
    <h1>Detail for {Album.name}</h1>
    <p>ID: {Album.id}</p>
  </div>
)

export default ListDetail