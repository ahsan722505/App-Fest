import { UserContext } from "@/contexts/userContext";
import { Course } from "@/pages/dashboard/teacher";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import RequestEnrollment from "./Student/RequestEnrollment";
export type EnrollStatus = "pending" | "rejected" | "enrolled" | "unrequested" | "";
const CourseCard = ({ course }: { course: Course }) => {
	const router = useRouter();
	const [enrollStatus, setEnrollStatus] = useState<EnrollStatus>("");
	const { user } = useContext(UserContext);
	return (
		<div
			className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
			onClick={() => enrollStatus === "enrolled" || (user.type === "teacher" && router.push(`/courses/${course.id}`))}>
			<a href="#">
				<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{course.name}</h5>
			</a>
			<p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{course.overview}</p>
			{user.type === "student" && (
				<RequestEnrollment courseId={course.id} enrollStatus={enrollStatus} setEnrollStatus={setEnrollStatus} />
			)}
		</div>
	);
};

export default CourseCard;
