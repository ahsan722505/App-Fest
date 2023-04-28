import { Course } from "@/pages/dashboard/teacher";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import React, { useState } from "react";
import RequestEnrollment from "./Student/RequestEnrollment";
export type EnrollStatus =
  | "pending"
  | "rejected"
  | "enrolled"
  | "unrequested"
  | "";
const CourseCard = ({ course }: { course: Course }) => {
  const router = useRouter();
  const [enrollStatus, setEnrollStatus] = useState<EnrollStatus>("");

  return (
    <div
      onClick={() =>
        enrollStatus === "enrolled" && router.push(`/courses/${course.id}`)
      }
      style={{ background: "red", marginBottom: "2rem", cursor: "pointer" }}
    >
      <h1>{course.name}</h1>
      <p>{course.overview}</p>
      <RequestEnrollment
        courseId={course.id}
        enrollStatus={enrollStatus}
        setEnrollStatus={setEnrollStatus}
      />
    </div>
  );
};

export default CourseCard;
