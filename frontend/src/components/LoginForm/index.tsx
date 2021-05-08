import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { hasLoginError } from "@selectors/login.selectors";
import { loginAction } from "@actions/auth.actions";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button, Container, Form, Title } from "./LoginForm.styles";
import { Input as InputStyle } from "../Input/Input.styles";

export default function LoginForm() {
  const dispatch = useDispatch();
  const error = useSelector(hasLoginError);

  const [localError, setLocalError] = useState("");

  const key = useRef<HTMLInputElement>(null);

  useEffect(() => {
    key.current!.focus();
  });

  const handleSubmit = useCallback(
    (event: any) => {
      event.preventDefault();

      let error = "Bitte dein Schlüssel angeben.";
      if (key.current!.value) {
        error = "";
        dispatch(loginAction({ key: key.current!.value }));
      }

      setLocalError(error);
    },
    [dispatch]
  );

  return (
    <Container>
      <Form>
        <Title>{process.env.TITLE}</Title>
        {(error || localError !== "") && (
          <div className="error">
            {localError !== "" ? (
              <p>{localError}</p>
            ) : (
              <p>Dein Schlüssel ist falsch</p>
            )}
          </div>
        )}
        <p>{error}</p>
        <InputStyle
          type="password"
          name="key"
          autoComplete="off"
          placeholder="Schlüssel"
          ref={key}
        />

        <Button onClick={handleSubmit} type="submit" value="Log In" />
      </Form>
    </Container>
  );
}
