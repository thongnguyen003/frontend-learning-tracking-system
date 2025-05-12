import React from 'react';
import styles from './RoleSelector.module.css';

const RoleSelector = ({ role, setRole }) => {
  return (
    <div className={styles.roleButtons}>
      <button
        type="button"
        className={styles.roleButton + (role === 'student' ? ' ' + styles.active : '')}
        onClick={() => setRole('student')}
      >
        Student
      </button>
      <button
        type="button"
        className={styles.roleButton + (role === 'teacher' ? ' ' + styles.active : '')}
        onClick={() => setRole('teacher')}
      >
        Teacher
      </button>
    </div>
  );
};

export default RoleSelector;
