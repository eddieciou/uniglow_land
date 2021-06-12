import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CommonModal from '../../components/Modal/CommonModal';
import XLSXUploadInput from '../../components/Input/XLSXUploadInput';
import { post } from '../../services/reservation.service';

const UploadSaleRecordModal = ({
  band, open, onClose, onSuccess,
}) => {
  const [file, setFile] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setUploading(true);
    post(`/${band}/sale_record`, { file }).then(
      (result) => {
        setUploading(false);
        onSuccess(result.result);
      },
    ).catch((error) => {
      setUploading(false);
      setErrorMessage(error.message);
    });
  };

  return (
    <CommonModal
      title="匯入銷售紀錄"
      description="請上傳格式為.xlsx的Excel檔，以新增商品。備註：檔案的分頁不可超過一頁，欄位名稱須符合格式。"
      handleSubmit={handleSubmit}
      open={open}
      handelCancel={onClose}
      submitDisabled={!file}
      isLoading={uploading}
      content={() => (
        <>
          <XLSXUploadInput onLoadFile={(f) => { setFile(f); }} />
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

export default UploadSaleRecordModal;

UploadSaleRecordModal.propTypes = {
  band: PropTypes.string.isRequired,
  onClose: PropTypes.func,
  onSuccess: PropTypes.func,
  open: PropTypes.bool.isRequired,
};

UploadSaleRecordModal.defaultProps = {
  onClose: () => {},
  onSuccess: () => {},
};
