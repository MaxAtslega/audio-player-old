import useList from './useList';
import { Category, AudioItem, CategoryItem } from "./List.styles";
import { IoIosArrowUp } from "react-icons/io";

export default function List() {
  const audios = useList();

  return (
    <>
      <Category>
        <CategoryItem><p>Homework</p><IoIosArrowUp/></CategoryItem>
        {audios.map(audio =>{
          return <AudioItem key={audio.uuid}>{audio.name}</AudioItem>
        })}
      </Category>
      <Category>
        <CategoryItem><p>Lately</p><IoIosArrowUp/></CategoryItem>
        {audios.map(audio =>{
          return <AudioItem key={audio.uuid}>{audio.name}</AudioItem>
        })}
      </Category>
    </>

  )
}
