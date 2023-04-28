import { db } from "@/config/firebase";
import { Button } from "@mui/material";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { EnrollStatus } from "../CourseCard";

const RequestEnrollment = ({
  courseId,
  enrollStatus,
  setEnrollStatus,
}: {
  courseId: string;
  enrollStatus: EnrollStatus;
  setEnrollStatus: (arg: EnrollStatus) => void;
}) => {
  const router = useRouter();
  useEffect(() => {
    const q = query(
      collection(db, "enrollmentRequests"),
      where("courseId", "==", courseId),
      where("userId", "==", "20OKysQ5TDmeidHpCWwA")
    );

    getDocs(q).then((querySnapshot) => {
      let tempStatus;
      querySnapshot.forEach((doc) => {
        console.log(doc.data());
        tempStatus = doc.data().status;
        console.log("temp", tempStatus);
      });
      if (!tempStatus) setEnrollStatus("unrequested");
      else setEnrollStatus(tempStatus);
    });
  }, []);

  const enrollHandler = async () => {
    await addDoc(collection(db, "enrollmentRequests"), {
      courseId: courseId,
      userId: "20OKysQ5TDmeidHpCWwA",
      status: "pending",
    });
    setEnrollStatus("pending");
  };
  return (
    <>
      {enrollStatus === "unrequested" && (
        <Button onClick={enrollHandler}>Request Enrollment</Button>
      )}
      {(enrollStatus === "pending" ||
        enrollStatus === "rejected" ||
        enrollStatus === "enrolled") && (
        <p>Enrollment Status : {enrollStatus}</p>
      )}
    </>
  );
};

export default RequestEnrollment;
