import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Selector from '../../../components/Selector/Selector';
import Button from '../../../components/Button/Button';

const TotalWorkstation = ({ style, workstationNum, onChange }) => {
  const classes = userStyles();
  const [workstationNumSelected, setWorkstationNumSelected] = useState(workstationNum);

  const workstationNumSelectors = [...Array(10).keys()].map((part) => (
    { value: part, title: part.toString() }
  ));

  return (
    <div className={classes.wrapper} style={{ display: 'flex', alignItems: 'center', ...style }}>
      總工位數量:
      <div className={classes.showWorkstationNum}>
        {workstationNum}
      </div>
      <div style={{ marginRight: 10 }}>
        總工位數量設定:
      </div>
      <Selector
        selectors={workstationNumSelectors}
        value={workstationNumSelected}
        onChange={(value) => { setWorkstationNumSelected(value); }}
        style={{ marginRight: 10 }}
      />
      <Button
        title="套用"
        onClick={() => { onChange(workstationNumSelected); }}
      />
    </div>
  );
};

const userStyles = makeStyles(() => ({
  wrapper: {
    backgroundColor: 'white',
    padding: 10,
    borderBottomColor: 'rgb(224,224,224)',
    borderBottomWidth: '0.01em',
    borderBottomStyle: 'solid',
    borderTopColor: 'rgb(224,224,224)',
    borderTopWidth: '0.01em',
    borderTopStyle: 'solid',
  },
  showWorkstationNum: {
    marginLeft: 10,
    marginRight: 20,
    width: 100,
    textAlign: 'center',
    height: '100%',
    fontSize: 16,
    borderBottomColor: 'rgb(224,224,224)',
    borderBottomWidth: '0.01em',
    borderBottomStyle: 'solid',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

export default TotalWorkstation;
