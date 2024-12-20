import React from 'react';
import { useCourseState } from '../context/CourseProvider';

const Timetable = () => {
    const { selectedCourses, handleRemoveCourse } = useCourseState();
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayRepeatMap = {
      Monday: 'Monday',
      Tuesday: 'Tuesday',
      Wednesday: 'Wednesday',
      Thursday: 'Monday',
      Friday: 'Tuesday',
      Saturday: 'Wednesday'
    }
    const timeSlots = ['T1', 'T2', 'T3', 'T4', 'T5', 'T6'];
    const slotMap = {
      T1: '8:30 - 9:55',
      T2: '10:00 - 11:25',
      T3: '11:30 - 12:55',
      T4: '2:00 - 3:25',
      T5: '3:30 - 4:55',
      T6: '5:00 - 6:25'
    }
  
    const findCourse = (day, slot) => {
      return selectedCourses.find(course => course.day === day && course.slot === slot);
    };

  return (
    <div className="timetable-grid">
      <div className="grid-header">
        <div className="header-cell"></div>
        {timeSlots.map(slot => (
          <div key={slot} className="header-cell">{slotMap[slot]}</div>
        ))}
      </div>
      {days.map(day => (
        <div key={day} className="grid-row">
          <div className="day-cell">{day}</div>
          {timeSlots.map(slot => {
            const course = findCourse(dayRepeatMap[day], slot);
            return (
              <div 
                key={`${day}-${slot}`} 
                className="grid-cell"
                onClick={() => { 
                  if(!course){
                    return
                  }
                  confirmResult = confirm(`Are you sure you want to remove '${course.name}'?`)
                  if(confirmResult === true) {
                    handleRemoveCourse(course)
                  }
                }}
              >
                {course ? (
                  <div className="selected-course">
                    <p className="course-name">{course.name}</p>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Timetable;