import React, { useState } from "react";
import { readStudents } from "../service/StudentService";
import { readCourseById } from "../service/CourseService";

const Data = () => {
  const [userData, setUserData] = useState([]);
  const [courses, setCourses] = useState([]);
  const [full_name, setFull_name] = useState("");
  const [showCourses, setShowCourses] = useState(false);
  const [showCoursesDetail, setShowCoursesDetail] = useState(false);
  const [coursesDetail, setCoursesDetail] = useState(null);

  const handleReadData = async () => {
    const response = await readStudents();
    setUserData(response);
  };

  const handleViewCourses = (user) => {
    setCourses(user.courses);
    setFull_name(user.full_name);
    setShowCourses(true);
    setShowCoursesDetail(false);
  };

  const handleViewCourseDetail = async (course) => {
    const response = await readCourseById(course.id);
    setCoursesDetail(response);
    setShowCoursesDetail(true);
  };

  return (
    <div className="data-page">
      <div className="header">
        <h1>Student Management Dashboard</h1>
        <button className="primary-btn" onClick={handleReadData}>
          Load Students
        </button>
      </div>

      {userData.length > 0 && (
        <>
          <h2 className="section-title">Students</h2>

          <div className="student-grid">
            {userData.map((user, index) => (
              <div className="student-card" key={index}>
                <div className="student-avatar">
                  {user.full_name.charAt(0)}
                </div>

                <div className="student-info">
                  <h3>{user.full_name}</h3>
                  <p>Email : {user.email}</p>
                  <p>Age: {user.age}</p>
                </div>

                <button
                  className="secondary-btn"
                  onClick={() => handleViewCourses(user)}
                >
                  View Courses
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      {showCourses && (
        <div className="panel">
          <h2>{full_name}'s Courses</h2>

          <div className="course-grid">
            {courses.map((course) => (
              <div className="course-card" key={course.id}>
                <h3>{course.course_name}</h3>

                <button
                  className="secondary-btn"
                  onClick={() => handleViewCourseDetail(course)}
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {showCoursesDetail && coursesDetail && (
        <div className="detail-card">
          <h2>{coursesDetail.course_name} Details</h2>

          <div className="detail-row">
            <span>Course Name</span>
            <strong>{coursesDetail.course_name}</strong>
          </div>

          <div className="detail-row">
            <span>Course Code</span>
            <strong>{coursesDetail.course_code}</strong>
          </div>

          <div className="detail-row">
            <span>Fees</span>
            <strong>₹ {coursesDetail.fees}</strong>
          </div>
        </div>
      )}
    </div>
  );
};

export default Data;