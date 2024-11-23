'use client'
import { UserCourseListContext } from "@/app/_context/UserCourseListContext";
import { Progress } from "@/components/ui/progress";
import { SignedOut, useClerk } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useContext } from "react";
import {
  HiOutlineHome,
  HiOutlinePower,
  HiOutlineShieldCheck,
  HiOutlineSquare3Stack3D,
} from "react-icons/hi2";
function SideBar({setState}) {
  const {userCourseList,setUserCourseList} = useContext(UserCourseListContext)
  // const {signOut} = useClerk()
  const Menu = [
    {
      id: 1,
      name: "Home",
      icon: <HiOutlineHome />,
      path: "/dashboard",
    },
   
    {
                  id:1,
                  name:'Logout',
                  icon:<HiOutlinePower />,
                  path:'/dashboard/logout'
              }

  ];
  const path = usePathname()
  return (
    <div className="fixed h-full bg-white z-10 md:w-64 p-5 shadow-md">
      <Link href={"/"}><Image src={"/favicon2.png"} width={160} height={100} /></Link>
      <hr className="my-5" />

      <ul>
        {Menu.map((item, index) => (
        <Link href={item.path} key={index}>
          <div className={`flex items-center gap-2 text-gray-600 p-3 cursor-pointer hover:bg-gray-100 hover:text-black rounded-lg mb-3 ${item.path==path && 'bg-gray-100 text-black'}`} onClick={setState}>
            <div className="text-2xl">{item.icon}</div>
            <h2>{item.name}</h2>
          </div>
          </Link>
        ))}
      </ul>

    </div>
  );
}

export default SideBar;
