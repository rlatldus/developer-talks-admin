import axios from "axios";
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Bar, BarChart, XAxis, YAxis } from "recharts";
import { ROOT_API } from "../constants/api";

const Main = () => {
  const token = localStorage.getItem("admin");
  const [chartData, setChartData] = useState([]);
  const endDateDefault = new Date();
  endDateDefault.setDate(endDateDefault.getDate() - 7); // 끝 날짜 기본값: 오늘로부터 7일 전
  const [startDate, setStartDate] = useState(endDateDefault); // 시작 날짜 기본값: 오늘
  const [endDate, setEndDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getUserList();
  }, [startDate, endDate]); // 시작 날짜 또는 끝 날짜가 변경될 때 데이터 다시 가져오기

  async function getUserList() {
    try {
      setIsLoading(true);

      const { data } = await axios.get(`${ROOT_API}/admin/visitors/daily-count`, {
        params: { startDate: startDate.toISOString().slice(0, 10), endDate: endDate.toISOString().slice(0, 10) },
        headers: {
          "Content-Type": "application/json",
          "X-AUTH-TOKEN": token,
        },
      });

      // 데이터 가공
      const chartData = Object.keys(data).map((date) => ({
        name: date,
        num: data[date],
      }));

      // Sort chartData by date
      chartData.sort((a, b) => new Date(a.name) - new Date(b.name));

      setChartData(chartData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  function formatDate(date) {
    const options = { year: 'numeric', month: 'short', day: 'numeric', weekday: 'long' };
    return date.toLocaleDateString('ko-KR', options);
  }

  return (
    <div className="w-4/5">
      <div className="mt500">
        <div className="container">
          <div className="bg-white shadow-lg rounded-lg p-4 mb-4">
            {chartData.length > 0 && (
              <BarChart width={800} height={400} data={chartData}>
                <Bar dataKey="num" fill="#8884d8" />
                <XAxis dataKey="name" />
                <YAxis />
              </BarChart>
            )}
          </div>

          <div className="bg-white shadow-lg rounded-lg p-4">
            <div className="mb-4">
              <h1 className="text-xl font-bold mb-4">방문자 수 조회</h1>
              <span>조회할 날짜를 선택해주세요</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">시작 날짜</label>
                <DatePicker
                  className="border rounded p-2 w-full"
                  selected={startDate}
                  onChange={handleStartDateChange}
                  dateFormat="yyyy-MM-dd (EEE)"
                />
                {startDate && <p className="mt-2 text-sm text-gray-500">시작 날짜:  {formatDate(startDate)}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">끝 날짜</label>
                <DatePicker
                  className="border rounded p-2 w-full"
                  selected={endDate}
                  onChange={handleEndDateChange}
                  dateFormat="yyyy-MM-dd (EEE)"
                />
                {endDate && <p className="mt-2 text-sm text-gray-500">끝 날짜: {formatDate(endDate)}</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
