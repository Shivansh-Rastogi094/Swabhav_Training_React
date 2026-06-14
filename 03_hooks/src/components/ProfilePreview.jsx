import React from "react";

const ProfilePreview = ({
  formData,
  skills,
  isActive,
}) => {
  return (
    <div className="card">

      <h2>Live Preview</h2>

      <div className="profile-card">

        <div className="header">

          <div className="avatar">
            {formData.name
              ? formData.name
                  .split(" ")
                  .map((word) => word[0])
                  .join("")
                  .toUpperCase()
              : "U"}
          </div>

          <div>
            <h3>
              {formData.name || "Your Name"}
            </h3>

            <p>
              {formData.email ||
                "your@email.com"}
            </p>
          </div>

          <div>
            {isActive ? (
              <span className="active">
                Active
              </span>
            ) : (
              <span className="inactive">
                Inactive
              </span>
            )}
          </div>

        </div>

        <div className="profile-info">

          <p>
            <strong>Phone:</strong>{" "}
            {formData.phone || "-"}
          </p>

          <p>
            <strong>Course:</strong>{" "}
            {formData.course || "-"}
          </p>

          <p>
            <strong>Bio:</strong>{" "}
            {formData.bio || "-"}
          </p>

          <div className="skills">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="tag"
              >
                {skill}
              </span>
            ))}
          </div>

        </div>

      </div>

      <div className="snapshot">
        <h3>State Snapshot</h3>

        <pre>
          {JSON.stringify(
            {
              ...formData,
              skills,
            },
            null,
            2
          )}
        </pre>
      </div>

    </div>
  );
};

export default ProfilePreview;