import Audio from "@models/Audio";
import { useSelector } from "react-redux";
import { getAudios } from "@selectors/user.selectors";

export default function useList(): Audio[] {
  return useSelector(getAudios);
}
