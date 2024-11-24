"use client";
import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import CourseBasicInfo from "../_components/CourseBasicInfo";
import { HiOutlineClipboardDocumentCheck } from "react-icons/hi2";
import { FiShare2 } from "react-icons/fi";

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

  const handleShareOrCopy = async () => {
    const courseUrl = `${process.env.NEXT_PUBLIC_HOST_NAME}/course/${course?.courseId}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Check out this course!",
          text: "Here's a course you might be interested in:",
          url: courseUrl,
        });
        console.log("Course shared successfully!");
      } catch (error) {
        console.error("Error sharing the course:", error);
      }
    } else {
      try {
        await navigator.clipboard.writeText(courseUrl);
        console.log("Course URL copied to clipboard!");
      } catch (error) {
        console.error("Error copying course URL:", error);
      }
    }
  };

  return (
    <div className="px-10 md:px-20 lg:px-44 my-7">
      <h2 className="text-center font-bold text-2xl my-3 text-primary">
        Congrats🥳! Click on Dashboard Now
      </h2>
      <CourseBasicInfo course={course} refreshData={() => console.log()} />
      <h2 className="mt-3">Course URL:</h2>
      <h2 className="text-center text-gray-400 border p-2 rounded flex gap-5 items-center">
        {process.env.NEXT_PUBLIC_HOST_NAME}/course/{course?.courseId} 
        <HiOutlineClipboardDocumentCheck
          className="h-5 w-5 cursor-pointer"
          onClick={handleShareOrCopy}
        />
        <FiShare2
          className="h-5 w-5 cursor-pointer"
          onClick={handleShareOrCopy}
        />
      </h2>
    </div>
  );
}

export default FinishScreen;
