"use client";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import { Stack } from "@mui/system";
import { SnackContext } from "./Snack";
import { ReducerContext } from "./contextreducer";
import { useContext } from "react";

// popab end

export default function Todo({ todo, DeleteByID, EditeById }) {
  //
  const { state, dispatch } = useContext(ReducerContext);
  //
  // For Open This Target
  const { showSnack } = useContext(SnackContext);
  // For Open This Target
  //
  // For Edite This Target
  function handlEditeGetid(id, titleSection) {
    EditeById(id, titleSection);
  }
  //   Handl Edite State
  //
  //   closePopab

  //   Save todo
  function handlSavetodo(id) {
    dispatch({ type: "Save", pryload: id });
  }
  //   Save todo

  // Delete
  // Delete
  function GetidForDelet(id) {
    DeleteByID(id);
  }
  // Delete
  return (
    <>
      {todo.map((t) => {
        return (
          <Grid
            key={t.id}
            container
            spacing={2}
            alignItems="center"
            className="mt-8 bg-[white] p-5 rounded-3xl"
          >
            <Grid size={{ md: 9, xs: 12 }} className="">
              <Typography className="wrap-break-word">
                {t.titleSection}
              </Typography>
            </Grid>

            <Grid size={{ md: 3, xs: 12 }} className="flex justify-end">
              <Stack direction="row" spacing={1}>
                <IconButton
                  aria-label="check"
                  size="medium"
                  onClick={() => {
                    handlSavetodo(t.id);
                    showSnack(
                      t.isCompleted
                        ? " Un Save is Succefull"
                        : "Save is Succefull"
                    );
                  }}
                >
                  <CheckIcon
                    fontSize={t.isCompleted ? "large" : "inherit"}
                    sx={{
                      color: t.isCompleted ? "White" : "gray",
                      background: t.isCompleted ? "#777" : "",
                      borderRadius: "50%",
                    }}
                  />
                </IconButton>
                <IconButton aria-label="edit" size="medium">
                  <EditIcon
                    fontSize="inherit"
                    onClick={() => {
                      handlEditeGetid(t.id, t.titleSection);
                    }}
                  />
                </IconButton>
                <IconButton aria-label="delete" size="medium">
                  <DeleteIcon
                    fontSize="inherit"
                    onClick={() => {
                      GetidForDelet(t.id);
                    }}
                  />
                </IconButton>
              </Stack>
            </Grid>
          </Grid>
        );
      })}
    </>
  );
}
