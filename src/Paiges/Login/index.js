import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Container from "../../Components/Container";
import { ThreeDots } from "react-loader-spinner";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

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
      <Container>
        <div className="flex justify-center  w-full h-screen">
          <div className="flex justify-center  items-center">
            <picture>
              <img src="assests/images/regi.png" />
            </picture>
          </div>
          <div>
            <h1 className="font-san font-bold text-right   text-[40px] text-black">
              Welcome, for connect with Reminder
            </h1>
            <div className="flex justify-end">
              <div className="w-[472px] mt-12 flex flex-col gap-y-8">
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
                  className="w-full font-san font-bold placeholder:uppercase text-sm py-[22px] px-[30px] rounded-[10px] border"
                />
                <input
                  onChange={handlePassword}
                  type="password"
                  value={password}
                  placeholder="Enter your password"
                  className="w-full font-san   mb-8 font-bold placeholder:uppercase text-sm py-[22px] px-[30px] rounded-[10px] border"
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
                    className="font-san font-bold text-white bg-black rounded-[5px] text-[28px] py-[14px] text-center"
                  >
                    LOGIN
                  </button>
                )}

                <div className="text-center">
                  <h3 className="font-san font-medium text-base text-black uppercase">
                    Dont Have An Account!
                    <Link to="/registration"> Sign Up</Link>{" "}
                  </h3>
                  <h3 className="font-san font-medium text-base mt-5 text-black uppercase">
                    Forget Password!
                    <Link to="#"> Reset</Link>{" "}
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
