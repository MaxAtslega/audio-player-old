import useList from './useList';
import { Category, AudioItem, CategoryItem, Item, Controllers } from "./List.styles";
import { MdEdit } from "react-icons/md";
import { FaDownload } from "react-icons/fa";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAudioAction } from "@actions/user.actions";
import { getSelectedAudio, getSelectedAudioUrl } from "@selectors/user.selectors";
import Audio from "@models/Audio";
import { push } from "connected-next-router";
import { isAdmin } from "@selectors/login.selectors";

export default function List() {
  const dispatch = useDispatch();
  const audios = useList().sort((a, b) => {
    let date_a:any = new Date(a.createdAt),
      date_b:any = new Date(b.createdAt);
    return date_a - date_b;
  });

  const selectedAudio = useSelector(getSelectedAudio);
  const category = process.env.CATEGORY?.toString().split(",")
  const url = useSelector(getSelectedAudioUrl);
  const admin = useSelector(isAdmin);

  return (
    <>
      {
        category?.map(categoryName => {
          return (
            <Category key={categoryName}>
              <CategoryItem>{categoryName}</CategoryItem>
              {audios.map(audio =>{
                if(audio.category === categoryName || audio.category === ""){
                  return <AudioItem onClick={(event: any) => {
                    if (!event.target.matches(Item)){
                      dispatch(selectAudioAction(selectedAudio.name && audio === selectedAudio ? new Audio("","","","","", "") : audio));
                    }
                  }}
                                    className={selectedAudio===audio? "play": ""} key={audio.uuid}>
                    {audio.name} <Controllers>
                    {admin ? <Item onClick={() => dispatch(push("edit/"+audio.uuid))}><MdEdit/></Item> : null }
                    <Item onClick={() => {
                      if (audio.name !== "") {
                        let a = document.createElement("a")
                        a.href = url;
                        a.download = audio.name + "." + audio.file.split(".")[audio.file.split(".").length - 1]
                        a.click()
                      }
                    }}><FaDownload /></Item></Controllers>
                  </AudioItem>
                }
              })}
            </Category>
          )
        })
      }
    </>

  )
}
