import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import CreatableSelect, { components } from 'react-select';
import { withStyles } from '@material-ui/core/styles';
import NoSsr from '@material-ui/core/NoSsr';

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 100,
  },
  input: {
    display: 'flex',
    padding: 0,

  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    left: 0,
    right: 0,
  },
  selectLabel: {
    fontSize: 15,
    marginTop: 0,
    marginBottom: 2,
    textAlign: 'left',
    color: '#6E7782',
  },
});

const DropdownIndicator = props => (
    <components.DropdownIndicator {...props}>
      <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: 15, width: 16, height: 16 }}>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M0.451049 1.6585C-0.114711 1.01192 0.344468 0 1.20363 0L10.7961 0C11.6552 0 12.1144 1.01192 11.5487 1.6585L6.75243 7.13991C6.35402 7.59524 5.64569 7.59524 5.24728 7.13991L0.451049 1.6585Z" fill="#9198A0"/>
      </svg>
    </components.DropdownIndicator>
);

const DropDownWCS = (props) => {
  const { classes, placeHolder, items } = props;
  const { onChange, selectedOption, selectLabel } = props;
  const { onInputChange } = props;

  const newItems = items.map(val => ({ label: val.name, value: val.name }));

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      minHeight: '64px',
      border: state.isFocused && state.menuIsOpen ? '1px solid #010D17' : '1px solid #BBC1C7',
      borderBottom: state.isFocused && state.menuIsOpen ? 'none !important' : '1px solid #BBC1C7',
      borderBottomLeftRadius: state.isFocused && state.menuIsOpen ? 0 : 4,
      borderBottomRightRadius: state.isFocused && state.menuIsOpen ? 0 : 4,

      '&:hover': {
        borderColor: state.isFocused ? '1px solid #010D17' : '1px solid #BBC1C7',
      },
      '&:active': {
        border: '1px solid #010D17',
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
      },
      boxShadow: 'none',
    }),

    indicatorsContainer: provided => ({
      ...provided,
      height: '64px',

    }),
    indicatorSeparator: provided => ({

    }),
    DropdownIndicator: provided => ({
      ...provided,
      marginLeft: 15,
    }),
    menu: provided => ({
      ...provided,
      zIndex: 1000,
      paddingTop: 0,
      marginTop: 0,
      border: '1px solid #010D17',
      borderTop: 'none',
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
      boxShadow: 'none',
    }),
    option: (provided, state) => ({
      ...provided,
      textAlign: 'left',
      paddingLeft: 15,
      '&:hover': {
        backgroundColor: '#010D17',
        color: '#FFFFFF',
      },
      backgroundColor: state.isSelected ? '#010D17' : '#FFFFFF',
      ':active': {
        backgroundColor: state.isSelected ? '#010D17' : '#FFFFFF',
      },
    }),
  };

  return (
      <div className={cx(classes.root, classes.dropdownContainer)}>
        <NoSsr>
          <p className={classes.selectLabel}>{selectLabel}</p>
          <CreatableSelect
            value={selectedOption ? { label: selectedOption, value: selectedOption } : null}
            components = {{ DropdownIndicator }}
            classes={classes}
            options={newItems}
            onChange={newVal => onChange(newVal.value)}
            placeholder={placeHolder}
            styles={customStyles}
            onInputChange={onInputChange}
            onSelectResetsInput={false}
            onBlurResetsInput={false}
          />
        </NoSsr>
      </div>
  );
};

DropDownWCS.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  items: PropTypes.array,
  placeHolder: PropTypes.string,
  selectedOption: PropTypes.string,
  selectLabel: PropTypes.string,
  onInputChange: PropTypes.func,
};

export default withStyles(styles, { withTheme: true })(DropDownWCS);
