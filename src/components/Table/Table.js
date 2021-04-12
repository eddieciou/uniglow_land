import PropTypes, { shape } from 'prop-types';
import React from 'react';
import MaterialTable, { MTableToolbar } from 'material-table';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = {
  customToolBar: {
    padding: '0px 30px',
    textAlign: 'right',
  },
  addDataButton: {
    color: '#35a728',
    borderColor: '#35a728',
    marginTop: '-70px',
  },
};

const useStyles = makeStyles(styles);

const defaultLocalization = {
  pagination: {
    labelDisplayedRows: '第{from}-{to}筆 / 共 {count} 筆',
    labelRowsSelect: '筆/頁',
  },
  toolbar: {
    searchPlaceholder: '搜尋關鍵字',
  },
  body: {
    emptyDataSourceMessage: '查無資料',
  },
};

const defaultOptions = {
  searchFieldAlignment: 'left',
  searchFieldStyle: { marginTop: '20px', marginLeft: '-20px' },
};

const Table = (
  {
    title, columns, data, localization, options, addDataButton, detail,
  },
) => {
  const classes = useStyles();

  return (
    <MaterialTable
      title={title}
      columns={columns}
      data={data}
      options={options}
      localization={localization}
      detailPanel={detail}
      components={{
        Toolbar: (props) => (
          <>
            <MTableToolbar {...props} />
            {
              addDataButton && (
                <div className={classes.customToolBar}>
                  <Button
                    className={classes.addDataButton}
                    onClick={addDataButton.handleClickAdd}
                    variant="outlined"
                    startIcon={addDataButton.icon}
                  >
                    {addDataButton.name}
                  </Button>
                </div>
              )
            }
          </>
        ),
      }}
    />
  );
};

Table.propTypes = {
  columns: PropTypes.arrayOf(shape({
    title: PropTypes.string.isRequired,
    field: PropTypes.string.isRequired,
    render: PropTypes.func,
  })).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  localization: PropTypes.objectOf(PropTypes.any),
  title: PropTypes.string,
  options: PropTypes.objectOf(PropTypes.any),
  addDataButton: PropTypes.shape({
    name: PropTypes.string.isRequired,
    handleClickAdd: PropTypes.func.isRequired,
    icon: PropTypes.node.isRequired,
  }),
  detail: PropTypes.func,
};

Table.defaultProps = {
  title: '',
  options: defaultOptions,
  localization: defaultLocalization,
  addDataButton: undefined,
  detail: undefined,
};

export default Table;
