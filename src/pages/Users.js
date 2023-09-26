import axios from "axios";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import ItemUser from "../components/ItemUser";
import { ROOT_API } from "../constants/api";

const Users = ({ type }) => {
  const token = localStorage.getItem("admin");
  const [page, setPage] = useState(0);
  const [status, setStatus] = useState("");

  const handlePage = (type) => {
    if (type === "prev" && page > 0) {
      setPage(page - 1);
    } else if (type === "next" && page < data.totalPages - 1) {
      setPage(page + 1);
    }
  };

  const handleStatus = (e) => {
    setStatus(e.target.value);
  };

  async function getUserList() {
    if (type === "all") {
      const { data } = await axios.get(`${ROOT_API}/admin/users`, {
        params: { page: page, size: 10, status: status },
        headers: {
          "Content-Type": "application/json",
          "X-AUTH-TOKEN": token,
        },
      });
      return data;
    } else if (type === "report") {
      const { data } = await axios.get(`${ROOT_API}/admin/reports/user/all`, {
        params: { page: page, size: 10 },
        headers: {
          "Content-Type": "application/json",
          "X-AUTH-TOKEN": token,
        },
      });
      return data;
    }
  }

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["userList"],
    queryFn: getUserList,
  });

  useEffect(() => {
    refetch();
  }, [page, status]);

  useEffect(() => {
    setPage(0);
    refetch();
  }, [type]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>error...</div>;

  return (
    <div className="w-4/5">
      <div className="bg-white p-4 rounded-md">
        <div className=" flex items-center">
          <div className="flex">
            {type === "all" ? (
              <div className="flex items-center">
                <h2 className="text-gray-600 font-semibold w-100">전체유저</h2>
                <select
                  value={status}
                  onChange={handleStatus}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                >
                  <option value="">--</option>
                  <option value="ACTIVE">ACTIVE</option>
                  <option value="SUSPENSION">SUSPENSION</option>
                  <option value="BAN">BAN</option>
                  <option value="QUIT">QUIT</option>
                </select>
              </div>
            ) : (
              <h2 className="text-gray-600 font-semibold">신고유저</h2>
            )}
          </div>
        </div>
        <div className="mx-4 sm:-mx-8 px-4 sm:px-8 py-4">
          <div className="relative shadow rounded-lg min-h-[700px]">
            <div className="">
              <div>
                <div className="flex px-4 py-3 border-b-2 border-gray-200 bg-gray-100">
                  <div className="w-96 text-left text-xs font-semibold text-gray-600">USERID</div>
                  <div className="w-96 text-left text-xs font-semibold text-gray-600">EMAIL</div>
                  <div className="w-80 text-left text-xs font-semibold text-gray-600">NICKNAME</div>
                  {type === "all" ? (
                    <>
                      <div className="w-80 text-left text-xs font-semibold text-gray-600">CREATE_DATE</div>
                      <div className="w-52 text-left text-xs font-semibold text-gray-600">STAUTS</div>
                      <div className="text-left text-xs font-semibold text-gray-600">EDIT</div>
                    </>
                  ) : (
                    <>
                      <div className="w-80 text-left text-xs font-semibold text-gray-600">RESULT_TYPE</div>
                      <div className="w-52 text-left text-xs font-semibold text-gray-600">DETAIL</div>
                    </>
                  )}
                </div>
              </div>
              <ul>
                {data.totalElements ? (
                  data.content.map((user, index) =>
                    type === "all" ? (
                      <ItemUser key={index} data={user} type={type} />
                    ) : user.reportedUserInfoDto && user.resultType ? (
                      <ItemUser key={index} data={user.reportedUserInfoDto} type={type} resultType={user.resultType} />
                    ) : null
                  )
                ) : (
                  <li>등록된 유저가 없습니다.</li>
                )}
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
        </div>
      </div>
    </div>
  );
};

export default Users;
