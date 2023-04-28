import { db } from "@/config/firebase";
import {
  AppBar,
  Button,
  Dialog,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import {
  collection,
  doc,
  onSnapshot,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { useRouter } from "next/router";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";

//input and button to grade assignment single assignment, recieves assignment id and student id

// render input and button
// on button click, update assignment with grade
const GradeAssignment = ({ assignmentId }) => {
  const [grade, setGrade] = React.useState("");

  const handleSubmit = async () => {
    // update assignment with grade
    await setDoc(
      doc(db, "assignments", assignmentId),
      {
        grade: grade,
      },
      { merge: true }
    );
  };

  return (
    <div>
      <TextField
        label="Grade"
        variant="outlined"
        value={grade}
        onChange={(e) => setGrade(e.target.value)}
      />
      <Button variant="outlined" onClick={handleSubmit}>
        Grade
      </Button>
    </div>
  );
};

export const Assignments = () => {
  const router = useRouter();
  const courseId = router.query.courseId;
  const [assignments, setAssignments] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [selectedAssignment, setSelectedAssignment] = React.useState(null);
  const [assignmentSubmissions, setAssignmentSubmissions] = React.useState([]);

  const handleAssignmentClick = (assignment) => {
    setSelectedAssignment(assignment);
    setOpen(true);
  };

  React.useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "assignments"), where("courseId", "==", courseId)),
      (snapshot) => {
        let assignments = [];
        snapshot.forEach((doc) => {
          assignments.push({ id: doc.id, ...doc.data() });
        });
        setAssignments(assignments);
      }
    );
    return () => unsubscribe();
  }, []);

  React.useEffect(() => {
    if (!selectedAssignment) {
      return;
    }
    const unsubscribe = onSnapshot(
      query(
        collection(db, "submissions"),
        where("assignmentId", "==", selectedAssignment.id)
      ),
      (snapshot) => {
        let submissions = [];
        snapshot.forEach((doc) => {
          submissions.push({ id: doc.id, ...doc.data() });
        });
        setAssignmentSubmissions(submissions);
      }
    );
    return () => unsubscribe();
  }, [selectedAssignment]);

  return (
    <div>
      <h1 className="text-2xl font-bold">Assignments</h1>
      <div className="mt-5">
        <Button variant="outlined" onClick={() => setOpen(true)}>
          Add Assignment
        </Button>
      </div>
      <div className="mt-5">
        <List>
          {assignments.map((assignment) => (
            <ListItem
              key={assignment.id}
              button
              onClick={() => handleAssignmentClick(assignment)}
            >
              <ListItemText
                primary={assignment.title}
                secondary={assignment.description}
              />
            </ListItem>
          ))}
        </List>
      </div>
      <Dialog open={open} onClose={() => setOpen(false)}>
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
              Assignment Submissions
            </Typography>
          </Toolbar>
        </AppBar>
        <List>
          {assignmentSubmissions.map((submission) => (
            <ListItem key={submission.id} button>
              <ListItemText primary={submission.studentName} />
              <GradeAssignment assignmentId={submission.id} />
            </ListItem>
          ))}
        </List>
      </Dialog>
    </div>
  );
};
