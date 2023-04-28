import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { useRouter } from "next/router";
import { UserContext } from "@/contexts/userContext";
import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "@/config/firebase";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { SnackContext } from "@/contexts/SnackbarContext";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
// assignment title, description, topic, due date, points, file upload

export default function PostAssignment() {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [topic, setTopic] = React.useState("");
  const [dueDate, setDueDate] = React.useState("");
  const [points, setPoints] = React.useState("");
  const [file, setFile] = React.useState("");
  const [fileList, setFileList] = React.useState([]); // [{name: "file1", url: "url1"}, {name: "file2", url: "url2"}
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const userCTX = React.useContext(UserContext);
  const snackCTX = React.useContext(SnackContext);

  const userId = userCTX?.user?.id;
  const courseId = router.query.courseId;

  const handleFileChange = (e: any) => {
    setFileList(e.target.files);
  };

  const handleUploadClick = async () => {
    if (!fileList) {
      return;
    }
    // upload all files one by one
    // make promise array

    let promiseArray = [];

    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      const storageRef = ref(storage, `assignments/${file.name}`);
      let promise = uploadBytes(storageRef, file);
      promiseArray.push(promise);
    }

    // wait for all promises to resolve
    let snapshotArray = await Promise.all(promiseArray);
    console.log("snapshotArray", snapshotArray);

    // get download url for each file

    let downloadUrls = [];
    for (let i = 0; i < snapshotArray.length; i++) {
      const snapshot = snapshotArray[i];
      const url = await getDownloadURL(snapshot.ref);
      downloadUrls.push(url);
    }
    console.log("downloadUrls", downloadUrls);
    // go to collection named "assignments" and add a document with all the data, date and downloadUrls
    const docRef = await addDoc(collection(db, "assignments"), {
      title,
      description,
      topic,
      dueDate: new Date(dueDate).getTime(),
      urls: downloadUrls,
      points,
      courseId,
      userId,
    });

    snackCTX.setSnackInfo({
      open: true,
      message: "Assignment posted successfully",
      severity: "success",
    });

    console.log("Document written with ID: ", docRef.id);
    // clear all fields
    setTitle("");
    setDescription("");
    setTopic("");
    setDueDate("");
    setPoints("");
    setFile("");
    setFileList([]);

    setOpen(false);
  };

  console.log("files uploaded", file);
  const files = fileList ? [...fileList] : [];
  return (
    <div>
      <Button variant="outlined" onClick={() => setOpen(true)}>
        Open full-screen dialog
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={() => setOpen(false)}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => setOpen(false)}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Add Assignment
            </Typography>
            <Button autoFocus color="inherit" onClick={handleUploadClick}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <List>
          <ListItem autoFocus button>
            <ListItemText
              primary="Assignment Title"
              secondary={
                <TextField
                  id="outlined-basic"
                  label="Outlined"
                  variant="outlined"
                  value={title}
                  fullWidth
                  onChange={(e) => setTitle(e.target.value)}
                />
              }
            />
          </ListItem>
          <ListItem autoFocus button>
            <ListItemText
              primary="Description"
              secondary={
                <TextField
                  id="outlined-basic"
                  label="Outlined"
                  variant="outlined"
                  value={description}
                  fullWidth
                  onChange={(e) => setDescription(e.target.value)}
                />
              }
            />
          </ListItem>

          <ListItem autoFocus button>
            <ListItemText
              primary="Topic"
              secondary={
                <TextField
                  id="outlined-basic"
                  label="Outlined"
                  variant="outlined"
                  value={topic}
                  fullWidth
                  onChange={(e) => setTopic(e.target.value)}
                />
              }
            />
          </ListItem>
          <Divider sx={{ marginY: "10px" }} />
          <ListItem autoFocus button>
            <ListItemText
              primary="Due Date"
              secondary={
                <TextField
                  type={"date"}
                  id="outlined-basic"
                  label="Outlined"
                  variant="outlined"
                  value={dueDate}
                  fullWidth
                  onChange={(e) => setDueDate(e.target.value)}
                />
              }
            />
          </ListItem>
          <ListItem autoFocus button>
            <ListItemText
              primary="Points"
              secondary={
                <TextField
                  id="outlined-basic"
                  label="Outlined"
                  variant="outlined"
                  value={points}
                  fullWidth
                  onChange={(e) => setPoints(e.target.value)}
                />
              }
            />
          </ListItem>

          <Divider sx={{ marginY: "10px" }} />

          {/* show count of files uploaded */}

          <Box>
            <input
              className="ml-4"
              type="file"
              onChange={handleFileChange}
              multiple
            />

            <ul className="ml-5">
              {files.map((file, i) => (
                <li key={i}>
                  {file.name} - {file.type}
                </li>
              ))}
            </ul>
          </Box>
        </List>
      </Dialog>
    </div>
  );
}
