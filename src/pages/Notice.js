import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useMutation, useQuery, useQueryClient } from "react-query";
import Modal from "../components/Modal/Modal";
import TableItem2 from "../components/TableItem2";
import { ROOT_API } from "../constants/api";

const Notice = () => {
  const token = localStorage.getItem("admin");
  const [page, setPage] = useState(0);
  const [status, setStatus] = useState("");
  const queryClient = useQueryClient();

  const handlePage = (type) => {
    if (type === "prev" && page > 0) {
      setPage(page - 1);
    } else if (type === "next" && page < data.totalPages - 1) {
      setPage(page + 1);
    }
  };

  const [modalEdit, setModalEdit] = useState(false);
  const [userInfo, setUserInfo] = useState({
    email: "",
    nickname: "",
  });
  const handleModalEdit = () => {
    setModalEdit(!modalEdit);
    setUserInfo({ email: data.title, nickname: data.content });
  };

  const userInfoEditMutation = useMutation(
    () =>
      axios.post(
        `${ROOT_API}/admin/announcements`,
        {
          title: userInfo.email,
          content: userInfo.nickname ,
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

  async function getUserList() {
    const { data } = await axios.get(`${ROOT_API}/announcements/all`, {
      params: { page: page, size: 10, status: status },
      headers: {
        "Content-Type": "application/json",
        "X-AUTH-TOKEN": token,
      },
    });
    return data;
  }

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["userList"],
    queryFn: getUserList,
  });

  useEffect(() => {
    refetch();
  }, [page, status]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>error...</div>;

  const handleSubmitEdit = (e) => {
    e.preventDefault();
    userInfoEditMutation.mutate();
  };
  const handleChangeInfo = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  return (
    <div className="w-4/5">
      {modalEdit && (
        <Modal handleModal={handleModalEdit} handleSubmit={handleSubmitEdit}>
          <Modal.Header>공지글작성</Modal.Header>
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
                value={userInfo.title}
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
                value={userInfo.content}
                onChange={handleChangeInfo}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
              />
            </div>
          </Modal.Body>
          <Modal.Footer>공지글 작성</Modal.Footer>
        </Modal>
      )}
      <div className="bg-white p-4 rounded-md w-full">
        <div className="flex items-center">
          <div className="flex">
            <h2 className="text-gray-600 font-semibold">공지글 관리</h2>
          </div>
        </div>
        <div className="mx-4 sm:-mx-8 px-4 sm:px-8 py-4">
          <div className="relative shadow rounded-lg min-h-[700px] ">
            <div className="">
              <div>
                <div className="flex text-center px-4 py-3 border-b-2 border-gray-200 bg-gray-100">
                  <div className="w-2/5 text-left text-xs font-semibold text-gray-600">TITLE</div>
                  <div className="w-2/5 text-xs font-semibold text-gray-600">CONTENT</div>
                  <div className="w-1/6 text-xs font-semibold text-gray-600">WRITER</div>
                  <div className="w-1/5 text-xs font-semibold text-gray-600">modifiedDate</div>
                  <div className="w-1/5 text-xs font-semibold text-gray-600">viewCount</div>
                  <div className="w-1/6 text-xs font-semibold text-gray-600">EDIT</div>
                  <div className="w-1/6 text-xs font-semibold text-gray-600">DELETE</div>
                </div>
              </div>
              <ul>
                {data.totalElements ? data.content.map((board, index) => <TableItem2 key={index} data={board} />) : <li>등록된 유저가 없습니다.</li>}
              </ul>
            </div>
            <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 w-full bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
              <div className="inline-flex">
                <span className="mr-4 py-2 text-xs font-semibold text-gray-600">{page + 1} page</span>
                <button
                  onClick={() => handlePage("prev")}
                  className="bg-gray-300 hover:bg-gray-400 text-xs font-semibold text-gray-600 py-2 px-4 rounded-l"
                >
                  Prev
                </button>
                <button
                  onClick={() => handlePage("next")}
                  className="bg-gray-300 hover:bg-gray-400 text-xs font-semibold text-gray-600 py-2 px-4 rounded-r"
                >
                  Next
                </button>
                <span className="ml-4 py-2 text-xs font-semibold text-gray-600">{data.totalPages === 0 ? "1 page" : `${data.totalPages} page`}</span>
              </div>
            </div>
          </div>
          <Button variant="primary" type="button" className="border-b-2 px-4 border-gray-200 bg-gray-900 mt-10" onClick={handleModalEdit}>
            공지글쓰기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Notice;
