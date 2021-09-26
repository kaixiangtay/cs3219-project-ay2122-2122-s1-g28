//Settings
import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

//Material-ui
import { 
    AppBar, 
    IconButton, 
    Toolbar 
} from '@material-ui/core';

//FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faUserFriends } from '@fortawesome/free-solid-svg-icons';
import { faCommentAlt, faUserCircle } from '@fortawesome/free-regular-svg-icons';

//CSS
import styles from './Navbar.module.css';

//Resources
import NUSociaLifeLogo from '../../resources/NUSociaLife_Navbar_Icon.png';

//Actions
import { logoutUser } from '../../actions';

function Navbar(props) {
    const { handleLogoutRequest } = props; 
    const [selection, setSelection] = useState('Find Friends')
    const navItems = [
        {
            icon: faUserFriends,
            title: 'Find Friends',
            // path: '/findfriends'
        },
        {
            icon: faCommentAlt,
            title: 'Forum',
            // path:'/forum'
        },
        {
            icon: faUserCircle,
            title: 'Profile',
            // path: '/profile'
        },
        {
            icon: faSignOutAlt,
            title: 'Logout'
        },
    ];

    // Handle logout request
    useEffect(() => { 
        if (selection === 'Logout') { 
            handleLogoutRequest(); 
        }
    }); 

    return (
        <AppBar position="static" className={styles.navColor}>
            <Toolbar>
                <IconButton color='inherit'>
                    <img alt='NUSociaLifeLogo' src={NUSociaLifeLogo} className={styles.logo}/>
                </IconButton> 
                <div className={styles.nav}>
                    {
                        navItems.map((item) => (
                            <IconButton 
                                key={item.title} 
                                color='inherit' 
                                className={selection === item.title 
                                    ? styles.selected 
                                    : null
                                }
                                onClick={() => setSelection(item.title)}>
                                <div className={styles.navIcon}>
                                    <FontAwesomeIcon icon={item.icon} />
                                    <h6 className={styles.titleSpacing}>
                                        {item.title}
                                    </h6>
                                </div>
                            </IconButton>
                        ))
                    }
                </div>
            </Toolbar>
        </AppBar>     
    )
}

function mapStateToProps() { 
 return {};
}

function mapDispatchToProps(dispatch, props) { 
    return {
        handleLogoutRequest: () => dispatch(logoutUser(props))
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default withRouter(withConnect(Navbar));
