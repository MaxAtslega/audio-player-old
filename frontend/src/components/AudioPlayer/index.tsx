import AudioPlayer from "react-h5-audio-player"
import { FaDownload } from "react-icons/fa";

import { AudioPlayerStyle } from "@components/AudioPlayer/AudioPlayer.styles";

export default function Audio() {
  return (
    <AudioPlayerStyle
      autoPlay={false}
      src={""}
      customVolumeControls={[
        <FaDownload onClick={() => {}} />,
      ]}
      header={
        "Please select an audio track"
      }
    />
  )
}
