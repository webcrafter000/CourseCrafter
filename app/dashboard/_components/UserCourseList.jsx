// "use client"
// import { db } from '@/configs/db'
// import { CourseList } from '@/configs/schema'
// import { useUser } from '@clerk/nextjs'
// import { desc, eq } from 'drizzle-orm'
// import React, { useContext, useEffect, useState } from 'react'
// import CourseCard from './CourseCard'
// import { UserCourseListContext } from '@/app/_context/UserCourseListContext'

// function UserCourseList() {

//   const [courseList,setCourseList]=useState([]);
//   const {userCourseList,setUserCourseList}=useContext(UserCourseListContext);
//   const {user}=useUser();


//   useEffect(()=>{
//     user&&getUserCourses();
//   },[user])

//   const getUserCourses=async()=>{
//     const result=await db.select().from(CourseList)
//     .where(eq(CourseList?.createdBy,user?.primaryEmailAddress?.emailAddress))
//     .orderBy(desc(CourseList.id))
//     setCourseList(result);
//     setUserCourseList(result);
//   }
//   return (
//     <div className='mt-10'>
//       <h2 className='font-medium text-xl'>My AI Courses</h2>

//       <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5'>
//         {courseList?.length>0?courseList?.map((course,index)=>(
//           <CourseCard course={course} key={index} refreshData={()=>getUserCourses()}/>
//         ))
//       :
//         [1,2,3,4,5].map((item,index)=>(
//           <div key={index} className='w-full mt-5
//           bg-slate-200 animate-pulse rounded-lg h-[270px]'>
//           </div>
//         ))
       
//       }
//       </div>
//     </div>
//   )
// }

// export default UserCourseList
"use client"
import { db } from '@/configs/db'
import { CourseList } from '@/configs/schema'
import { useUser } from '@clerk/nextjs'
import { desc, eq } from 'drizzle-orm'
import React, { useContext, useEffect, useState } from 'react'
import CourseCard from './CourseCard'
import { UserCourseListContext } from '@/app/_context/UserCourseListContext'

function UserCourseList() {
  const [courseList, setCourseList] = useState([]);
  const { userCourseList, setUserCourseList } = useContext(UserCourseListContext);
  const { user } = useUser();

  // Fetch user courses when user changes
  useEffect(() => {
    if (user) {
      getUserCourses();
    }
  }, [user]);

  const getUserCourses = async () => {
    try {
      if (!db || !CourseList) {
        throw new Error("Database or CourseList schema is not initialized");
      }
  
      const result = await db.select().from(CourseList)
        .where(eq(CourseList.createdBy, user?.primaryEmailAddress?.emailAddress))
        .orderBy(desc(CourseList.id));
  
      setCourseList(result);  // Update local state
      setUserCourseList(result);  // Update context if needed
    } catch (error) {
      console.error("Error fetching courses:", error);
      // Handle error gracefully, for example, show an error message
    }
  };
  
  return (
    <div className="mt-10">
      <h2 className="font-medium text-xl">My AI Courses</h2>

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {courseList?.length > 0 ? (
          courseList.map((course) => (
            // Assuming `course.id` is a unique identifier for each course
            <CourseCard 
              course={course} 
              key={course.id} // Using `course.id` as a unique key
              refreshData={getUserCourses} 
            />
          ))
        ) : (
          // Placeholder for loading state
          [1, 2, 3, 4, 5].map((item, index) => (
            <div key={index} className="w-full mt-5 bg-slate-200 animate-pulse rounded-lg h-[270px]" />
          ))
        )}
      </div>
    </div>
  );
}

export default UserCourseList;
