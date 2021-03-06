import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import AppBar from  '../../components/AppBar/AppBar';
import Toolbar, { styles as toolbarStyles } from '../../components/Toolbar/Toolbar';

import {useLocation, useHistory} from 'react-router-dom';
import { signOutUrl } from '../../config/url';
import request from '../../utils/request';
import {CURRENT_USER} from '../../constants/applicationConstants'


const styles = (theme) => ({
  title: {
    fontSize: 24,
  },
  placeholder: toolbarStyles(theme).root,
  toolbar: {
    justifyContent: 'space-between',
  },
  left: {
    flex: 1,
  },
  leftLinkActive: {
    color: theme.palette.common.white,
  },
  right: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  rightLink: {
    fontSize: 16,
    color: theme.palette.common.white,
    marginLeft: theme.spacing(3),
  },
  linkSecondary: { 
    color: theme.palette.secondary.main,
  },
});

function AppAppBar(props) {
  const history = useHistory();
  const { classes } = props;
  const location = useLocation();
 
  const logout = async () => {
    try {
      const currentUserStr = localStorage.getItem(CURRENT_USER);
      if(currentUserStr) {
        const currentUserData  = JSON.parse(currentUserStr);
        const resp = await request(signOutUrl, {
          method: 'POST',
          body: JSON.stringify(currentUserData.currentUser)
        })
        localStorage.removeItem(CURRENT_USER);
        history.push('/signin');
      }
     
      
    } catch (error) {

      
    }
    
  }
   
  
  return (
    <div>
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
          <div className={classes.left} />
          <Link
            variant="h6"
            underline="none"
            color="inherit"
            className={classes.title}
            href="https://www.youtube.com/feed/my_videos"
          >
            {'ecommerce platform'}
          </Link>
          <div className={classes.right}>
          {location.pathname === '/' && <Link
              color="inherit"
              variant="button"
              underline="none"
              className={ clsx(classes.rightLink, {[classes.linkSecondary] : location.pathname === '/'})}
              onClick={logout}
            >
              {'Logout'}
            </Link>}
            {(location.pathname === '/signin' || location.pathname === '/signup')  && <>
              <Link
              color="inherit"
              variant="h6"
              underline="none"
              className={ clsx(classes.rightLink, {[classes.linkSecondary] : location.pathname === '/signin'})}
              href="/signin"
            >
              {'Sign In'}
            </Link>
            <Link
              variant="h6"
              underline="none"
              className={clsx(classes.rightLink, {[classes.linkSecondary] : location.pathname === '/signup'})}
              href="/signup"
            >
              {'Sign Up'}
            </Link>
            </>
            }
          </div>
        </Toolbar>
      </AppBar>
      <div className={classes.placeholder} />
    </div>
  );
}

AppAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppAppBar);