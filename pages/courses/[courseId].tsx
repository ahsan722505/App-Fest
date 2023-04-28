import { useRouter } from "next/router";
import React from "react";

const Index = () => {
  const router = useRouter();
  const courseId = router.query.courseId;
  return <div>{courseId}</div>;
};

export default Index;
