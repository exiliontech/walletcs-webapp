import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CreatableSelect from 'react-select';
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
  }
});

const DropDownWCS = props => {
  const {classes} = props;
  const [value, setValue] = useState(null);
  
  const items = props.items.map((val) => {
    return {label: val.name, value: val.name}
  });
  
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      minHeight: "64px",
      border: state.isFocused && state.menuIsOpen  ? '1px solid #010D17' : '1px solid #BBC1C7',
      borderBottom: state.isFocused && state.menuIsOpen  ?  'none !important' : '1px solid #BBC1C7',
      borderBottomLeftRadius: state.isFocused && state.menuIsOpen ? 0 : 4,
      borderBottomRightRadius: state.isFocused  && state.menuIsOpen ? 0 : 4,
      
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
      height: "64px",
      
    }),
    indicatorSeparator: provided => ({
    
    }),
    menu: provided => ({
      ...provided,
      zIndex: 1000,
      paddingTop: 0,
      border: '1px solid #010D17',
      borderTop: 'none',
      borderTopLeftRadius: 0,
      borderTopRightRadius:0,
      marginTop: 0,
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
      }
    })
    
  };
  
  
  return(
      <div className={classes.root}>
        <NoSsr>
          <CreatableSelect
              classes={classes}
              options={items}
              onChange={(newVal) => props.onChange(newVal.value)}
              placeholder="Chose method"
              styles={customStyles}
          />
        </NoSsr>
      </div>
  )
};

DropDownWCS.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(DropDownWCS);
