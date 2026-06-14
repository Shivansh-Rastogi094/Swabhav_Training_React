import React from 'react';
import MemberRow from './MemberRow';

const TeamSection = ({ department, members }) => {
  // Sort members within this section by experience in descending order (Stretch Goal 1)
  const sortedMembers = [...members].sort((a, b) => b.experience - a.experience);

  // Determine the color class for the member count badge (Stretch Goal 3)
  let badgeColorClass = 'badge-grey';
  if (members.length >= 3) {
    badgeColorClass = 'badge-green';
  } else if (members.length === 2) {
    badgeColorClass = 'badge-amber';
  } else if (members.length === 1) {
    badgeColorClass = 'badge-red';
  }

  return (
    <div className="team-section">
      <div className="team-header">
        <h2 className="department-title">{department}</h2>
        <span className={`member-badge ${badgeColorClass}`}>
          {members.length} {members.length === 1 ? 'member' : 'members'}
        </span>
      </div>

      <div className="member-list">
        {members.length > 0 ? (
          sortedMembers.map((member) => (
            <MemberRow
              key={member.id}
              name={member.name}
              role={member.role}
              experience={member.experience}
              initials={member.initials}
            />
          ))
        ) : (
          // Show message if department is empty (Stretch Goal 2)
          <div className="empty-department-message">
            No members in this department
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamSection;
