import React from "react";
import { AiFillNotification } from "react-icons/ai";
import { BiSolidDetail } from "react-icons/bi";
import { BsFillPersonFill } from "react-icons/bs";
import SideBarItem from "../components/SideBarItem";

const NavSideBar = () => {
  return (
    <div className="bg-gray-100 h-full">
      <div className="border-r w-56 h-full">
        <div className="flex flex-col justify-between pt-2 pb-6 h-screen">
          <div>
            <ul className="mt-6 space-y-2 tracking-wide">
              <li>
                <ul>
                  <SideBarItem linkUrl="/home/users">
                    <BsFillPersonFill className="group-hover:text-cyan-600" />
                    <span className="group-hover:text-cyan-500">전체 유저</span>
                  </SideBarItem>
                  <SideBarItem linkUrl="/home/reportUsers">
                    <BsFillPersonFill className="group-hover:text-cyan-600" />
                    <span className="group-hover:text-cyan-500">신고 유저</span>
                  </SideBarItem>
                </ul>
              </li>
              <SideBarItem linkUrl="/home/board">
                <BiSolidDetail className="group-hover:text-cyan-600" />
                <span className="group-hover:text-gray-700">전체 게시글</span>
              </SideBarItem>
              <SideBarItem linkUrl="/home/reportBoard">
                <BiSolidDetail className="group-hover:text-cyan-600" />
                <span className="group-hover:text-gray-700">신고 게시글</span>
              </SideBarItem>
              <SideBarItem linkUrl="/home/notice">
                <AiFillNotification />
                <span className="group-hover:text-gray-700">공지글 관리</span>
              </SideBarItem>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavSideBar;
