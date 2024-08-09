import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// import { useCourseDetail } from './useCourseDetail';
import { UserContext } from '../../contexts/userContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CourseInfo = () => {
  const { courseId } = useParams();
  // const { courseData, loading, error } = useCourseDetail(courseId);
  const { user } = useContext(UserContext);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [courseDetails, setCourseDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  console.log("User: ", user);

  useEffect(() => {
  const fetchCourseDetails = async () => {
    try {
      const userToken = localStorage.getItem('userToken');
      const response = await axios.get(`http://localhost:8000/courses/course_info/${courseId}/`, {
        headers: {
          'Authorization': `Token ${userToken}`,
        },
      });

      if (response.status === 200) {
        setCourseDetails(response.data);
        console.log("COURSE DETAILS:  ", courseDetails);
      } else {
        setErrorMessage('Failed to fetch course details');
      }
    } catch (error) {
      console.error('Error fetching course details:', error);
      setErrorMessage(error.message || 'An error occurred while fetching course details');
    }
  };

 
    fetchCourseDetails();
  }, []);

 

  const enrollCourse = async () => {
    try {
      const userToken = localStorage.getItem('userToken');
      const response = await axios.post(`http://localhost:8000/courses/enroll/${courseId}/`, {},
        {
          headers: {
            'Authorization': `Token ${userToken}`,
          },
        });

      if (response.status !== 200) {
        // throw new Error('Failed to enroll in the course');
        setErrorMessage(response.data)
      }

      // Update enrollment status
      setIsEnrolled(true);
      setErrorMessage('');
      // console.log("Enrollment status2: ", isEnrolled);
    } catch (error) {
      console.error("Error enrolling in course: ", error);
      setErrorMessage(error.message[0] || "An error occurred");
    }
  };

  const unenrollCourse = async () => {
    try {
      const userToken = localStorage.getItem('userToken');
      const response = await axios.post(`http://localhost:8000/courses/unenroll/${courseId}/`, {},
        {
          headers: {
            'Authorization': `Token ${userToken}`,
          },
        });

      if (response.status !== 200) {
        // throw new Error('Failed to unenroll from the course');
        setErrorMessage(response.data)
      }

      // Update enrollment status
      setIsEnrolled(false);
    } catch (error) {
      console.error(error);
    }
  };
  


  // useEffect(() => {
  //   fetchCourseDetails()
  //     .then(data => {
  //       setCourseDetails(data);
  //       setLoading(false);
  //     })
  //     .catch(error => {
  //       console.error('Failed to fetch course details:', error);
  //       setErrorMessage('Failed to load course details.');
  //       setLoading(false);
  //     });
  // }, []);

 



  // const numberOfChapters = courseDetails.chapters_with_lessons.length;
  // const numberOfLessons = courseDetails.chapters_with_lessons.reduce((acc, chapter) => acc + chapter.lessons.length, 0);

  return (
    <>
    <div className='dark:bg-gray-800 h-[100vh]'>
    <div className="mx-auto p-4 text-cyan-950 dark:text-gray-100 md:pl-[280px] md:w-[90%] lg:w-[60%] lg:pl-[200px]">
    {courseDetails ? (
      <>
      <h1 className="text-3xl font-bold mb-4">{courseDetails['course_name']}</h1>
      {/* // {errorMessage && <div className='text-red-500 py-3'>{errorMessage}</div>} */}
       <p className='text-justify text-xl dark:text-gray-300'>{courseDetails['course_description']}</p>
       <p className='text-justify text-md dark:text-gray-300 py-3'>Total Chapters: <span className='font-semibold italic'>{courseDetails['total_chapters']}</span></p>
       <p className='text-justify text-md dark:text-gray-300 py-3'>Total Lessons: <span className='font-semibold italic'>{courseDetails['total_lessons']}</span></p>
       <p className='text-justify text-md dark:text-gray-300 py-3'>Total Quizes: <span className='font-semibold italic'>{courseDetails['total_quizzes']}</span></p>
       <p className='text-justify text-md dark:text-gray-300 py-3'>Enrolled Students: <span className='font-semibold italic'>{courseDetails['students']?.length || 0}</span></p>
       <p className='text-justify text-md dark:text-gray-300 py-3'>Course Creator: <span className='font-semibold italic'>{courseDetails['teacher_name']}</span></p>
      {/* <p className='mt-2'>Number of Chapters: <spam className="font-bold px-2">{numberOfChapters}</spam></p> */}
      {/* <p>Number of Lessons: <spam className="font-bold px-2">{numberOfLessons}</spam></p> */}
      {/* <p>Course Creator: <spam className="font-bold px-2">{courseDetails.course_creator}</spam></p> */}
      </>
    ) : (
      <div>Loading course details...</div> // Or any other placeholder content
    )}
      
      {user.user_type ==="Student" && (
          isEnrolled ? ( 
            <button className='bg-red-600 dark:bg-red-600 dark:text-white text-gray-100 p-2 rounded my-2 font-semibold' onClick={unenrollCourse}>Unenroll</button>
           ) : ( 
            <button className='bg-cyan-950 text-gray-100 p-1 rounded my-2 font-semibold dark:bg-gray-200 dark:text-cyan-950 dark:bg-yellow-400' onClick={enrollCourse}>Enroll</button>
          )
         )
         }
      
      {isEnrolled && (
      <button onClick={() => navigate(`/course/${courseId}`)} className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-4'>
        More Info
      </button>
    )}
    {/* {user.user_type === "Teacher" && ( */}
      <button onClick={() => navigate(`/course/${courseId}`)} className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded ml-4'>
        More Info
      </button>
    {/* )} */}
    </div>
    </div>
    </>
  );
};


export default CourseInfo;