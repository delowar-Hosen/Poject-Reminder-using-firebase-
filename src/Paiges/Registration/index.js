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
    <div className=" mt-8">
      <Container>
        <div className="flex justify-center  w-full">
          <div className="flex justify-center  items-center">
            <picture>
              <img src="assests/images/regi.png" />
            </picture>
          </div>
          <div>
            <h1 className="font-san font-bold text-right   text-[40px] text-black">
              Share your mangement with REMINDER
            </h1>
            <div className="flex justify-end">
              <div className="w-[472px] mt-12 flex flex-col gap-y-8">
                {err && (
                  <p className="font-san font-bold text-lg py-2 rounded-[10px] uppercase bg-red-400 text-white w-full text-center">
                    {err}
                  </p>
                )}
                {success && (
                  <p className="font-san font-bold text-lg py-2 uppercase rounded-[10px]   bg-green-400 text-white w-full text-center">
                    {success}
                  </p>
                )}
                <input
                  onChange={handleEmail}
                  value={email}
                  type="email"
                  placeholder="Your Email"
                  className="w-full font-san font-bold placeholder:uppercase text-sm py-[22px] px-[30px] rounded-[10px] border"
                />
                <input
                  onChange={handleName}
                  type="text"
                  value={name}
                  placeholder="Enter Full Name"
                  className="w-full font-san font-bold placeholder:uppercase text-sm py-[22px] px-[30px] rounded-[10px] border"
                />
                <input
                  onChange={handlePassword}
                  type="password"
                  value={password}
                  placeholder="Enter your password"
                  className="w-full font-san font-bold placeholder:uppercase text-sm py-[22px] px-[30px] rounded-[10px] border"
                />
                <input
                  onChange={handleCPassword}
                  value={cPassword}
                  type="password"
                  placeholder="Confirm your password"
                  className="w-full mb-8 font-san font-bold placeholder:uppercase text-sm py-[22px] px-[30px] rounded-[10px] border"
                />
                {loader ? (
                  <div className="w-full  flex justify-center items-center border border-solid rounded-[5px] ">
                    <ThreeDots
                      height="80"
                      width="80"
                      radius="9"
                      color="#4fa94d"
                      ariaLabel="three-dots-loading"
                      wrapperStyle={{}}
                      wrapperClassName=""
                      visible={true}
                    />
                  </div>
                ) : (
                  <button
                    onClick={handleSubmit}
                    className="font-san font-bold text-white bg-black rounded-[5px] text-[28px] py-[14px] text-center"
                  >
                    SIGN UP
                  </button>
                )}

                <div className="text-center">
                  <h3 className="font-san  font-medium text-base text-black uppercase">
                    Already Have An Account!<Link to="/login"> Login</Link>{" "}
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
