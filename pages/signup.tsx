import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { TextField } from "@mui/material";
import { createUserWithEmailAndPassword, inMemoryPersistence, setPersistence } from "firebase/auth";
import { UserContext } from "@/contexts/userContext";
import { SnackContext } from "@/contexts/SnackbarContext";
import { auth, db } from "../config/firebase";
import { addDoc, collection, doc, getDoc, getDocs, query, setDoc, where } from "firebase/firestore";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

let google = (
	<svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 18 18" version="1.1">
		<script />
		<title>logo_google</title>
		<desc>Created with Sketch.</desc>
		<defs />
		<g
			id="Toptal_login_desktop"
			stroke="none"
			stroke-width="1"
			fill="none"
			fillRule="evenodd"
			transform="translate(-732.000000, -965.000000)">
			<g id="Group" transform="translate(608.000000, 944.000000)">
				<g id="Group-3">
					<g id="Group-2" transform="translate(124.000000, 21.000000)">
						<g id="logo_google">
							<path
								d="M17.64,9.20454545 C17.64,8.56636364 17.5827273,7.95272727 17.4763636,7.36363636 L9,7.36363636 L9,10.845 L13.8436364,10.845 C13.635,11.97 13.0009091,12.9231818 12.0477273,13.5613636 L12.0477273,15.8195455 L14.9563636,15.8195455 C16.6581818,14.2527273 17.64,11.9454545 17.64,9.20454545 L17.64,9.20454545 Z"
								id="Shape"
								fill="#4285F4"
							/>
							<path
								d="M9,18 C11.43,18 13.4672727,17.1940909 14.9563636,15.8195455 L12.0477273,13.5613636 C11.2418182,14.1013636 10.2109091,14.4204545 9,14.4204545 C6.65590909,14.4204545 4.67181818,12.8372727 3.96409091,10.71 L0.957272727,10.71 L0.957272727,13.0418182 C2.43818182,15.9831818 5.48181818,18 9,18 L9,18 Z"
								id="Shape"
								fill="#34A853"
							/>
							<path
								d="M3.96409091,10.71 C3.78409091,10.17 3.68181818,9.59318182 3.68181818,9 C3.68181818,8.40681818 3.78409091,7.83 3.96409091,7.29 L3.96409091,4.95818182 L0.957272727,4.95818182 C0.347727273,6.17318182 0,7.54772727 0,9 C0,10.4522727 0.347727273,11.8268182 0.957272727,13.0418182 L3.96409091,10.71 L3.96409091,10.71 Z"
								id="Shape"
								fill="#FBBC05"
							/>
							<path
								d="M9,3.57954545 C10.3213636,3.57954545 11.5077273,4.03363636 12.4404545,4.92545455 L15.0218182,2.34409091 C13.4631818,0.891818182 11.4259091,0 9,0 C5.48181818,0 2.43818182,2.01681818 0.957272727,4.95818182 L3.96409091,7.29 C4.67181818,5.16272727 6.65590909,3.57954545 9,3.57954545 L9,3.57954545 Z"
								id="Shape"
								fill="#EA4335"
							/>
						</g>
					</g>
				</g>
			</g>
		</g>
	</svg>
);

const Signup = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const router = useRouter();
	const { type } = router.query;
	const userCTX = useContext(UserContext);
	const snackCTX = useContext(SnackContext);
	//   make login page with email password textdield. OR text , google button
	const provider = new GoogleAuthProvider();

	useEffect(() => {
		if (!type) router.push("/");
	});

	const handleSignup = async () => {
		try {
			// await setPersistence(auth, inMemoryPersistence);
			const userCredential = await createUserWithEmailAndPassword(auth, email, password);
			// check if user exists in db
			const docRef = query(collection(db, "users"), where("email", "==", userCredential.user.email));

			const querySnapshot = await getDocs(docRef);
			if (!querySnapshot.empty) {
				let doc = querySnapshot.docs[0];
				userCTX.setUser({
					id: doc.id,
					type: doc.data().type,
				});

				snackCTX.setSnackInfo({
					open: true,
					message: "Signed up successfuly",
					severity: "success",
				});
				return;
			}
			console.log("no user found");
			// get doc id that we are going to add

			let doc = await addDoc(collection(db, "users"), {
				email: userCredential.user.email,
				type: type,
			});

			console.log("Document written with ID: ", doc.id);
			userCTX.setUser({
				id: doc.id,
				type: type,
			});

			snackCTX.setSnackInfo({
				open: true,
				message: "Signed up successfuly",
				severity: "success",
			});
			router.push(`/dashboard/${type}`);
		} catch (error) {
			console.log(error);
			const errorMessage = error.message;
			console.log(errorMessage);
			snackCTX.setSnackInfo({
				open: true,
				message: "Sign up failed!",
				severity: "error",
			});
		}
	};
	const handleGoogleLogin = async () => {
		try {
			// await setPersistence(auth, inMemoryPersistence);
			const result = await signInWithPopup(auth, provider);
			// This gives you a Google Access Token. You can use it to access the Google API.
			// check if user exists in db
			const docRef = query(collection(db, "users"), where("email", "==", result.user.email));
			const querySnapshot = await getDocs(docRef);
			if (!querySnapshot.empty) {
				let doc = querySnapshot.docs[0];
				userCTX.setUser({
					id: doc.id,
					email: doc.data().email,
					type: doc.data().type,
				});

				snackCTX.setSnackInfo({
					open: true,
					message: "Signed up successfuly",
					severity: "success",
				});
				return;
			}

			const res = await addDoc(collection(db, "users"), {
				email: result.user.email,
				type: type,
			});
			// get doc id that we just added
			let fireStoreDocId = res.id;
			userCTX.setUser({
				id: fireStoreDocId,
				email: result.user.email,
				type: type,
			});
			snackCTX.setSnackInfo({
				open: true,
				message: "Signed up successfuly",
				severity: "success",
			});
			router.push(`/dashboard/${type}`);
		} catch (error) {
			const errorMessage = error.message;
			console.log(errorMessage);
			snackCTX.setSnackInfo({
				open: true,
				message: "Sign up failed!",
				severity: "error",
			});
		}
	};
	return (
		<div>
			<div className="max-w-[400px] mx-auto">
				<h1 className="font-extralight text-[52px]">Sign up</h1>
				<p className="text-[#828282] text-[20px] mt-4">
					{type === "teacher" ? "Log in as a teacher" : "Log in as a student"}
				</p>
				<div className="mt-10">
					<TextField
						id="outlined-basic"
						label="Email"
						variant="outlined"
						className="w-full"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>

					<TextField
						id="outlined-basic"
						label="Password"
						variant="outlined"
						className="w-full mt-4"
						sx={{ marginTop: "20px" }}
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>

					<button onClick={handleSignup} className="w-full mt-4 bg-[#00cc83] text-white py-3.5 text-lg">
						Sign up
					</button>

					<p className="text-[#828282] text-[20px] mt-4 my-5">
						Already have an account?{" "}
						<span
							className="text-[#3F6AE0]"
							style={{ cursor: "pointer" }}
							onClick={() =>
								router.push({
									pathname: "/login",
									query: {
										type: type,
									},
								})
							}>
							Log in
						</span>
					</p>

					<p className="text-center py-4">OR</p>
					<button
						onClick={handleGoogleLogin}
						className="w-full mt-4 py-3.5 bg-[#0077b5 flex items-center justify-center gap-5 bg-slate-100 rounded">
						{google}
						Sign up with Google
					</button>
				</div>
			</div>
		</div>
	);
};

export default Signup;
