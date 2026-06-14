import React, { useState } from 'react';
import { readStudents } from '../service/StudentService';
import { readCourseById } from '../service/CourseService';

const Data = () => {
  const [userData, setUserData] = useState([]);
  const [courses, setCourses] = useState([]);
  const [full_name,setFull_name] = useState("");
  const [showCourses, setShowCourses] = useState(false);
  const [showCoursesDetail, setShowCoursesDetail] = useState(false);
  const [coursesDetail, setCoursesDetail] = useState();
  const [showData, setShowData] = useState(false);

  const handleReadData = async () => {
    const response = await readStudents();
    console.log(response);
    setUserData(response);
    setShowData(true);
  };

  const handleViewCourses = (user) => {
    setCourses(user.courses);
    setFull_name(user.full_name)
    setShowCourses(true);
  }

  const handleViewCourseDetail =async(course)=>{
    const response =await readCourseById(course.id);
    console.log(response);
    setCoursesDetail(response);
    setShowCoursesDetail(true);
  }

  return (
    <div>
      <button onClick={handleReadData}>Read Data</button>
      { showData && (
        <>
        <div className="table-container">
          <table className="employee-table">
            <thead>
              <tr>
                <th>Sr no.</th>
                <th>Name</th>
                <th>Email</th>
                <th>Age</th>
                <th>Courses</th>
              </tr>
            </thead>

            <tbody>
              {userData.map((user, index) => (
                <tr key={index}>
                  <td>{index+1}</td>
                  <td>{user.full_name}</td>
                  <td>{user.email}</td>
                  <td>{user.age}</td>
                  <td><button onClick={()=>{handleViewCourses(user)}}>View Courses</button></td>
                </tr>
              ))}
            </tbody>
          </table>

             {showCourses > 0 && (
                <>
                  <h2>{full_name}'s Courses</h2>

                  <table className="employee-table">
                    <thead>
                      <tr>
                        <th>Sr no.</th>
                        <th>Course Name</th>
                        <th>Course Details</th>
                      </tr>
                    </thead>

                    <tbody>
                      {courses.map((course, index) => (
                        <tr key={index+1}>
                          <td>{course.id}</td>
                          <td>{course.course_name}</td>

                          <td>
                            <button
                              onClick={() =>
                                handleViewCourseDetail(course)
                              }
                            >
                              View Course Details
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {showCoursesDetail && (
                    <>
                      <h2>{coursesDetail.course_name}'s Details</h2>
                      <table className="employee-table">
                        <thead>
                          <tr>
                            <th>Course Name</th>
                            <th>Course Code</th>
                            <th>Course Fess</th>
                          </tr>
                        </thead>

                        <tbody>
                            <tr>
                              <td>{coursesDetail.course_name}</td>
                              <td>{coursesDetail.course_code}</td>
                              <td>{coursesDetail.fees}</td>
                
                            </tr>
                        </tbody>
                      </table>    
                  </>
                  )}
                </>
              )}

        </div>
        </>
        )}
    </div>
  );
};

export default Data;