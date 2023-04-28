import { db } from "@/config/firebase";
import { Button } from "@mui/base";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
type Request = {
  username: string;
  userId: string;
  id: string;
};
const EnrollmentRequests = () => {
  const [requests, setRequests] = useState<Request[]>([]);
  const router = useRouter();
  const courseId = router.query.courseId;
  useEffect(() => {
    if (!courseId) return;
    const q = query(
      collection(db, "enrollmentRequests"),
      where("courseId", "==", courseId),
      where("status", "==", "pending")
    );
    const promises = [];
    const req = [];
    getDocs(q).then((querySnapshot) => {
      querySnapshot.forEach((docu) => {
        const dat = docu.data();
        promises.push(getDoc(doc(db, "users", dat.userId)));
        req.push({
          id: docu.id,
          userId: dat.userId,
        });
      });
      Promise.all(promises).then((docs) => {
        docs.forEach((doc, index) => {
          req[index].username = doc.data().email;
        });
        setRequests(req);
      });
    });
  }, [courseId]);
  console.log(requests);
  const approveHandler = (id) => {
    const cityRef = doc(db, "enrollmentRequests", id);
    setDoc(cityRef, { status: "enrolled" }, { merge: true });
    location.reload();
  };
  const rejectHandler = (id) => {
    const cityRef = doc(db, "enrollmentRequests", id);
    setDoc(cityRef, { status: "rejected" }, { merge: true });
    location.reload();
  };

  return (
    <div>
      <h1>Enrollment Requests</h1>
      {requests.map((r) => (
        <li style={{ background: "red", marginBottom: "2rem" }}>
          <p>{r.username}</p>
          <button
            onClick={() => approveHandler(r.id)}
            style={{ marginRight: "1rem" }}
          >
            Approve
          </button>
          <button onClick={() => rejectHandler(r.id)}>Reject</button>
        </li>
      ))}
    </div>
  );
};

export default EnrollmentRequests;
