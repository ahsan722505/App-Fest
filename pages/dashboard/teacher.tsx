import CourseCard from "@/components/CourseCard";
import CreateCourse from "@/components/Teacher/CreateCourse";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
export type Course = {
  name: string;
  overview: string;
  id: string;
};
import { db } from "@/config/firebase";
import { addDoc, collection, doc, getDocs, setDoc } from "firebase/firestore";
import Courses from "@/components/Courses";
export default function Teacher() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [showCreateCourseModal, setShowCreateCourseModal] = useState<boolean>();
  const createCourseHandler = async (
    course: Pick<Course, "name" | "overview">
  ) => {
    const coursesRef = collection(db, "courses");
    const doc = await addDoc(coursesRef, {
      name: course.name,
      overview: course.overview,
    });
    setCourses([...courses, { ...course, id: doc.id }]);
    setShowCreateCourseModal(false);
  };

  return (
    <>
      <Button onClick={() => setShowCreateCourseModal(true)}>
        Create Course
      </Button>
      <Courses courses={courses} setCourses={setCourses} />
      <CreateCourse
        showModal={showCreateCourseModal}
        setShowModal={setShowCreateCourseModal}
        onCreateCourse={createCourseHandler}
      />
    </>
  );
}
