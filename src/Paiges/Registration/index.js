import React, { useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import Container from "../../Components/Container";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import { getDatabase, ref, set, push } from "firebase/database";
import { Helmet } from "react-helmet";

const Registration = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [err, setErr] = useState("");
  const [validErr, setValidErr] = useState("");
  const [success, setSuccess] = useState("");
  const [loader, setLoader] = useState(false);

  let auth = getAuth();
  const navigate = useNavigate();
  const db = getDatabase();

  let handleName = (e) => {
    setName(e.target.value);
    setErr("");
  };

  let handleEmail = (e) => {
    setEmail(e.target.value);
    setErr("");
    setValidErr("");
  };

  let handlePassword = (e) => {
    setPassword(e.target.value);
  };

  let handleCPassword = (e) => {
    setCPassword(e.target.value);
  };

  let handleSubmit = () => {
    setErr("");
    if (!email) {
      setErr("Email Is Required");
    } else if (!email.toLowerCase().match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
      setErr("Email Is Not Valid");
    } else if (!name) {
      setErr("Name Is Required");
    } else if (!password) {
      setErr("password Is Required");
    } else if (!cPassword) {
      setErr("Confirm Your Password");
    } else if (password != cPassword) {
      setErr("Password Dont Match");
    }

    if (
      email &&
      name &&
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) &&
      password &&
      password == cPassword
    ) {
      setLoader(true);
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: "assests/images/avatar.png",
          })
            .then(() => {
              // Profile updated!
              sendEmailVerification(auth.currentUser)
                .then(() => {
                  // Email verification sent!
                  setSuccess("Please Verify Your Email Address For Login");
                })
                .then(() => {
                  setSuccess("");
                  setSuccess("Your Registration Is Complete");
                  set(ref(db, "users/" + auth.currentUser.uid), {
                    name: name,
                    email: email,
                    id: auth.currentUser.uid,
                    avatar: auth.currentUser.photoURL,
                    created: `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}-${new Date().getHours()}-${new Date().getMinutes()}`,
                  });
                  setTimeout(() => {
                    navigate("/login");
                  }, 2000);
                });
            })
            .catch((error) => {
              // An error occurred
              console.log(error);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage);
          if (errorMessage.includes("auth/email-already-in-use")) {
            setErr("This email already in use ! try another");
            setLoader(false);
          }
          // ..
        });
    }
  };

  return (
    <div>
      <Helmet>
        <title>Registration</title>
      </Helmet>
      <Container>
        <div className="flex justify-center items-center  w-full h-screen">
          <div className="flex  justify-center items-center w-1/2 ">
            <picture>
              <img
                className="w-[400px] h-[400px]"
                src="assests/images/regi.png"
              />
            </picture>
          </div>
          <div className="w-1/2">
            <div className="w-[400px] mb-4">
              {err && (
                <p className="font-san font-bold text-sm py-1 rounded-[30px]  capitalize border-b border-solid border-[#1e2833] bg-red-400 text-white w-full text-center">
                  {err}
                </p>
              )}
              {success && (
                <p className="font-san font-bold text-sm py-1  capitalize rounded-[30px] border-b border-solid border-[#1e2833]   bg-green-400 text-white w-full text-center">
                  {success}
                </p>
              )}
            </div>
            <div className="  flex">
              <h1 className="w-[400px]  rounded-[30px]  font-san capitalize pr-5 font-bold text-center bg-[#1e2833]  text-lg   text-white">
                Reminder
              </h1>
            </div>

            <div className="flex">
              <div className="w-[400px] bg-[#1e2833] p-5 rounded-md mt-5 flex flex-col gap-y-3">
                <p className="text-center text-white text-lg font-san font-semibold">
                  Register Here !
                </p>

                <input
                  onChange={handleEmail}
                  value={email}
                  type="email"
                  placeholder="Your Email"
                  className="w-full font-san flex justify-center font-semibold placeholder:text-white  placeholder:text-center placeholder:capitalize  text-sm bg-[#1e2833] py-[10px] text-white px-[30px] rounded-[30px] border"
                />
                <input
                  onChange={handleName}
                  type="text"
                  value={name}
                  placeholder="Enter Full Name"
                  className="w-full font-san flex justify-center font-semibold placeholder:text-white  placeholder:text-center placeholder:capitalize  text-sm bg-[#1e2833] py-[10px] text-white px-[30px] rounded-[30px] border"
                />
                <input
                  onChange={handlePassword}
                  type="password"
                  value={password}
                  placeholder="Enter your password"
                  className="w-full font-san flex justify-center font-semibold placeholder:text-white  placeholder:text-center placeholder:capitalize  text-sm bg-[#1e2833] py-[10px] text-white px-[30px] rounded-[30px] border"
                />
                <input
                  onChange={handleCPassword}
                  value={cPassword}
                  type="password"
                  placeholder="Confirm your password"
                  className="w-full font-san flex justify-center font-semibold placeholder:text-white  placeholder:text-center placeholder:capitalize  text-sm bg-[#1e2833] py-[10px] text-white px-[30px] rounded-[30px] border"
                />
                {loader ? (
                  <div className="w-full font-san flex justify-center font-bold  text-sm bg-[#9b9ea1] py-[10px] mt-6 text-white uppercase px-[30px] rounded-[30px] border">
                    <ThreeDots
                      height="20"
                      width="20"
                      radius="9"
                      color="#1e2833"
                      ariaLabel="three-dots-loading"
                      wrapperStyle={{}}
                      wrapperClassName=""
                      visible={true}
                    />
                  </div>
                ) : (
                  <button
                    onClick={handleSubmit}
                    className="w-full font-san flex justify-center font-bold  text-sm bg-[#9b9ea1] py-[10px] mt-6 text-white uppercase px-[30px] rounded-[30px] border"
                  >
                    Submit
                  </button>
                )}

                <div className="text-center">
                  <h3 className="w-full mt-12 font-san flex justify-center font-semibold placeholder:text-white  placeholder:text-center placeholder:capitalize  text-sm bg-[#1e2833] py-[10px] text-white px-[30px] rounded-[30px] border">
                    Already Have An Account !{" "}
                    <Link className="ml-2" to="/login">
                      {" "}
                      Login
                    </Link>{" "}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Registration;
