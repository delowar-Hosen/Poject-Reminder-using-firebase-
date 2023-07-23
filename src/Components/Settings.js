import React from "react";

import {
  AiTwotoneEdit,
  AiFillDelete,
  AiFillSave,
  AiOutlineCloudUpload,
  AiOutlineDownload
} from "react-icons/ai";
import {
  BsChatDotsFill,
  BsFillMoonStarsFill,
  BsFillSunFill,
  BsFillSimFill,
} from "react-icons/bs";
import { GrPowerReset } from "react-icons/gr";
import { FaUserEdit, FaCreditCard } from "react-icons/fa";
import { MdOutlineCancelPresentation,MdRestore } from "react-icons/md";
import { useEffect } from "react";
import { useState } from "react";
import { getAuth, sendPasswordResetEmail, deleteUser } from "firebase/auth";
import {
  getDatabase,
  db,
  set,
  ref,
  onValue,
  push,
  remove,
} from "firebase/database";
import Search from "./Search";
import DocumentReader from "./DocumentReader";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const [user, setUser] = useState([]);
  const [editName, setEditName] = useState("");
  const [nameEdit, setNameEdit] = useState(false);
  const [fNameEdit, setfNameEdit] = useState(false);
  const [idEdit, setIdEdit] = useState(false);
  const [editNumber, setEditNumber] = useState(false);
  const [clientNameEdit, setClientNameEdit] = useState(false);
  const [clientFatherNameEdit, setClientFatherNameEdit] = useState(false);
  const [editNationalId, setEditNationalId] = useState(false);
  const [phoneEdit, setPhoneEdit] = useState(false);
  const [passwordEdit, setPasswordEdit] = useState(false);
  const [download, setDownload] = useState(false);
  const [bg, setBg] = useState(false);
  const [email, setEmail] = useState("");
  const [resetP, setResetP] = useState("");
  const [boxUsers, setBoxUsers] = useState([]);
  const [search, setSearch] = useState([]);

  const [theme, setTheme] = useState("light");
  const navigate = useNavigate();

  const auth = getAuth();
  const db = getDatabase();

  useEffect(() => {
    const notificationRef = ref(db, "users/");
    onValue(notificationRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (auth.currentUser.uid == item.val().id) {
          arr.push({ ...item.val(), key: item.key });
        }
      });
      setUser(arr);
      setEmail(arr[0].email);
    });
  }, []);

  let handleEditState = (e) => {
    setEditName("");
    setEditName(e.target.value);
  };

  let handleNameEdit = () => {
    setNameEdit(true);
  };

  let handleSaveEditName = (item) => {
    console.log(item);
    set(ref(db, "users/" + item.key), {
      name: editName,
      email: item.email,
      avatar: item.avatar,
      id: item.id,
      created: `${new Date().toLocaleDateString()}`,
    }).then(() => {
      setEditName("");
      setNameEdit(false);
    });
  };

  let handlePasswordReset = () => {
    setPasswordEdit(true);
    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Password reset email sent!
        // ..
        setResetP("Check Your Email To Change Your Password");
        setTimeout(() => {
          setPasswordEdit(false);
        }, 3000);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };

  let arr = [];

  let handleSearch = (e) => {
    boxUsers.filter((item) => {
      if (e.target.value != "") {
        if (
          item.clientName.toLowerCase().includes(e.target.value.toLowerCase())
        ) {
          arr.push(item);
        } else if (
          item.boxId.toLowerCase().includes(e.target.value.toLowerCase())
        ) {
          arr.push(item);
        } else if (item.phone.includes(e.target.value)) {
          arr.push(item);
        }
      } else {
        arr = [];
      }
      setSearch(arr);
    });
  };

  useEffect(() => {
    const starCountRef = ref(db, "boxusers/");
    onValue(starCountRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        arr.push({ ...item.val(), key: item.key });
      });
      setBoxUsers(arr);
    });
  }, []);

  let handleEditSave = (item) => {
    setClientNameEdit(false);
    setClientFatherNameEdit(false);
    setPhoneEdit(false);

    set(push(ref(db, "boxusers/")), {
      clientName: `${editName ? editName : item.clientName}`,
      fatherName: `${fNameEdit ? fNameEdit : item.fatherName}`,
      phone: `${editNumber ? editNumber : item.phone}`,
      clientNationId: `${idEdit ? idEdit : item.clientNationId}`,
      boxId: item.boxId,
      areaname: item.areaname,
      montlyBill: item.montlyBill,
      boxPrice: item.boxPrice,
      managername: item.managername,
      editDate: new Date(),
    }).then(() => {
      remove(ref(db, "boxusers/" + item.key));
    });
  };

  let handleDeleteBox = (item) => {
    remove(ref(db, "boxusers/" + item.key));
  };

  let handleReset = () => {
    remove(ref(db, "boxusers/"));
    remove(ref(db, "paidList/"));
    remove(ref(db, "rechargeList/"));
  };

  let handleHardReset = () => {
    remove(ref(db, "areas/"));
    let user = auth.currentUser;
    remove(ref(db, "users/" + auth.currentUser.uid));
    deleteUser(user)
      .then(() => {
        console.log("delete");
      })
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        // An error ocurred
        // ...
      });
  };

  return (
    <div className="w-[90%] m-auto">
      <div className="lg:flex  gap-x-10 mt-4">
        {download ? (
          <div>
            <DocumentReader click={() => setDownload(!download)} />
          </div>
        ) : (
          <div className="lg:w-1/2  border border-[#c9c5c542] p-5 rounded-md">
            <h3 className="font-pop text-center lg:text-left font-semibold text-xl mb-10">
              Profile Settings
            </h3>
            {user.map((item) => (
              <div className="flex flex-col lg:flex-row  pb-8 border-b border-[#8a84848e]">
                <div className="relative group flex lg:block justify-center">
                  <img
                    className=" lg:mt-3 lg:ml-4 w-[70px] h-[70px] border border-solid border-[#000] lg:p-1 rounded-full"
                    src={item.avatar}
                  />
                  <div className="absolute    lg:top-[12px] lg:left-[16px]">
                    <div className="hidden group-hover:block ease-linear">
                      <div className="   w-[70px] h-[70px] rounded-full text-white bg-[#00000069] flex justify-center items-center">
                        <AiOutlineCloudUpload />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="lg:ml-8 lg:mt-2 text-center">
                  {nameEdit ? (
                    <div className="flex gap-x-1 items-center">
                      <input
                        placeholder="Edit Your Name"
                        onChange={handleEditState}
                        className="py-2 px-2 font-pop font-semibold text-[25px] outline-0 w-[70%]"
                      />
                      <AiTwotoneEdit
                        onClick={() => handleSaveEditName(item)}
                        className="text-[27px]  mr-9 cursor-pointer"
                      />
                    </div>
                  ) : (
                    <h5 className="font-pop font-semibold text-[25px] ">
                      {item.name}
                    </h5>
                  )}
                  <p className="font-pop font-normal text-xl ">{item.email}</p>
                </div>
              </div>
            ))}

            <div className="p-5 lg:p-[43px] flex   flex-col gap-y-2 lg:gap-y-8">
              {nameEdit ? (
                <span className="font-pop font-normal text-sm lg:text-xl text-[#df4a4a]">
                  Please Edit Your User Name
                </span>
              ) : (
                <p
                  onClick={handleNameEdit}
                  className="flex justify-center lg:justify-start items-center cursor-pointer"
                >
                  <AiTwotoneEdit className="text-base lg:text-[27px] mr-2 lg:mr-9 " />
                  <span className="font-pop font-normal text-sm lg:text-xl">
                    Edit Profile Name.
                  </span>
                </p>
              )}

              <p className="flex justify-center lg:justify-start items-center cursor-pointer">
                <AiOutlineDownload className=" text-base lg:text-[27px] mr-2 lg:mr-9 " />
                <span
                  onClick={() => setDownload(!download)}
                  className="font-pop font-normal text-sm lg:text-xl"
                >
                  Store Your Document
                </span>
              </p>
              <p
                onClick={handleReset}
                className="flex justify-center lg:justify-start items-center cursor-pointer"
              >
                <GrPowerReset className="text-base lg:text-[27px] mr-2 lg:mr-9 " />
                <span className="font-pop font-normal text-sm lg:text-xl">Reset</span>
              </p>
              <p
                onClick={handleHardReset}
                className="flex justify-center lg:justify-start items-center cursor-pointer"
              >
                <MdRestore className=" text-base lg:text-[27px] mr-2 lg:mr-9 " />
                <span className="font-pop font-normal text-sm lg:text-xl">Hard Reset</span>
              </p>
            </div>
          </div>
        )}
        <div className="lg:w-1/2  p-6 border border-[#c9c5c542] rounded-md">
          <div>
            <h3 className="font-pop text-center font-semibold  text-xl mb-5">
              Box ID Settings
            </h3>
            <div className="mb-5">
              <Search state={handleSearch} />
            </div>
          </div>

          {search.length > 0 ? (
            search.map((item) => (
              <div className="pl-[43px] flex flex-col gap-y-2 lg:gap-y-8">
                {clientNameEdit ? (
                  <div className="flex gap-x-1 items-center">
                    <input
                      placeholder="Edit Client Name"
                      onChange={handleEditState}
                      className="py-2 px-2 font-pop font-semibold text-base outline-0 w-[70%]"
                    />
                    <div className="flex gap-x-2 items-center">
                      <MdOutlineCancelPresentation
                        onClick={() => setClientNameEdit(false)}
                        className="text-[27px]"
                      />
                      <AiFillSave
                        onClick={() => handleEditSave(item)}
                        className="text-[27px]  ml-9 "
                      />
                    </div>
                  </div>
                ) : (
                  <p className="flex justify-center items-center group">
                    <FaUserEdit className="text-base lg:text-[27px] mr-2 lg:mr-9 " />
                    <span className="font-pop font-normal text-sm lg:text-xl">
                      {item.clientName}
                    </span>
                    <AiTwotoneEdit
                      onClick={() => setClientNameEdit(true)}
                      className=" text-base lg:text-[27px] hidden  lg:ml-9 group-hover:block  "
                    />
                  </p>
                )}

                {clientFatherNameEdit ? (
                  <div className="flex gap-x-1 items-center">
                    <input
                      placeholder="Edit Client Father  Name"
                      onChange={(e) => setfNameEdit(e.target.value)}
                      className="py-2 px-2 font-pop font-semibold text-base outline-0 w-[70%]"
                    />
                    <div className="flex gap-x-2 items-center">
                      <MdOutlineCancelPresentation
                        onClick={() => setClientFatherNameEdit(false)}
                        className="text-[27px]"
                      />
                      <AiFillSave
                        onClick={() => handleEditSave(item)}
                        className="text-[27px]  ml-9 "
                      />
                    </div>
                  </div>
                ) : (
                  <p className="flex justify-center items-center group">
                    <FaUserEdit className="text-base lg:text-[27px] mr-2 lg:mr-9 " />
                    <span className="font-pop font-normal text-sm lg:text-xl">
                      {item.fatherName}
                    </span>
                    <AiTwotoneEdit
                      onClick={() => setClientFatherNameEdit(true)}
                      className="base lg:text-[27px] hidden  lg:ml-9 group-hover:block  "
                    />
                  </p>
                )}

                {editNationalId ? (
                  <div className="flex gap-x-1 items-center">
                    <input
                      placeholder="Edit National Id Number"
                      onChange={(e) => setIdEdit(e.target.value)}
                      className="py-2 px-2 font-pop font-semibold text-base outline-0 w-[70%]"
                    />
                    <div className="flex gap-x-2 items-center">
                      <MdOutlineCancelPresentation
                        onClick={() => setEditNationalId(false)}
                        className="text-[27px]"
                      />
                      <AiFillSave
                        onClick={() => handleEditSave(item)}
                        className="text-[27px]  ml-9 "
                      />
                    </div>
                  </div>
                ) : (
                  <p
                    onClick={handlePasswordReset}
                    className="flex justify-center items-center group"
                  >
                    <FaCreditCard className="text-base lg:text-[27px]  mr-2 lg:mr-9 " />
                    <span className="font-pop font-normal text-sm lg:text-xl">
                      {item.clientNationId}
                    </span>
                    <AiTwotoneEdit
                      onClick={() => setEditNationalId(true)}
                      className="text-[27px] hidden ml-2 lg:ml-9 group-hover:block  "
                    />
                  </p>
                )}

                {phoneEdit ? (
                  <div className="flex gap-x-1 items-center">
                    <input
                      placeholder="Edit Phone Number"
                      onChange={(e) => setEditNumber(e.target.value)}
                      className="py-2 px-2 font-pop font-semibold text-base outline-0 w-[70%]"
                    />
                    <div className="flex gap-x-2 items-center">
                      <MdOutlineCancelPresentation
                        onClick={() => setPhoneEdit(false)}
                        className="text-[27px]"
                      />
                      <AiFillSave
                        onClick={() => handleEditSave(item)}
                        className="text-[27px]  ml-9 "
                      />
                    </div>
                  </div>
                ) : (
                  <p
                    onClick={handlePasswordReset}
                    className="flex justify-center items-center group"
                  >
                    <BsFillSimFill className="text-base lg:text-[27px] mr-2 lg:mr-9 " />
                    <span className="font-pop font-normal text-sm lg:text-xl">
                      {item.phone}
                    </span>
                    <AiTwotoneEdit
                      onClick={() => setPhoneEdit(true)}
                      className="text-[27px] hidden ml-2 lg:ml-9 group-hover:block  "
                    />
                  </p>
                )}

                <p className="flex justify-center items-center cursor-pointer">
                  <AiFillDelete className="text-base lg:text-[27px] mr-2 lg:mr-9 " />
                  <span
                    onClick={() => handleDeleteBox(item)}
                    className="font-pop font-normal text-sm lg:text-xl"
                  >
                    Delete Box Account.
                  </span>
                </p>
              </div>
            ))
          ) : (
            <div className="p-5 lg:pl-[43px] flex flex-col gap-y-4 lg:gap-y-8">
              <p className="flex justify-center items-center">
                <FaUserEdit className="text-base lg:text-[27px] mr-2 lg:mr-9 " />
                <p className="  w-full font-pop font-normal text-sm lg:text-xl relative group">
                  Edit Client Name
                  <span className=" w-full absolute hidden group-hover:block   top-6 text-sm left-3 text-red-600">
                    Please Search For Change
                  </span>
                </p>
              </p>

              <p className="flex justify-center items-center">
                <FaUserEdit className="text-base lg:text-[27px]  mr-2 lg:mr-9 " />
                <p className=" w-full font-pop font-normal text-sm lg:text-xl relative group">
                  Edit Client Father Name
                  <span className=" w-full absolute hidden group-hover:block   top-6 text-sm left-3 text-red-600">
                    Please Search For Change
                  </span>
                </p>
              </p>

              <p className="flex justify-center items-center">
                <FaCreditCard className="text-base lg:text-[27px] mr-2 lg:mr-9 " />
                <p className=" w-full font-pop font-normal text-sm lg:text-xl relative group">
                  Edit Client National Id
                  <span className=" w-full absolute hidden group-hover:block   top-6 text-sm left-3 text-red-600">
                    Please Search For Change
                  </span>
                </p>
              </p>

              <p className="flex justify-center items-center">
                <BsFillSimFill className="text-base lg:text-[27px] mr-2 lg:mr-9 " />
                <p className=" w-full font-pop font-normal text-sm lg:text-xl relative group">
                  Edit Client Phone Number
                  <span className=" w-full absolute hidden group-hover:block   top-6 text-sm left-3 text-red-600">
                    Please Search For Change
                  </span>
                </p>
              </p>

              <p className="flex justify-center items-center">
                <AiFillDelete className="text-base lg:text-[27px] mr-2 lg:mr-9 " />
                <p className=" w-full font-pop font-normal text-sm lg:text-xl relative group">
                  Delete Box Account
                  <span className=" w-full absolute hidden group-hover:block   top-6 text-sm left-3 text-red-600">
                    Please Search For Delete
                  </span>
                </p>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
