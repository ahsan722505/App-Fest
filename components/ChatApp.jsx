import { Button } from "@mui/base";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Chat from "../components/Chat";

const ChatApp = () => {
  const router = useRouter();
  const { courseId } = router.query;
  console.log("mycourseId", courseId);
  const [show, setShow] = useState(false);
  return (
    <>
      <button onClick={() => setShow(true)} className="bg-slate-700 text-white">
        Start Chat
      </button>

      {show && <Chat room={courseId} />}
    </>
  );
};

export default ChatApp;
