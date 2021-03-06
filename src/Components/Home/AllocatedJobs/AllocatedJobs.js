import React, { useState } from 'react';
import AllocatedJob from './AllocatedJob/AllocatedJob';
import classes from './AllocatedJobs.module.scss';
import { dateFromString, days } from '../../../GlobalFunctions/dateOperations';
import { capitaliseFirstLetters } from '../../../GlobalFunctions/stringOperations';
import { useJobs } from '../../../Context/JobsContext';
import { useWeeks } from '../../../Context/WeeksContext';
import { useStaff } from '../../../Context/StaffContext';

const AllocatedJobs = ({ user, day, week }) => {
  const [displayDetails, setDisplayDetails] = useState();
  const { jobList } = useJobs();
  const weeks = useWeeks();

  const { colors } = useStaff();
  const color = colors[user];

  const employee = {
    number: Object.keys(colors).findIndex((el) => el === user),
    name: user,
  };

  class Jobs {
    constructor(jobsArray, date, employee) {
      this.jobsArray = jobsArray;
      this.date = date;
      this.employee = employee;
      this.init = (() => {
        this.setDate();
        this.setRawJobs();
        this.setlocations();
        this.setJobs();
        this.setJsx();
      })();
    }

    get jsx() {
      return this.jobsJsx;
    }

    setDate() {
      return (this.date = dateFromString(this.date).toLocaleDateString());
    }

    setlocations() {
      return (this.locations = [
        ...new Set(
          this.rawJobs.map((el) => {
            return el.location;
          })
        ),
      ].sort());
    }

    setRawJobs() {
      this.rawJobs = [];
      this.jobsArray.forEach((el) => {
        if (el.assigned === this.employee && el.nextVisit === this.date) {
          this.rawJobs.push(el);
        }
      });
    }

    setJobs() {
      const output = this.locations.map((element) => [element]);
      this.rawJobs.forEach((el) => {
        const index = output.findIndex((e) => e[0] === el.location);
        output[index].push(el);
      });
      return (this.jobs = output);
    }

    setJsx() {
      const joinedArray = [];
      this.jobs.forEach((el) => joinedArray.push(...el));

      return (this.jobsJsx = joinedArray.map((el, i) => {
        if (!el.name) {
          return (
            <div key={el + i} className={classes.location}>
              <p>{capitaliseFirstLetters(el)}</p>
            </div>
          );
        }
        return (
          <AllocatedJob
            key={`${el.name}${i}`}
            id={el.id}
            title={capitaliseFirstLetters(el.name)}
            time={el.time}
            address={el.address}
            numbers={el.numbers}
            notes={el.notes}
            details={displayDetails}
            setDetails={setDisplayDetails}
          ></AllocatedJob>
        );
      }));
    }
  }

  const totalTime = (assignedJobs) => {
    let result = 0;
    assignedJobs.forEach((el) => {
      if (el.time) result += el.time;
    });
    return result === 0
      ? `Time est.`
      : `Time est. ${Math.floor(result / 60)} hours ${result % 60} mins`;
  };

  const date = weeks[week][days[day].toLowerCase()].toLocaleDateString();
  const assignedJobs = new Jobs(jobList, date, employee.number);

  return (
    <div className={classes.jobs} style={{ border: `1px solid ${color}` }}>
      <i
        className={`${classes.person} material-icons`}
        style={{ color: color }}
      >
        person
      </i>
      <div className={classes.titleBox}>
        <h5>{employee.name}</h5>
      </div>
      <div className={classes.timeEst}>{totalTime(assignedJobs.rawJobs)}</div>
      <div className={classes.jobContent}>{assignedJobs.jsx}</div>
    </div>
  );
};

export default AllocatedJobs;
