import * as React from "react";
import ListItem from "./ListItem";
import { Album } from "../interfaces/record";

type Props = {
  albums: Album[];
};

const List = ({ albums }: Props) => (
  <ul>
    {albums.map((album) => (
      <li key={album.id}>
        <ListItem album={album} />
      </li>
    ))}
  </ul>
);

export default List;
