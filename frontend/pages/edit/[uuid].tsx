import Input from "@components/Input";
import { Button } from "@components/Input/Input.styles";
import Select from "@components/Select";
import Title from "@components/Title";
import Audio from "@models/Audio";
import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isAdmin, isLoggedIn } from "@selectors/login.selectors";
import { useRouter } from "next/router";
import initialize from "@utils/initialize";
import Main from "@components/Main";
import Header from "@components/Header";
import { Container } from "@components/Main/Main.styles";
import Loading from "@components/Loading";
import { getAudio, getError } from "@selectors/user.selectors";
import {
  deleteAudioAction,
  loadAudiosAction,
  updateAudioAction,
} from "@actions/user.actions";
import waitForAction from "@utils/waitForAction";

function Edit() {
  const dispatch = useDispatch();
  const error = useSelector(getError);
  const [localError, setLocalError] = useState("");

  const router = useRouter();
  const loggedin = useSelector(isLoggedIn);
  const admin = useSelector(isAdmin);
  const audio = useSelector(getAudio)(String(router.query.uuid));

  const [name, setName] = useState(audio.name);
  const [category, setCategory] = useState(
    audio.category ? String(audio.category) : "No name category"
  );
  const categoryList = process.env.CATEGORY
    ? process.env.CATEGORY.toString()
        .split(",")
        .concat("No name category")
    : ["No name category"];

  const handleDelete = useCallback(() => {
    dispatch(deleteAudioAction(audio.uuid));
  }, [audio.uuid, dispatch]);

  const handleEdit = useCallback(
    (event: any) => {
      event.preventDefault();
      if (name === "") {
        setLocalError("Name can not be empty");
      } else if (category === "selected-default") {
        setLocalError("Please choose a category");
      } else {
        const categoryName = category === "No name category" ? "" : category;
        dispatch(
          updateAudioAction(
            new Audio(
              audio.uuid,
              name,
              categoryName,
              audio.createdAt,
              audio.updatedAt,
              audio.file
            )
          )
        );
      }
    },
    [
      audio.createdAt,
      audio.file,
      audio.updatedAt,
      audio.uuid,
      category,
      dispatch,
      name,
    ]
  );

  if (loggedin && admin && audio) {
    return (
      <Main>
        <Header />
        <Container>
          <Title title="Edit audio" />
          <Input
            bgSecondary
            label="Name"
            value={name}
            type="text"
            name="name"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setName(e.target.value);
            }}
            autoComplete="off"
            placeholder="my brilliant audio name"
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
              return <p>{localError}</p>;
            })()}
          </div>
          <Button
            background="#2ecc71"
            onClick={handleEdit}
            color="#000000"
            type="submit"
            value="Edit"
          />
          <Button
            background="#c0392b"
            color="#d9d9d9"
            onClick={handleDelete}
            type="submit"
            value="Delete"
          />
        </Container>
      </Main>
    );
  }
  if (typeof window !== "undefined") router.push(!loggedin ? "/login" : "/");
  return <Loading />;
}

Edit.getInitialProps = async function getInitialProps(ctx: any) {
  await initialize(ctx);
  if (ctx.store.getState().user.audios.length === 0) {
    await ctx.store.dispatch(loadAudiosAction());
    await waitForAction(ctx.store);
  }
};

export default Edit;
