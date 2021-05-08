import React from "react";
import AudioItem from "@components/AudioItem";
import { Category, CategoryItem } from "./List.styles";
import useList from "./useList";

export default function List() {
  const audios = useList().sort((a, b) => {
    const dateA: any = new Date(a.createdAt);
    const dateB: any = new Date(b.createdAt);
    return dateB - dateA;
  });
  const category = process.env.CATEGORY
    ? process.env.CATEGORY.toString().split(",")
    : [];

  return (
    <React.Fragment>
      {category.map(categoryName => {
        return (
          <Category key={categoryName}>
            <CategoryItem>{categoryName}</CategoryItem>
            {audios.map(audio => {
              if (audio.category === categoryName) {
                return <AudioItem key={audio.uuid} audio={audio} />;
              }
              return null;
            })}
          </Category>
        );
      })}
      <Category>
        {audios.map(audio => {
          if (audio.category === "") {
            return <AudioItem key={audio.uuid} audio={audio} />;
          }
          return null;
        })}
      </Category>
    </React.Fragment>
  );
}
