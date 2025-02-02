// src/components/CourseList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'

const Tutor_dashboard = () => {
  const BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const baseUrl = `${BASE_URL}/courses`;
  
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const userToken = localStorage.getItem('userToken')
        console.log(userToken);
        const response = await axios.get(`${BASE_URL}/courses/courses/list-courses/`, 
          {
            headers: {
              Authorization: `Token ${userToken}`,
            },
          }
        );
        setCourses(response.data);
        console.log("Courses: ",response.data);
        setLoading(false);
      } catch (err) {
        setError(err.response ? err.response.data : 'Error fetching courses');
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <div className="mx-auto mt-10 lg:w-[90%]">
      <h1 className="text-2xl font-bold mb-4 md:ml-[275px] text-center text-cyan-950">My Courses</h1>
      {courses.length === 0 ? (
        <div className='items-center justify-center mx-auto w-[80%] flex flex-col space-y-3 md:ml-[350px] md:w-[50%] lg:items-start'>
          <p className='text-yellow-300 font-semibold text-xl  lg:ml-20px'>You haven't created any course!!</p>
        <li className="bg-white lg:container rounded-xl w-[90%] items-center justify-center mx-auto hover:cursor-pointer lg:rounded-3xl mb-4 border-dashed border-2 dark:border-white dark:bg-gray-700 dark:text-gray-200 lg:w-[300px] h-48 flex lg:ml-[20px]">
            <div className="flex items-center justify-center my-auto mx-auto lg:h-50">
              <Link to='/Create-course' className="dark:bg-slate-500 dark:text-white bg-gray-200 text-cyan-950 hover:shadow-lg font-bold py-2 px-4 rounded-3xl focus:outline-none focus:shadow-outline">Create Course</Link>
            </div>
          </li>
          </div>
      ) : (
        <ul className="container md:w-[60%] md:ml-[275px] lg:ml-[260px] lg:grid lg:grid-cols-4 lg:w-[80%]">
          {courses.map((course) => (
            <li key={course.id} className="bg-white w-[90%] shadow-lg items-center justify-center mx-auto rounded lg:rounded-3xl  mb-4 dark:bg-gray-800 dark:text-gray-200 lg:w-[300px]">
              <img src={`${baseUrl}${course.picture}`} alt={course.course_name} className="w-full h-40 object-cover rounded-tl-3xl rounded-tr-3xl"/>
              <h2 className="text-xl font-bold mb-2 pt-2 p-1">{course.course_name}</h2>
              <p className="text-sm text-gray-500 px-2">Course Creator: {course.teacher_name}</p>
              <p className="text-gray-700 line-clamp-3 dark:text-gray-300 p-2">{course.course_description}</p>
              <div className='flex gap-2 flex-row pt-4 pb-2'>
              <p className="text-sm text-gray-500 py-3 p-2">Enrolled: {course.teacher}</p> 
                <Link to="/update-course" className="dark:bg-slate-500 dark:text-white bg-gray-200 text-cyan-950 hover:shadow-lg font-bold py-2 px-4 rounded-3xl focus:outline-none focus:shadow-outline">Edit Course</Link>
              </div>   
            </li>
          ))}
          <li className="bg-white lg:container rounded-xl w-[90%] items-center justify-center mx-auto hover:cursor-pointer lg:rounded-3xl mb-4 border-dashed border-2 dark:border-white dark:bg-gray-700 dark:text-gray-200 lg:w-[300px] h-48 flex lg:ml-[20px]">
            <div className="flex items-center justify-center my-auto mx-auto lg:h-50">
              <Link to='/Create-course' className="dark:bg-slate-500 dark:text-white bg-gray-200 text-cyan-950 hover:shadow-lg font-bold py-2 px-4 rounded-3xl focus:outline-none focus:shadow-outline">Add Course</Link>
            </div>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Tutor_dashboard;
