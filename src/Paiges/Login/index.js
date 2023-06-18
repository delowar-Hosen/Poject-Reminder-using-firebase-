import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Container from "../../Components/Container";
import { ThreeDots } from "react-loader-spinner";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Helmet } from "react-helmet";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validErr, setValidErr] = useState("");
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");
  const [loader, setLoader] = useState(false);

  const auth = getAuth();
  const navigate = useNavigate();

  let handleEmail = (e) => {
    setEmail(e.target.value);
    setErr("");
    setValidErr("");
  };

  let handlePassword = (e) => {
    setPassword(e.target.value);
    setErr("");
    setValidErr("");
  };

  let handleLogin = () => {
    setErr("");
    if (!email) {
      setErr("Email Is Required");
    } else if (!email.toLowerCase().match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
      setErr("Email Is Not Valid");
    } else if (!password) {
      setErr("password Is Required");
    }

    if (
      email &&
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) &&
      password
    ) {
      setLoader(true);
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          if (!user.emailVerified) {
            setErr("");
            setErr("Please Verify Your Email For Further");
            setLoader(false);
          } else {
            setSuccess("Welcome To Reminder");
            setTimeout(() => {
              navigate("/");
            }, 2000);
          }
        })
        .catch((error) => {
          const errorMessage = error.message;
          if (errorMessage.includes("auth/user-not-found")) {
            setErr("Your Email Is Not Register");
            setLoader(false);
          }
          if (errorMessage.includes("auth/wrong-password")) {
            setErr("Your Password Was Wrong");
            setLoader(false);
          }
          console.log(errorMessage);
        });
    }
  };

  return (
    <div className=" mt-8">
      <Helmet>
        <title>Login</title>
      </Helmet>
      <Container>
        <div className="flex justify-center items-center  w-full h-screen">
          <div className="flex  justify-center items-center w-1/2 ">
            <picture>
              <img
                className="w-[400px] h-[400px]"
                src="assests/images/login.png"
              />
            </picture>
          </div>
          <div className="w-1/2">
            <div className="  flex">
              <h1 className="w-[400px]  rounded-[30px]  font-san capitalize pr-5 font-bold text-center bg-[#1e2833]  text-lg   text-white">
                Reminder
              </h1>
            </div>
            <div className="flex">
              <div className="w-[400px] bg-[#1e2833] p-5 rounded-md mt-5 flex flex-col gap-y-3">
                <p className="text-center text-white text-lg font-san font-semibold">
                  Login Here !
                </p>
                {err && (
                  <p className="font-san font-bold text-lg py-2 rounded-[10px] uppercase bg-red-400 text-white w-full text-center">
                    {err}
                  </p>
                )}
                {success && (
                  <p className="font-san font-bold text-lg py-2 uppercase rounded-[10px]   bg-green-500 text-white w-full text-center">
                    {success}
                  </p>
                )}
                <input
                  onChange={handleEmail}
                  value={email}
                  type="email"
                  placeholder="Your Email"
                  className="w-full font-san flex justify-center font-semibold placeholder:text-white  placeholder:text-center placeholder:capitalize  text-sm bg-[#1e2833] py-[10px] text-white px-[30px] rounded-[30px] border"
                />
                <input
                  onChange={handlePassword}
                  type="password"
                  value={password}
                  placeholder="Enter your password"
                  className="w-full font-san flex justify-center font-semibold placeholder:text-white  placeholder:text-center placeholder:capitalize  text-sm bg-[#1e2833] py-[10px] text-white px-[30px] rounded-[30px] border"
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
                    onClick={handleLogin}
                    className="w-full font-san flex justify-center font-bold  text-sm bg-[#9b9ea1] py-[10px] mt-6 text-white uppercase px-[30px] rounded-[30px] border"
                  >
                    LOGIN
                  </button>
                )}

                <div className="text-center">
                  <h3 className="w-full cursor-pointer mt-12 font-san flex justify-center font-semibold placeholder:text-white  placeholder:text-center placeholder:capitalize  text-sm bg-[#1e2833] py-[10px] text-white px-[30px] rounded-[30px] border">
                    Dont Have An Account !
                    <Link className="ml-2" to="/registration"> Sign Up</Link>{" "}
                  </h3>
                  <h3 className="w-full mt-2 cursor-pointer font-san flex justify-center font-semibold placeholder:text-white  placeholder:text-center placeholder:capitalize  text-sm bg-[#1e2833] py-[10px] text-white px-[30px] rounded-[30px] border">
                    Forget Password !
                    <Link className="ml-2" to="#"> Reset</Link>{" "}
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

export default Login;
