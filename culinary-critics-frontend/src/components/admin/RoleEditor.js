import React, { useState } from 'react';
import '../css/RoleEditor.css';
const RoleEditor = ({ user, onSubmit }) => {
  const [roles, setRoles] = useState({
    Admin: user.roles.Admin ? true : false,
    Editor: user.roles.Editor ? true : false,
    User: true
  });
  const [isEditing, setIsEditing] = useState(false);

  const toggleRole = role => {
    if (role !== 'User') {
      setRoles(prevRoles => ({ ...prevRoles, [role]: !prevRoles[role] }));
    }
  };

  const handleSubmit = () => {
    const updatedRoles = Object.keys(roles).filter(role => roles[role]);
    onSubmit(user._id, updatedRoles);
  };

  return (
    <div>
      <button className='manage-roles-btn' onClick={() => setIsEditing(!isEditing)}>
        Manage roles
      </button>
      {isEditing && (
        <div className="role-editor-buttons">
          {Object.entries(roles).map(([role, isActive]) => (
            <button
              key={role}
              className={`btn ${isActive ? 'green' : 'red'}`}
              onClick={() => toggleRole(role)}
              disabled={role === 'User'}
            >
              {role}
            </button>
          ))}
          <button className='btn submit' onClick={handleSubmit}>Submit</button>
        </div>
      )}
    </div>
  );
};

export default RoleEditor;