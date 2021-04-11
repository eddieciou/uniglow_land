import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Selector from '../../../components/Selector/Selector';

const DefaultWorkstation = ({ workstationNum, defaultWorkstations, onChangeDurationWorkstationNum }) => {
  const classes = userStyles();

  return (
    <>
      <div className={classes.tittle}>
        目前工位預設值
      </div>
      {
        defaultWorkstations.map(
          (part) => {
            const selectorMaxValue = part.workstation_num > workstationNum ? part.workstation_num : workstationNum;
            const selectors = [...Array(selectorMaxValue + 1).keys()].map((element) => (
              { value: element, title: element.toString() }
            ));
            return (
              <div key={part.start_time} className={classes.wrapper}>
                <div className={classes.header}>{part.start_time.substr(0, 5)}</div>
                <Selector
                  disableItemCondition={(value) => (value > workstationNum)}
                  onChange={(value) => {
                    const { start_time: startTime, end_time: endTime } = part;
                    onChangeDurationWorkstationNum(startTime, endTime, value);
                  }}
                  selectors={selectors}
                  value={part.workstation_num}
                  style={{ color: part.workstation_num > workstationNum ? 'red' : 'black' }}
                />
              </div>
            );
          },
        )
      }
    </>
  );
};

const userStyles = makeStyles(() => ({
  wrapper: {
    fontSize: 20,
    marginTop: 15,
    display: 'flex',
    justifyContent: 'center',
  },
  header: {
    marginRight: 10,
  },
  tittle: {
    marginTop: 10,
    textAlign: 'center',
  },
}));

export default DefaultWorkstation;
