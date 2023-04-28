import PostAssignment from "@/components/PostAssignment";
import ChatApp from "@/components/ChatApp";

import { useRouter } from "next/router";
import React from "react";

const Index = () => {
  const router = useRouter();
  const courseId = router.query.courseId;
  return (
    <div>
      <PostAssignment />
      <ChatApp />

      {courseId}
    </div>
  );
};

export default Index;
