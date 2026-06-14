import React from 'react';

const MemberRow = ({ name, role, experience, initials }) => {
  return (
    <div className="member-row">
      <div className="member-avatar">
        {initials}
      </div>
      <div className="member-info">
        <div className="member-name">{name}</div>
        <div className="member-role">{role}</div>
      </div>
      <div className="member-experience">
        {experience} yrs exp
      </div>
      <div className="member-chevron">
        &gt;
      </div>
    </div>
  );
};

export default MemberRow;
