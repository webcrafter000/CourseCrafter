"use client";
import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import CourseBasicInfo from "../_components/CourseBasicInfo";
import { HiOutlineClipboardDocumentCheck } from "react-icons/hi2";
import { FaFacebook, FaTwitter, FaLinkedin, FaWhatsapp, FaEnvelope } from "react-icons/fa"; // Add WhatsApp and Gmail icons
import { toast } from "react-toastify"; // Import react-toastify for toast notifications
import "react-toastify/dist/ReactToastify.css"; // Import toast CSS

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

  const handleCopyToClipboard = async () => {
    await navigator.clipboard.writeText(
      process.env.NEXT_PUBLIC_HOST_NAME + "/course/" + course?.courseId
    );
    toast.success("Copied to clipboard!", { autoClose: 2000 }); // Show toast for 2 seconds
  };

  const handleSocialShare = (platform) => {
    const url = process.env.NEXT_PUBLIC_HOST_NAME + "/course/" + course?.courseId;
    let shareUrl = "";

    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${url}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
        break;
      case "whatsapp":
        shareUrl = `https://wa.me/?text=${url}`;
        break;
      case "gmail":
        shareUrl = `mailto:?subject=Check out this course&body=${url}`;
        break;
      default:
        return;
    }

    window.open(shareUrl, "_blank", "width=600,height=400");
  };

  return (
    <div className="px-10 md:px-20 lg:px-44 my-7">
      <h2 className="text-center font-bold text-2xl my-3 text-primary">
      Congrats!🥳 Click  Dashboard To Start Learning
      </h2>
      <CourseBasicInfo course={course} refreshData={() => console.log()} />
      <h2 className="mt-3">Course URL:</h2>
      <div className="text-center text-gray-400 border p-2 rounded flex gap-3 items-center justify-center">
        <span className="flex gap-2 items-center">
          {process.env.NEXT_PUBLIC_HOST_NAME}/course/{course?.courseId}
          <HiOutlineClipboardDocumentCheck
            className="h-5 w-5 cursor-pointer"
            onClick={handleCopyToClipboard} // Copy link to clipboard
          />
        </span>
        <div className="flex gap-3">
          {/* Social Media Share Icons */}
          <FaFacebook
            className="h-5 w-5 cursor-pointer"
            onClick={() => handleSocialShare("facebook")}
          />
          <FaTwitter
            className="h-5 w-5 cursor-pointer"
            onClick={() => handleSocialShare("twitter")}
          />
          <FaLinkedin
            className="h-5 w-5 cursor-pointer"
            onClick={() => handleSocialShare("linkedin")}
          />
          <FaWhatsapp
            className="h-5 w-5 cursor-pointer"
            onClick={() => handleSocialShare("whatsapp")}
          />
          <FaEnvelope
            className="h-5 w-5 cursor-pointer"
            onClick={() => handleSocialShare("gmail")}
          />
        </div>
      </div>
    </div>
  );
}

export default FinishScreen;
