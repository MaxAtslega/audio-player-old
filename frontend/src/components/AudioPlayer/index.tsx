import { downloadAudioAction } from "@actions/user.actions";
import React from "react";
import { FaDownload } from "react-icons/fa";
import { AudioPlayerStyle } from "@components/AudioPlayer/AudioPlayer.styles";
import { useDispatch, useSelector } from "react-redux";
import {
  getSelectedAudio,
  getSelectedAudioUrl,
} from "@selectors/user.selectors";

export default function Audio() {
  const selectedAudio = useSelector(getSelectedAudio);
  const url = useSelector(getSelectedAudioUrl);
  const dispatch = useDispatch();

  return (
    <AudioPlayerStyle
      autoPlay={false}
      src={url}
      customVolumeControls={[
        <FaDownload
          onClick={() => {
            if (selectedAudio.name !== "") {
              dispatch(downloadAudioAction(selectedAudio));
            }
          }}
        />,
      ]}
      header={selectedAudio.name || "Please select a track"}
    />
  );
}
