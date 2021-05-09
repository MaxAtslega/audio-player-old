import { createAudioAction, loadAudiosAction } from "@actions/user.actions";
import Select from "@components/Select";
import AudioUpload from "@models/AudioUpload";
import { getError } from "@selectors/user.selectors";
import waitForAction from "@utils/waitForAction";
import * as React from "react";
import { useCallback, useState } from "react";
import Input from "@components/Input";
import { Button } from "@components/Input/Input.styles";
import Title from "@components/Title";
import { useDispatch, useSelector } from "react-redux";
import { isAdmin, isLoggedIn } from "@selectors/login.selectors";
import { useRouter } from "next/router";
import initialize from "@utils/initialize";
import Main from "@components/Main";
import Header from "@components/Header";
import { Container } from "@components/Main/Main.styles";
import Loading from "@components/Loading";

function Create() {
  const dispatch = useDispatch();
  const error = useSelector(getError);
  const [localError, setLocalError] = useState("");
  const [localMessage, setLocalMessage] = useState("");

  const router = useRouter();
  const loggedin = useSelector(isLoggedIn);
  const admin = useSelector(isAdmin);

  const [name, setName] = useState("");
  const [category, setCategory] = useState("selected-default");
  const [file, setFile] = useState<any>();
  const categoryList = process.env.CATEGORY
    ? process.env.CATEGORY.toString()
        .split(",")
        .concat("No name category")
    : ["No name category"];

  const handleSubmit = useCallback(
    (event: any) => {
      event.preventDefault();
      if (name === "") {
        setLocalError("Name can not be empty");
      } else if (!file) {
        setLocalError("Please choose an audio file");
      } else if (category === "selected-default") {
        setLocalError("Please choose a category");
      } else if (!file.name.match(/\.(wav|mp3|MP3,ogg,OGG,WAV)$/)) {
        setLocalError("Please choose an audio file");
      } else {
        setLocalMessage(
          "Your audio is being uploaded. If successful, you will be automatically redirected to the homepage"
        );
        const categoryName = category === "No name category" ? "" : category;
        dispatch(createAudioAction(new AudioUpload(name, categoryName, file)));
      }
    },
    [category, dispatch, file, name]
  );

  if (loggedin && admin) {
    return (
      <Main>
        <Header />
        <Container>
          <Title title="Create a new audio" />
          <Input
            bgSecondary
            label="Name"
            type="text"
            name="name"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setName(e.target.value);
            }}
            autoComplete="off"
            placeholder="my brilliant audio name"
          />
          <Input
            bgSecondary
            type="file"
            name="file"
            accept="audio/mp3,audio/*;capture=microphone"
            label="Choose an audio file"
            onChange={(e: any) => {
              setFile(e.target.files[0]);
            }}
          />
          <Select
            label="Choose a category"
            bgSecondary
            selected={category}
            onChange={(e: any) => {
              setCategory(e.target.value);
            }}
            options={categoryList}
          />
          <div className="error">
            {(() => {
              if (error !== "") {
                return <p>{error}</p>;
              }
              if (localMessage !== "") {
                return <p>{localMessage}</p>;
              }
              return <p>{localError}</p>;
            })()}
          </div>
          <Button onClick={handleSubmit} type="submit" value="Send" />
        </Container>
      </Main>
    );
  }
  if (typeof window !== "undefined") router.push(!loggedin ? "/login" : "/");
  return <Loading />;
}

Create.getInitialProps = async function getInitialProps(ctx: any) {
  await initialize(ctx);
  if (ctx.store.getState().user.audios.length === 0) {
    await ctx.store.dispatch(loadAudiosAction());
    await waitForAction(ctx.store);
  }
};
export default Create;
