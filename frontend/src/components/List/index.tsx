import useList from './useList';
import { Category, AudioItem, CategoryItem, Item, Controllers } from "./List.styles";
import { MdEdit } from "react-icons/md";
import { FaDownload } from "react-icons/fa";

export default function List() {
  const audios = useList();

  return (
    <>
      <Category>
        <CategoryItem>Homework</CategoryItem>
        {audios.map(audio =>{
          return <AudioItem className={"play"} key={audio.uuid}>{audio.name} <Controllers><Item><MdEdit/></Item><Item><FaDownload/></Item></Controllers></AudioItem>
        })}
      </Category>
      <Category>
        <CategoryItem>Lately</CategoryItem>
        {audios.map(audio =>{
          return <AudioItem key={audio.uuid}>{audio.name} <Controllers><Item><MdEdit/></Item><Item><FaDownload/></Item></Controllers></AudioItem>
        })}
      </Category>
    </>

  )
}
