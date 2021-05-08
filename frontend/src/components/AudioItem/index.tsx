import { downloadAudioAction, selectAudioAction } from "@actions/user.actions";
import Audio from "@models/Audio";
import { isAdmin } from "@selectors/login.selectors";
import { getSelectedAudio } from "@selectors/user.selectors";
import { push } from "connected-next-router";
import * as React from "react";
import { FaDownload } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Container, Item, Controllers } from "./AudioItem.styles";

export default function AudioItem({ audio }: { audio: Audio }) {
  const dispatch = useDispatch();
  const selectedAudio = useSelector(getSelectedAudio);
  const admin = useSelector(isAdmin);
  return (
    <Container
      onClick={(event: any) => {
        if (!event.target.matches(Item)) {
          dispatch(
            selectAudioAction(
              selectedAudio.name && audio === selectedAudio
                ? new Audio("", "", "", "", "", "")
                : audio
            )
          );
        }
      }}
      className={selectedAudio === audio ? "play" : ""}
    >
      {audio.name}
      <Controllers>
        {admin ? (
          <Item onClick={() => dispatch(push(`edit/${audio.uuid}`))}>
            <MdEdit />
          </Item>
        ) : null}
        <Item onClick={() => dispatch(downloadAudioAction(audio))}>
          <FaDownload />
        </Item>
      </Controllers>
    </Container>
  );
}
