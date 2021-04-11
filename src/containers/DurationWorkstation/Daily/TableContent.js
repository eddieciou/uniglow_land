import React, { useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Selector from '../../../components/Selector/Selector';
import { post } from '../../../services/reservation.service';
import VerifyPermission from '../../../components/VerifyPermission';
import TextBox from '../../../components/TextBox/TextBox';

const TableContent = ({
  shopId, currentWorkstationNum, workstationNumSelectors, dateInfo, startTime, endTime,
}) => {
  const [apiPosting, setApiPosting] = useState(false);
  const [selectorValue, setSelectValue] = useState(currentWorkstationNum);

  const selectorOnChange = (value) => {
    setApiPosting(true);
    const body = {
      date: dateInfo.date,
      start_time: startTime,
      end_time: endTime,
      workstation_num: value,
    };
    post(`/shops/${shopId}/daily_shop_duration_workstation`, body).then(
      (result) => {
        if (result.success) {
          setSelectValue(value);
          setApiPosting(false);
        }
      },
    );
  };

  return apiPosting ? <CircularProgress size={15} /> : (
    <VerifyPermission
      perform="workstation:update"
      yes={() => (
        <Selector
          style={{ marginTop: 10, marginBottom: 10 }}
          width="70%"
          onChange={selectorOnChange}
          value={selectorValue}
          disabled={dateInfo.beforeToday || dateInfo.isSunday || dateInfo.isToday}
          selectors={workstationNumSelectors}
        />
      )}
      no={() => (
        <TextBox
          disabled={dateInfo.beforeToday || dateInfo.isSunday || dateInfo.isToday}
        >
          {currentWorkstationNum}
        </TextBox>
      )}
    />
  );
};

export default TableContent;
