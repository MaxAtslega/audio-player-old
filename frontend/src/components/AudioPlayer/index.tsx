import { FaDownload } from "react-icons/fa";
import { AudioPlayerStyle } from "@components/AudioPlayer/AudioPlayer.styles";
import { useSelector } from "react-redux";
import { getSelectedAudio, getSelectedAudioUrl } from "@selectors/user.selectors";
import { getToken } from "@selectors/login.selectors";
import { useEffect, useState } from "react";

export default function Audio() {
  const selectedAudio = useSelector(getSelectedAudio);
  const url = useSelector(getSelectedAudioUrl);


  return (
    <AudioPlayerStyle
      autoPlay={false}
      src={url}
      customVolumeControls={[
        <FaDownload onClick={() => {
          if (selectedAudio.name !== "") {
            let a = document.createElement("a")
            a.href = url;
            a.download = selectedAudio.name + "." + selectedAudio.file.split(".")[selectedAudio.file.split(".").length - 1]
            a.click()
          }
        }} />,
      ]}
      header={
        selectedAudio.name || "Please select a track"
      }
    />
  )
}
