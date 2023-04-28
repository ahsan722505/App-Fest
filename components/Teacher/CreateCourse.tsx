import { Course } from "@/pages/dashboard/teacher";
import { Box, Button, Input, Modal, Typography } from "@mui/material";
import React, { useState } from "react";
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const CreateCourse = ({
  showModal,
  setShowModal,
  onCreateCourse,
}: {
  showModal: boolean;
  setShowModal: (arg: boolean) => void;
  onCreateCourse: (course: Pick<Course, "name" | "overview">) => void;
}) => {
  const [courseName, setCourseName] = useState("");
  const [courseOverview, setCourseOverview] = useState("");

  return (
    <Modal
      open={showModal}
      onClose={() => setShowModal(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onCreateCourse({ name: courseName, overview: courseOverview });
          }}
        >
          <Input
            required
            placeholder="Course Name"
            onChange={(e) => setCourseName(e.target.value)}
          />
          <Input
            required
            placeholder="Course Overiew"
            onChange={(e) => setCourseOverview(e.target.value)}
          />
          <Button type="submit">Create</Button>
        </form>
      </Box>
    </Modal>
  );
};

export default CreateCourse;
