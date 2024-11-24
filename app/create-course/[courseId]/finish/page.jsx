"use client";
import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import CourseBasicInfo from "../_components/CourseBasicInfo";
import { FiShare2 } from "react-icons/fi";
// import { HiOutlineClipboardDocumentCheck } from "react-icons/hi2";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function FinishScreen({ params }) {
  const { user } = useUser();
  const [course, setCourse] = useState([]);
  const router = useRouter();

  useEffect(() => {
    params && GetCourse();
  }, [params, user]);

  const GetCourse = async () => {
    const result = await db
      .select()
      .from(CourseList)
      .where(
        and(
          eq(CourseList.courseId, params?.courseId),
          eq(CourseList.createdBy, user?.primaryEmailAddress?.emailAddress)
        )
      );
    setCourse(result[0]);
  };

  const courseURL = `${process.env.NEXT_PUBLIC_HOST_NAME}/course/${course?.courseId}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(courseURL);
      toast.success("Copied to clipboard!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        style: { backgroundColor: "#E0BBE4", color: "#4B0082" },
      });
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Check out this course!",
          text: "Here's a great course I found:",
          url: courseURL,
        });
      } catch (err) {
        console.error("Error sharing: ", err);
      }
    } else {
      alert("Share functionality is not supported on your browser.");
    }
  };

  return (
    <div className="px-10 md:px-20 lg:px-44 my-7">
      <h2 className="text-center font-bold text-2xl my-3 text-primary">
        Happy Learning!🥳 Click on Dashboard Now
      </h2>
      <CourseBasicInfo course={course} refreshData={() => console.log()} />
      <h2 className="mt-3">Course URL:</h2>
      <div className="text-center text-gray-400 border p-2 rounded flex gap-2 items-center justify-between">
        <span className="truncate">{courseURL}</span>
        <HiOutlineClipboardDocumentCheck
          className="h-5 w-5 cursor-pointer"
          onClick={handleCopy}
          title="Copy URL"
        />
        <FiShare2
          className="h-5 w-5 cursor-pointer"
          onClick={handleShare}
          title="Share URL"
        />
      </div>
      <ToastContainer />
    </div>
  );
}

export default FinishScreen;
