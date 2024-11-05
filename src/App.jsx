import React, { useEffect, useState } from "react";
import { Button } from '@mantine/core';
import './App.css';

const App = () => {
  const [subjectsData, setSubjectsData] = useState([]);
  const [hoveredSubject, setHoveredSubject] = useState(null);

  useEffect(() => {
    fetch('./subjects.json')
      .then(response => response.json())
      .then(data => setSubjectsData(data.subjects))
      .catch(error => console.error('Error al cargar el JSON:', error));
  }, []);

  const subjectsBySemester = subjectsData.reduce((acc, subject) => {
    if (!acc[subject.semester]) {
      acc[subject.semester] = [];
    }
    acc[subject.semester].push(subject);
    return acc;
  }, {});
  const MAX_SUBJECTS_PER_SEMESTER = 7; 
  return (
    <div className="app-container">
      <div className="semester-container">
        {Object.keys(subjectsBySemester).map((semester) => (
          <div key={semester} className="semester-box">
            <h2>Semestre {semester}</h2>
            <div className="subjects-list">
              {subjectsBySemester[semester].map((subject, index) => {
                const isPrev = hoveredSubject && hoveredSubject.prev.includes(subject.name);
                const isNext = hoveredSubject && hoveredSubject.next.includes(subject.name);
                const buttonClass = `subject-button ${isPrev ? 'prev' : isNext ? 'next' : ''}`;

                return (
                  <Button 
                    key={index} 
                    onMouseEnter={() => setHoveredSubject(subject)} 
                    onMouseLeave={() => setHoveredSubject(null)} 
                    className={buttonClass}
                  >
                    {subject.name}
                  </Button>
                );
              })}

              {subjectsBySemester[semester].length < MAX_SUBJECTS_PER_SEMESTER && (
                Array.from({ length: MAX_SUBJECTS_PER_SEMESTER - subjectsBySemester[semester].length }).map((_, index) => (
                  <Button key={`empty-${index}`} className="subject-button" disabled>
                   
                  </Button>
                ))
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
