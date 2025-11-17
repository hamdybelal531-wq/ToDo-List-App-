"use client";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Todo from "./todo";
import { useState, useEffect } from "react";
import { Stack } from "@mui/material";
import { useMemo } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import { SnackContext } from "./Snack";
import { ReducerContext } from "./contextreducer";
import { useContext } from "react";

// array Tasks
export const todos = [];

// array Tasks
// uuidv4();
// #5F5F5F
export default function TodoList() {
  //
  const { state, dispatch } = useContext(ReducerContext);
  //
  const [ChoseShowArray, SetShowArray] = useState("all");
  const [inputState, SetinputState] = useState("");
  const [openId, setOpenId] = useState(null);
  const [idForTask, SetidForTaask] = useState(null);
  const [idForEditeTask, SetEditeByTask] = useState(null);

  const { showSnack } = useContext(SnackContext);
  // handl Edite
  const [EditeState, setEditeState] = useState(null);
  // For Edite This Target
  //
  // For Input
  const [inputEditeState, SetEditeInput] = useState("");
  // For Input
  //

  useEffect(() => {
    const Thelocal = JSON.parse(localStorage.getItem("todos")) || [];
    dispatch({ type: "reload", pryload: Thelocal });
  }, []);

  function EditeById(id, titleSection) {
    setEditeState(true);
    SetEditeByTask(id);
    SetEditeInput(titleSection);
  }
  //   Handl Edite State
  function EditeStatevalue() {
    dispatch({
      type: "Edite",
      pryload: {
        idTask: idForEditeTask,
        inputState: inputEditeState,
      },
    });
  }
  //   Handl Edite State
  //
  // end Handle Edite
  function DeletTask(id) {
    SetidForTaask(id);
    setOpenId(true);
  }
  // Button Close
  function handlDelet() {
    dispatch({ type: "Delete", pryload: idForTask });
  }
  function handlClose() {
    setOpenId(null);
  }
  function HandlShowArray(e) {
    SetShowArray(e);
  }
  function handlinputToState(e) {
    SetinputState(e.target.value);
  }

  const filteredTodos = useMemo(() => {
    return state.filter((t) =>
      ChoseShowArray === "Completed"
        ? t.isCompleted
        : ChoseShowArray === "unCompleted"
        ? !t.isCompleted
        : true
    );
  }, [state, ChoseShowArray]);
  //    when click Add Section
  function handlclick() {
    dispatch({ type: "Add", pryload: inputState });
    SetinputState("");
  }
  return (
    <>
      {/* The pop For Edite */}
      <Dialog
        onClose={() => {
          setEditeState(null);
        }}
        maxWidth="sm"
        fullWidth
        className="p-10"
        open={EditeState}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Typography className="p-5">Write Here To Edite...</Typography>
        <div className="flex justify-center items-center">
          <TextField
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                EditeStatevalue();
                setEditeState(null);
                showSnack("Edite is Succefull");
              }
            }}
            value={inputEditeState}
            onChange={(e) => {
              SetEditeInput(e.target.value);
            }}
            className="m-auto block w-11/12"
          />
        </div>
        <DialogActions>
          <Button
            onClick={() => {
              setEditeState(null); //  يقفل البوباب عند الإلغاء
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              EditeStatevalue();
              setEditeState(null);
              showSnack("Edite is Succefull");
            }}
            autoFocus
          >
            Edite
          </Button>
        </DialogActions>
      </Dialog>
      {/* The pop For Edite */}
      {/* The Popab */}
      <Dialog
        onClose={() => {
          handlClose();
        }}
        open={openId}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are You sure For Delete it ?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description"></DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handlClose();
              setOpenId(null);
            }}
          >
            Disagree
          </Button>
          <Button
            autoFocus
            onClick={() => {
              handlDelet();
              setOpenId(null);
              showSnack("Delete is Succefull");
            }}
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      {/* The Popab */}
      <CardContent>
        {/* Heading Name */}
        <h1 className="text-center text-5xl p-5">ToDo List App</h1>
        {/* Heading Name */}
        {/*  */}
        {/* Button Chose */}
        <Stack
          direction="row"
          spacing={2}
          className="flex justify-center items-center pb-10"
        >
          <Button
            variant="contained"
            color={ChoseShowArray === "all" ? "primary" : ""}
            value="all"
            onClick={(e) => {
              HandlShowArray("all");
            }}
          >
            All
          </Button>
          <Button
            variant="contained"
            color={ChoseShowArray === "unCompleted" ? "primary" : ""}
            value="unCompleted"
            onClick={(e) => {
              HandlShowArray("unCompleted");
            }}
          >
            UnCompleted
          </Button>
          <Button
            variant="contained"
            color={ChoseShowArray === "Completed" ? "primary" : ""}
            value="Completed"
            onClick={(e) => {
              HandlShowArray("Completed");
            }}
          >
            Completed
          </Button>
        </Stack>
        {/* Button Chose */}
        {/* input and Button Add */}
        <Grid container spacing={2} alignItems="center">
          <Grid size={{ md: 9, xs: 12 }} className="w-fit">
            <TextField
              value={inputState}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handlclick();
                  showSnack("Add Is Succefull"); // نفس الدالة اللي بتضيف العنصر
                }
              }}
              onChange={(e) => {
                handlinputToState(e);
              }}
              className="w-full h-full"
              id="standard-basic"
              label="Write Your Task Here"
              variant="standard"
            />
          </Grid>
          <Grid size={{ md: 3, xs: 12 }} className="w-fit">
            <Button
              className="w-full h-full "
              variant="contained"
              onClick={() => {
                handlclick();
                if (inputState !== "") {
                  showSnack("Add Is Succefull");
                }
              }}
            >
              Add Task
            </Button>
          </Grid>
          {/* input and Button Add */}
        </Grid>
        <Todo
          todo={filteredTodos}
          DeleteByID={DeletTask}
          EditeById={EditeById}
        />
      </CardContent>
    </>
  );
}
