import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Selector from '../../../components/Selector/Selector';
import Button from '../../../components/Button/Button';

const HoleDayDefaultWorkstation = ({ workstationNum, onChange }) => {
  const [holeDayWorkstationNumSelected, setHoleDayWorkstationNumSelected] = useState(workstationNum);

  const classes = userStyles();
  const workstationNumSelectors = [...Array(workstationNum + 1).keys()].map((part) => (
    { value: part, title: part.toString() }
  ));
  return (
    <div className={classes.root}>
      <div className={classes.tittle}>整日工位預設值設定</div>

      <div className={classes.wrapper}>
        <div style={{ textAlign: 'center', marginRight: 10 }}>
          設定數量:
        </div>

        <Selector
          style={{ marginRight: 10 }}
          onChange={(value) => { setHoleDayWorkstationNumSelected(value); }}
          value={holeDayWorkstationNumSelected}
          selectors={workstationNumSelectors}
        />

        <Button
          title="套用"
          onClick={() => { onChange(holeDayWorkstationNumSelected); }}
        />
      </div>

    </div>
  );
};

const userStyles = makeStyles(() => ({
  root: {
    backgroundColor: 'white',
    marginTop: 30,
    paddingTop: 10,
    paddingBottom: 10,
    borderTopColor: 'rgb(224,224,224)',
    borderTopWidth: '0.01em',
    borderTopStyle: 'solid',
    borderBottomColor: 'rgb(224,224,224)',
    borderBottomWidth: '0.01em',
    borderBottomStyle: 'solid',
  },
  tittle: {
    textAlign: 'center',
  },
  wrapper: {
    marginTop: 15,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

}));

export default HoleDayDefaultWorkstation;
