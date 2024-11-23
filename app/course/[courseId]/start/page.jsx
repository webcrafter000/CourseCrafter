"use client";
import { db } from "@/configs/db";
import { Chapters, CourseList } from "@/configs/schema";
import { and, eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import ChapterListCard from "./_components/ChapterListCard";
import ChapterContext from "./_components/ChapterContent";
import ChapterContent from "./_components/ChapterContent";
import { HiOutlineBars3 } from "react-icons/hi2";

function CourseStart({ params }) {
  const [course, setCourse] = useState();
  const [selectedChapter, setSelectedChapter] = useState([]);
  const [chapterContent,setChapterContent] = useState()
  const [showBar,setShowBar] = useState(false)
  useEffect(() => {
    GetCourse();
  }, []);
  const GetCourse = async () => {
    const result = await db
      .select()
      .from(CourseList)
      .where(eq(CourseList.courseId, params?.courseId));
    setCourse(result[0]);
  };
  const GetSelectedChapterContent = async(chapterId)=>{
    const result = await db.select().from(Chapters).where(and(eq(Chapters?.chapterId,chapterId),eq(Chapters.courseId,course?.courseId)))

    setChapterContent(result[0])
    
  }
  return (
    <div>
      {/* Chapter list sidebar */}
      <div className={`fixed md:w-64 ${showBar ? 'w-full bg-white text-black':'hidden'} md:block h-full border-r shadow-sm overflow-y-scroll scroll-smooth`}>
        
        <h2 className="font-medium text-lg bg-primary p-4 text-white">
          {course?.courseOutput?.course?.name}
        </h2>

        <div>
          {course?.courseOutput?.course?.chapters.map((chapter, index) => (
            <div
              key={index}
              className={`cursor-pointer hover:bg-purple-50 ${
                selectedChapter.name == chapter?.name && "bg-purple-100"
              }`}
              onClick={() => {setSelectedChapter(chapter); GetSelectedChapterContent(index); setShowBar(false)}}
            >
              <ChapterListCard chapter={chapter} index={index} />
            </div>
          ))}
        </div>
      </div>
      <HiOutlineBars3 className="block md:hidden text-2xl text-primary cursor-pointer" onClick={()=>setShowBar(true)}/>
      {/* Content Div */}
      <div className="md:ml-64">
        <ChapterContent chapter={selectedChapter} content={chapterContent}/>
      </div>
    </div>
  );
}

export default CourseStart;
