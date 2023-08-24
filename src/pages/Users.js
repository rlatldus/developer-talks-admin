import axios from "axios";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { ROOT_API } from "../constants/api";
import TableItem from "../components/TableItem";

const Users = () => {
  const token = localStorage.getItem("admin");
  const [page, setPage] = useState(0);

  const handlePage = (type) => {
    if (type === "prev" && page > 0) {
      setPage(page - 1);
    } else if (type === "next" && page < data.totalPages - 1) {
      setPage(page + 1);
    }
  };

  async function getUserList() {
    const { data } = await axios.get(`${ROOT_API}/admin/users`, {
      params: { page: page, size: 10 },
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
  }, [page]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>error...</div>;

  return (
    <>
      <div className="bg-white p-8 rounded-md w-full">
        <div className=" flex items-center">
          <div className="flex">
            <h2 className="text-gray-600 font-semibold">전체유저</h2>
            <select
              id="countries"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
              <option selected>--</option>
              <option value="active">ACTIVE</option>
              <option value="suspension">SUSPENSION</option>
              <option value="ban">BAN</option>
              <option value="quit">QUIT</option>
            </select>
          </div>
        </div>
        <div className="mx-4 sm:-mx-8 px-4 sm:px-8 py-4">
          <div className="shadow rounded-lg">
            <div className="">
              <div>
                <div className="flex px-4 py-3 border-b-2 border-gray-200 bg-gray-100">
                  <div className="w-96 text-left text-xs font-semibold text-gray-600">USERID</div>
                  <div className="w-96 text-left text-xs font-semibold text-gray-600">EMAIL</div>
                  <div className="w-80 text-left text-xs font-semibold text-gray-600">NICKNAME</div>
                  <div className="w-80 text-left text-xs font-semibold text-gray-600">CREATE_DATE</div>
                  <div className="w-52 text-left text-xs font-semibold text-gray-600">STAUTS</div>
                  <div className="text-left text-xs font-semibold text-gray-600">EDIT</div>
                </div>
              </div>
              <ul>
                {data.totalElements ? data.content.map((board, index) => <TableItem key={index} data={board} />) : <li>등록된 유저가 없습니다.</li>}
              </ul>
            </div>
            <div className="px-2 py-2 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
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
                <span className="ml-4 py-2 text-xs font-semibold text-gray-600">{data.totalPages} page</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Users;
