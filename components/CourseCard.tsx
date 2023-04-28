import { Course } from "@/pages/dashboard/teacher";
import { useRouter } from "next/router";
import React from "react";

const CourseCard = ({ course }: { course: Course }) => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/courses/${course.id}`)}
      style={{ background: "red", marginBottom: "2rem", cursor: "pointer" }}
    >
      <h1>{course.name}</h1>
      <p>{course.overview}</p>
    </div>
  );
};

export default CourseCard;
