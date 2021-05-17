import PropTypes from 'prop-types';
import React, { Component } from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';

class XLSXUploadInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileName: undefined,
      isUploading: false,
      uploadError: false,
    };
    this.fileInputRef = React.createRef();
  }

  fileLoad = (e) => {
    this.props.onLoadFile(e.target.result);
    this.setState({
      isUploading: false,
    });
  }

  fileUploadInputChange = (e) => {
    if (e.target.files.item(0)) {
      this.setState({
        isUploading: true,
        uploadError: false,
      });

      const fileName = e.target.value.split('\\').pop();
      const { mandatoryFileName } = this.props;
      if ((mandatoryFileName && mandatoryFileName === fileName) || !mandatoryFileName) {
        const file = e.target.files.item(0);
        const fr = new FileReader();
        fr.addEventListener('load', this.fileLoad);
        fr.readAsDataURL(file);
        this.setState({
          fileName,
        });
      } else {
        this.props.onLoadFile(undefined);
        this.setState({
          isUploading: false,
          uploadError: true,
          fileName: undefined,
        });
      }
    }
  }

  fileUploadAction = () => this.fileInputRef.current.click();

  renderLabel = () => {
    const { fileName, uploadError } = this.state;
    const { styles } = this.props;
    return (
      <div style={{ ...styles, color: uploadError ? 'red' : 'gray', marginLeft: 5 }}>
        {fileName || '僅可上傳一個分頁的xlsx檔'}
      </div>
    );
  }

  render() {
    const { styles, title, disabled } = this.props;
    const { isUploading, fileName } = this.state;

    return (
      <div style={{ ...styles }}>
        <input
          accept=".xlsx"
          type="file"
          hidden
          ref={this.fileInputRef}
          onChange={this.fileUploadInputChange}
        />
        <FormControlLabel
          control={(
            <Button
              disabled={disabled || isUploading}
              variant="contained"
              disableElevation
              onClick={this.fileUploadAction}
              style={isUploading || disabled ? { backgroundColor: '#939292', ...styles } : styles}
            >
              { isUploading && <CircularProgress size={20} style={{ marginRight: 5, color: 'white' }} /> }
              { title }
              { !title && `${!isUploading && fileName ? '重選' : '選擇'}檔案`}
            </Button>
          )}
          label={this.renderLabel()}
        />
      </div>
    );
  }
}

XLSXUploadInput.propTypes = {
  onLoadFile: PropTypes.func.isRequired,
  title: PropTypes.string,
  styles: PropTypes.shape({}),
  mandatoryFileName: PropTypes.string,
  disabled: PropTypes.bool,
};

XLSXUploadInput.defaultProps = {
  title: undefined,
  styles: undefined,
  mandatoryFileName: undefined,
  disabled: false,
};

export default XLSXUploadInput;
