import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
    textMessage: {
        fontWeight: 'bold',
        fontSize: '12px'
    },
    linkMessage: {
        color: '#000000'
    }
})

const Message = props => {
    const {classes, networkName, link} = props;

    return (
        <div>
            <p className={classes.textMessage}>IMPORTANT: This operation is performed on the {networkName} (test) network. 
                <a className={classes.linkMessage} href={link}>Click here for the main network</a>
            </p>
        </div>
    )
}

export default withStyles(styles)(Message);

Message.propTypes = {
    networkName: PropTypes.string,
    link: PropTypes.string
}