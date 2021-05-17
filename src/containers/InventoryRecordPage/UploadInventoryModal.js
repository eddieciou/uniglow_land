import PropTypes from 'prop-types';
import React, { useState } from 'react';
import CommonModal from '../../components/Modal/CommonModal';
import Radio from '../../components/Radio/Radio';
import Selector from '../../components/Selector/Selector';
import { inventoryCodes } from '../../constants/constants';
import XLSXUploadInput from '../../components/Input/XLSXUploadInput';
import { post } from '../../services/reservation.service';

const UploadInventoryModal = ({
  band, open, onClose, onSuccess,
}) => {
  const [uploading, setUploading] = useState(false);
  const [inventoryType, setInventoryType] = useState(-1);
  const [inventoryCode, setInventoryCode] = useState(-1);
  const [file, setFile] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setUploading(true);
    post(`/${band}/inventory`, { file, inventory_code: inventoryCode }).then(
      (result) => {
        setUploading(false);
        onSuccess(result.result);
      },
    ).catch((error) => {
      setErrorMessage(error.message);
    });
  };

  const inventoryCodeList = inventoryCodes.filter((part) => part.inventoryCode * inventoryType > 0);

  return (
    <CommonModal
      title="商品入庫/出庫"
      description="請先選擇入庫或出庫，再上傳格式為.xlsx的Excel檔，以匯入庫存異動資料。備註：檔案的分頁不可超過一頁，欄位名稱須符合格式。"
      handleSubmit={handleSubmit}
      open={open}
      handelCancel={onClose}
      submitDisabled={!file}
      isLoading={uploading}
      content={() => (
        <>
          <Radio
            disabled={uploading}
            value={inventoryType}
            choices={[{ title: '出庫', value: -1 }, { title: '入庫', value: 1 }]}
            onChange={(event) => {
              setInventoryType(event.target.value);
              setInventoryCode(event.target.value);
            }}
          />
          <div style={{ marginTop: 8, display: 'flex', alignItems: 'center' }}>
            <div style={{ fontSize: 16, marginRight: 5 }}>選擇種類 :</div>
            <Selector
              value={inventoryCode}
              selectKey="inventoryCode"
              onChange={(e) => { setInventoryCode(e.target.value); }}
              selectors={inventoryCodeList}
              disabled={uploading}
            />
          </div>
          <XLSXUploadInput
            disabled={uploading}
            onLoadFile={(f) => {
              setErrorMessage('');
              setFile(f);
            }}
            styles={{
              marginLeft: 5,
              marginTop: 10,
            }}
          />
          {
            errorMessage && (
              <div
                style={{
                  color: 'red',
                  marginTop: 15,
                  fontSize: 14,
                }}
              >
                {errorMessage}
              </div>
            )
          }
        </>
      )}
    />
  );
};

UploadInventoryModal.propTypes = {
  onClose: PropTypes.func,
  onSuccess: PropTypes.func,
  open: PropTypes.bool.isRequired,
};

UploadInventoryModal.defaultProps = {
  onClose: undefined,
  onSuccess: undefined,
};

export default UploadInventoryModal;
