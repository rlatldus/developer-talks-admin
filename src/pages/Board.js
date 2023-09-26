import axios from "axios";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import ItemBoard from "../components/ItemBoard";
import { ROOT_API } from "../constants/api";

const Board = ({ type }) => {
  const token = localStorage.getItem("admin");
  const [page, setPage] = useState(0);
  const [status, setStatus] = useState();

  const handlePage = (type) => {
    if (type === "prev" && page > 0) {
      setPage(page - 1);
    } else if (type === "next" && page < data.totalPages - 1) {
      setPage(page + 1);
    }
  };

  const handleStatus = (e) => {
    if (e.target.value === "") setStatus(null);
    else {
      setStatus(e.target.value);
    }
  };

  async function getBoardList() {
    if (type === "all") {
      const { data } = await axios.get(`${ROOT_API}/admin/posts/all`, {
        params: { page: page, size: 10, forbidden: status },
        headers: {
          "Content-Type": "application/json",
          "X-AUTH-TOKEN": token,
        },
      });
      return data;
    } else if (type === "report") {
      const { data } = await axios.get(`${ROOT_API}/admin/reports/post/all`, {
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
    queryKey: ["boardList"],
    queryFn: getBoardList,
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
      <div className="bg-white p-4 rounded-md w-full">
        <div className="flex items-center">
          <div className="flex">
            {type === "all" ? (
              <div className="flex items-center">
                <h2 className="text-gray-600 font-semibold w-100">전체 글</h2>

                <select
                  value={status}
                  onChange={handleStatus}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ml-2" // 스타일 추가
                >
                  <option value="">--</option>
                  <option value="true">FORBIDDEN</option>
                  <option value="false">UNFORBIDDEN</option>
                </select>
              </div>
            ) : (
              <h2 className="text-gray-600 font-semibold">신고 글</h2>
            )}
          </div>
        </div>
        <div className="mx-4 sm:-mx-8 px-4 sm:px-8 py-4">
          <div className="relative shadow rounded-lg min-h-[700px]">
            <div className="">
              <div>
                <div className="flex items-center bg-gray-100 text-center">
                  <div className="w-1/5 px-4 py-3 border-b-2 border-gray-200">
                    <span className="text-left text-xs font-semibold text-gray-600">NICKNAME</span>
                  </div>
                  <div className="w-1/3 px-4 py-3 border-b-2 border-gray-200">
                    <span className="text-left text-xs font-semibold text-gray-600">TITLE</span>
                  </div>
                  <div className="w-2/5 px-4 py-3 border-b-2 border-gray-200">
                    <span className="text-left text-xs font-semibold text-gray-600">CREATE_DATE</span>
                  </div>
                  {type === "all" ? (
                    <>
                      <div className="w-1/12 px-4 py-3 border-b-2 border-gray-200">
                        <span className="text-left text-xs font-semibold text-gray-600">VIEW_COUNT</span>
                      </div>
                      <div className="w-1/12 px-4 py-3 border-b-2 border-gray-200">
                        <span className="text-left text-xs font-semibold text-gray-600">FAVORITE_COUNT</span>
                      </div>
                      <div className="w-1/11 px-4 py-3 border-b-2 border-gray-200">
                        <span className="text-left text-xs font-semibold text-gray-600">RECOMMEND_COUNT</span>
                      </div>
                    </>
                  ) : (
                    <div className="w-1/7 px-4 py-3 border-b-2 border-gray-200">
                      <span className="text-left text-xs font-semibold text-gray-600">RESULT_TYPE</span>
                    </div>
                  )}
                  <div className="w-1/7 px-4 py-3 border-b-2 border-gray-200">
                    <span className="text-left text-xs font-semibold text-gray-600">DETAIL</span>
                  </div>
                </div>
              </div>
              <ul>
                {data.totalElements ? (
                  data.content.map((user, index) => <ItemBoard key={index} data={user} type={type} />)
                ) : (
                  <li>등록된 글이 없습니다.</li>
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

export default Board;
