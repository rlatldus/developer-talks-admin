import React, { useState } from "react";
import { HiOutlinePencilAlt } from "react-icons/hi";
import ModalUserEdit from "./Modal/ModalUserEdit";
import ModalUserStatus from "./Modal/ModalUserStatus";
import Status from "./Status";

const TableItem = ({ data }) => {
  const [modalStatus, setModalStatus] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);

  const handleModalStatus = () => {
    setModalStatus((prev) => !prev);
  };

  return (
    <>
      {modalStatus && <ModalUserStatus setModalStatus={setModalStatus} />}
      {modalEdit && <ModalUserEdit setModalEdit={setModalEdit} data={data} />}

      <li className="flex items-center px-4 py-2 border-b border-gray-200 bg-white">
        <div className="w-96 text-sm">
          <div className="flex items-center">
            <div className="flex-shrink-0 w-10 h-10">
              <img
                className="w-full h-full rounded-full"
                src={data.profileImgUrl ? data.profileImgUrl : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                alt=""
              />
            </div>
            <div className="ml-3">
              <p className="text-gray-900">{data.userid}</p>
            </div>
          </div>
        </div>
        <div className="w-96 text-sm">
          <p className="text-gray-900">{data.email}</p>
        </div>
        <div className="w-80 text-sm">
          <p className="text-gray-900">{data.nickname}</p>
        </div>
        <div className="w-80 text-sm">
          <p className="text-gray-900">{data.createDate}</p>
        </div>
        {data.status === "ACTIVE" && (
          <Status textColor="text-green-900" bgColor="bg-green-200" onClick={handleModalStatus}>
            Active
          </Status>
        )}
        {data.status === "SUSPENSION" && (
          <Status textColor="text-orange-900" bgColor="bg-orange-200" onClick={handleModalStatus}>
            Suspension
          </Status>
        )}
        {data.status === "BAN" && (
          <Status textColor="text-red-900" bgColor="bg-red-200" onClick={handleModalStatus}>
            Ban
          </Status>
        )}
        {data.status === "QUIT" && (
          <Status textColor="text-red-900" bgColor="bg-red-200" onClick={handleModalStatus}>
            Quit
          </Status>
        )}
        <div className="text-sm">
          <HiOutlinePencilAlt className="text-blue-500 text-lg cursor-pointer" onClick={() => setModalEdit(true)} />
        </div>
      </li>
    </>
  );
};

export default TableItem;
