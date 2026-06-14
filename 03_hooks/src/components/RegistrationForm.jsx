import React, { useRef, useState } from "react";
import ProfilePreview from "./ProfilePreview";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    course: "",
    bio: "",
  });

  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");
  const [isActive, setIsActive] = useState(false);

  const nameRef = useRef();
  const phoneRef = useRef();
  const emailRef = useRef();
  const courseRef = useRef();
  const bioRef = useRef();

  const addSkill = () => {
    if (skillInput.trim() === "") {
      return;
    }

    setSkills([...skills, skillInput]);
    setSkillInput("");
  };

  const removeSkill = (skill) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  const validateForm = () => {
    const name = nameRef.current.value;
    const phone = phoneRef.current.value;
    const email = emailRef.current.value;
    const course = courseRef.current.value;
    const bio = bioRef.current.value;

    if (
      name.trim() === "" ||
      phone.trim() === "" ||
      email.trim() === "" ||
      course.trim() === "" ||
      bio.trim() === ""
    ) {
      alert("Please fill all fields");
      setIsActive(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      alert("Invalid Email");
      setIsActive(false);
      return;
    }

    if (phone.length !== 10) {
      alert("Phone number must contain 10 digits");
      setIsActive(false);
      return;
    }

    setIsActive(true);
    alert("Profile Activated");
  };

  return (
    <div className="container">

      {/* Left Card */}
      <div className="card">
        <h2>Registration Form</h2>

        <input
          ref={nameRef}
          placeholder="Full Name"
          onChange={(e) =>
            setFormData({
              ...formData,
              name: e.target.value,
            })
          }
        />

        <input
          ref={phoneRef}
          placeholder="Phone Number"
          onChange={(e) =>
            setFormData({
              ...formData,
              phone: e.target.value,
            })
          }
        />

        <input
          ref={emailRef}
          placeholder="Email Address"
          onChange={(e) =>
            setFormData({
              ...formData,
              email: e.target.value,
            })
          }
        />

        <input
          ref={courseRef}
          placeholder="Course"
          onChange={(e) =>
            setFormData({
              ...formData,
              course: e.target.value,
            })
          }
        />

        <textarea
          ref={bioRef}
          rows="4"
          placeholder="Tell us about yourself..."
          onChange={(e) =>
            setFormData({
              ...formData,
              bio: e.target.value,
            })
          }
        />

        <div className="skill-box">
          <input
            placeholder="Add Skill"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
          />

          <button
            type="button"
            onClick={addSkill}
          >
            Add
          </button>
        </div>

        <div className="skills">
          {skills.map((skill, index) => (
            <span key={index} className="tag">
              {skill}

              <button
                type="button"
                onClick={() => removeSkill(skill)}
              >
                ×
              </button>
            </span>
          ))}
        </div>

        <button
          className="submit-btn"
          type="button"
          onClick={validateForm}
        >
          Validate Profile
        </button>
      </div>

      {/* Right Card */}
      <ProfilePreview
        formData={formData}
        skills={skills}
        isActive={isActive}
      />

    </div>
  );
};

export default RegistrationForm;