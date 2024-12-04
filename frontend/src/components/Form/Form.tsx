import React, { useEffect, useState } from "react";

import { Button, CircularProgress, TextField } from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import Grid from "@mui/material/Grid2";
import { IForm } from "../../types";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { fetchDecode, fetchEncode } from "./FormThunk.ts";
import { toast } from "react-toastify";
import {
  selectDecode,
  selectDecodeLoading,
  selectEncode,
  selectEncodeLoading,
} from "./FormSlice.ts";

const ProductForm = () => {
  const dispatch = useAppDispatch();

  const [form, setForm] = useState<IForm>({
    encoded: "",
    password: "",
    decoded: "",
  });
  const encode = useAppSelector(selectEncode);
  const decode = useAppSelector(selectDecode);
  const isDecodeLoading = useAppSelector(selectDecodeLoading);
  const isEncodeLoading = useAppSelector(selectEncodeLoading);
  useEffect(() => {
    if (decode)
      setForm((prevState) => {
        return { ...prevState, encoded: decode.decoded };
      });
    if (encode)
      setForm((prevState) => {
        return { ...prevState, decoded: encode.encoded };
      });
  }, [decode, encode]);

  const clickEncode = async () => {
    if (form.password.trim().length > 0 && form.encoded.trim().length > 0) {
      await dispatch(
        fetchEncode({ encoded: form.encoded, password: form.password }),
      );
    } else {
      toast.error("Заполните необходимые поля");
    }
  };

  const clickDecode = async () => {
    if (form.password.trim().length > 0 && form.decoded.trim().length > 0) {
      await dispatch(
        fetchDecode({ decoded: form.decoded, password: form.password }),
      );
    } else {
      toast.error("Заполните необходимые поля");
    }
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setForm((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  return (
    <>
      {isEncodeLoading || isDecodeLoading ? (
        <>
          <CircularProgress />
        </>
      ) : (
        <form autoComplete="off">
          <Grid
            container
            marginTop={10}
            size={12}
            direction="column"
            spacing={2}
          >
            <Grid size={8} margin={"auto"}>
              <TextField
                fullWidth
                multiline
                rows={4}
                id="decoded"
                label="Decoded message"
                value={form.encoded}
                onChange={inputChangeHandler}
                name="encoded"
              />
            </Grid>

            <Grid
              container
              size={8}
              spacing={3}
              direction={"row"}
              margin={"auto"}
            >
              <Grid size={8} textAlign={"left"}>
                <TextField
                  fullWidth
                  id="price"
                  label="Password"
                  value={form.password}
                  onChange={inputChangeHandler}
                  name="password"
                />{" "}
              </Grid>
              <Button
                type={"button"}
                style={{ padding: "0" }}
                onClick={() => clickEncode()}
              >
                {" "}
                <ArrowDownwardIcon fontSize="large" />
              </Button>
              <Button type={"button"} onClick={() => clickDecode()}>
                <ArrowUpwardIcon fontSize="large" />
              </Button>
            </Grid>
            <Grid size={8} margin={"auto"}>
              <TextField
                fullWidth
                multiline
                rows={4}
                id="encoced"
                label="Encoded message"
                value={form.decoded}
                onChange={inputChangeHandler}
                name="decoded"
              />
            </Grid>
          </Grid>
        </form>
      )}
    </>
  );
};

export default ProductForm;
