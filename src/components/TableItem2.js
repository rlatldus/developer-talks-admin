import axios from "axios";
import React, { useState } from "react";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { useMutation, useQueryClient } from "react-query";
import { ROOT_API } from "../constants/api";
import Modal from "./Modal/Modal";

const TableItem2 = ({ data }) => {
  const queryClient = useQueryClient();
  const token = localStorage.getItem("admin");
  const [modalEdit, setModalEdit] = useState(false);
  const [userInfo, setUserInfo] = useState({
    email: data.email,
    nickname: data.nickname,
  });
  const handleModalEdit = () => {
    setModalEdit(!modalEdit);
    setUserInfo({ email: data.title, nickname: data.content });
  };

  const userInfoEditMutation = useMutation(
    () =>
      axios.put(
        `${ROOT_API}/admin/announcements/${data.id}`,
        {
          title: userInfo.email,
          content: userInfo.nickname,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-AUTH-TOKEN": token,
          },
        }
      ),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["userList"]);
        setModalEdit(false);
      },
      onError: (err) => {
        console.log(err.response.data.message);
      },
    }
  );
  const handleSubmitEdit = (e) => {
    e.preventDefault();
    userInfoEditMutation.mutate();
  };
  const handleChangeInfo = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
    console.log(userInfo);
  };

  const onDelete = async (e) => {
    e.preventDefault(); // Prevent form submission
    try {
      const response = await axios.delete(
        `${ROOT_API}/admin/announcements/${data.id}`,
        {
          headers: {
            "Content-Type": "application/json",
            "X-AUTH-TOKEN": token,
          },
        }
      );
        alert("삭제되었습니다")
      queryClient.invalidateQueries(["userList"]);
    } catch (error) {
      console.error("로그인 에러:", error);
    }
  };
  return (
    <>
      {modalEdit && (
        <Modal handleModal={handleModalEdit} handleSubmit={handleSubmitEdit}>
          <Modal.Header>사용자 정보 수정</Modal.Header>
          <Modal.Body>
            <label htmlFor="input-email" className="block mb-2 text-sm font-medium text-gray-900">
              제목
            </label>
            <div className="relative mb-6">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                  <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                  <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                </svg>
              </div>
              <input
                type="text"
                id="input-email"
                name="email"
                value={userInfo.email}
                onChange={handleChangeInfo}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
              />
            </div>
            <label htmlFor="input-nickname" className="block mb-2 text-sm font-medium text-gray-900">
              내용
            </label>
            <div className="relative mb-6">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                </svg>
              </div>
              <input
                type="text"
                id="input-nickname"
                name="nickname"
                value={userInfo.nickname}
                onChange={handleChangeInfo}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
              />
            </div>
          </Modal.Body>
          <Modal.Footer>수정</Modal.Footer>
        </Modal>
      )}
      <li className="flex items-center text-center px-4 py-2 border-b border-gray-200 bg-white">
        <div className="w-2/5 text-sm">
          <div className="flex items-center">
            <div className="ml-3">
              <p className="text-gray-900">{data.title}</p>
            </div>
          </div>
        </div>
        <div className="w-2/5 text-sm">
          <p className="text-gray-900">{data.content}</p>
        </div>
        <div className="w-1/6 text-sm">
          <p className="text-gray-900">{data.writer}</p>
        </div>
        <div className="w-1/5 text-sm">
          <p className="text-gray-900">{data.modifiedDate}</p>
        </div>
        <div className="w-1/5 text-sm">
          <p className="text-gray-900">{data.viewCount}</p>
        </div>
        <div className="w-1/6 text-sm">
          <HiOutlinePencilAlt className="text-blue-500 text-lg cursor-pointer" onClick={handleModalEdit} />
        </div>
        <div className="w-1/6  text-sm">
          <button className="text-gray-900" onClick={onDelete}>삭제</button>
        </div>
      </li>
    </>
  );
};

export default TableItem2;
