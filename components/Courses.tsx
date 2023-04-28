import { db } from "@/config/firebase";
import { Course } from "@/pages/dashboard/teacher";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect } from "react";
import CourseCard from "./CourseCard";

const Courses = ({
  courses,
  setCourses,
}: {
  courses: Course[];
  setCourses: (arg: Course[]) => void;
}) => {
  useEffect(() => {
    getDocs(collection(db, "courses")).then((querySnapshot) => {
      const data: Course[] = [];
      querySnapshot.forEach((doc) => {
        const docId = doc.id;
        data.push({ ...doc.data(), id: docId } as Course);
      });
      setCourses(data);
    });
  }, []);
  return (
    <>
      {courses.map((course) => (
        <CourseCard course={course} />
      ))}
    </>
  );
};

export default Courses;
