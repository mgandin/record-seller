import React from 'react'
import Link from 'next/link'

import { Album } from '../interfaces/record'

type Props = {
  album: Album
}

const ListItem = ({ album }: Props) => (
  <Link href="/record/[id]" as={`/record/${album.id}`}>
    {album.id}:{album.name}
  </Link>
)

export default ListItem