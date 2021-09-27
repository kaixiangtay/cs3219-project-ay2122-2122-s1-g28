// Import Settings
import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

// Import Material-ui
import { 
    AppBar, 
    IconButton, 
    Toolbar 
} from '@material-ui/core';

// Import FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faUserFriends } from '@fortawesome/free-solid-svg-icons';
import { faCommentAlt, faUserCircle } from '@fortawesome/free-regular-svg-icons';

// Import CSS
import styles from './Navbar.module.css';

// Import Resources
import NUSociaLifeLogo from '../../resources/NUSociaLife_Navbar_Icon.png';

// Import Actions
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
    const handleSelection = (title) => { 
        setSelection(title);

        if (title === 'Logout') { 
            handleLogoutRequest(); 
        } else if (title === 'Forum') { 
            // props.history.push('/forum');
        } else if (title === 'Profile') { 
            props.history.push('/profile');
        } else if (title === 'Find Friends') {
            props.history.push('/findfriends');
        } else {
            return; 
        }
    }; 

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
                                onClick={() => handleSelection(item.title)}
                            >
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
