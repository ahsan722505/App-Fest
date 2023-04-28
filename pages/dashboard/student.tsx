import Courses from "@/components/Courses";
import { useState } from "react";
import Searchbar from "../../components/Searchbar";
import { Course } from "./teacher";

export default function Student() {
  const [courses, setCourses] = useState<Course[]>([]);
  return (
    <>
      <Courses courses={courses} setCourses={setCourses} />
    </>
  );
}
