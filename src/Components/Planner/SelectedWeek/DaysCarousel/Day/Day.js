import React from 'react';
import Job from './Job/Job';
import classes from './Day.module.scss';

const Day = ({ jobsArray, day }) => {
  const jobs = jobsArray.sortedJobs;

  // merge sorted jobs into one array
  const mergeJobs = (jobs) => {
    const mergedArray = [];
    jobs.forEach((el) => {
      el.forEach((e) => {
        mergedArray.push(e);
      });
    });
    return mergedArray;
  };
  const mergedJobs = mergeJobs(jobs);

  // divide array into an even-ish number for each column of the selected week div
  const jobColumns = (jobs) => {
    // calc number per column, min 6
    const perColumn =
      Math.ceil((jobs.length + 3) / 5) > 6
        ? Math.ceil((jobs.length + 3) / 5)
        : 6;
    const columns = [[]];

    // add jobs to relevant array based on current column length
    let columnId = 0;
    let count = 0;
    jobs.forEach((el, i) => {
      // ensure title never appears as the last element in a column
      if (count >= perColumn || (!el.name && count >= perColumn - 1)) {
        columnId += 1;
        count = 0;
        columns.push([]);
      }
      columns[columnId].push(el);
      count++;
    });
    return columns;
  };

  // create jsx from the columns arrays
  const jobsJsx = jobColumns(mergedJobs).map((el) => {
    return el.map((e, i) => {
      // if plain text, return that, else return job component
      if (!e.name) {
        return (
          <p className={`${classes.p}`} key={e + i}>
            <span>{e}</span>
          </p>
        );
      }
      return (
        <Job
          key={`${e.name}${i}`}
          name={e.name}
          id={e.id}
          bookedFrom={e.bookedFrom}
          location={e.location}
          address={e.address}
          rebook={e.rebook}
          rebooked={e.rebooked}
          prevVisit={e.prevVisit}
          nextVisit={e.nextVisit}
          assigned={e.assigned}
          numbers={e.numbers}
          time={e.time}
          complete={e.complete === undefined ? false : e.complete}
          day={day}
        ></Job>
      );
    });
  });

  return (
    <div
      className={`carousel-item grey lighten-3 grey-text text-darken-3 ${classes.scrollable}`}
      href='#one!'
    >
      {jobsJsx[0].length === 0 ? (
        <h2 style={{ marginBottom: '50px', padding: '11%' }}>[ No Jobs ]</h2>
      ) : (
        <div className={classes.row}>
          <div className={classes.col}>{jobsJsx[0]}</div>
          <div className={classes.col}>{jobsJsx[1]} </div>
          <div className={classes.col}>{jobsJsx[2]} </div>
          <div className={classes.col}>{jobsJsx[3]} </div>
          <div className={classes.col}>{jobsJsx[4]} </div>
        </div>
      )}
      <div className='col s12 green lighten-1 green-text text-lighten-1'>.</div>
    </div>
  );
};

export default Day;
