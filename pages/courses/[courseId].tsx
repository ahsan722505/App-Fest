import EnrollmentRequests from "@/components/Teacher/EnrollmentRequests";
import { useRouter } from "next/router";
import React from "react";

const Index = () => {
  const router = useRouter();
  const courseId = router.query.courseId;
  return <EnrollmentRequests />;
};

export default Index;
