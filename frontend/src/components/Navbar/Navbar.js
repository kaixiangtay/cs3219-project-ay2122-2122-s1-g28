// Import Settings
import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";

// Import Redux
import { handleNavigation } from '../../actions/navigation';
import { useSelector, useDispatch } from 'react-redux';

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

// Import constants
import { 
    FINDFRIENDS, 
    FORUM, 
    PROFILE,
    LOGOUT
} from '../../constants/ReduxConstants.js';

// Import Resources
import NUSociaLifeLogo from '../../resources/NUSociaLife_Navbar_Icon.png';

// Import Actions
// import { logoutUser } from '../../actions';

function Navbar() {
    const history = useHistory();
    const navigation = useSelector(state => state.navigation);
    const dispatch = useDispatch();

    const handleSelection = (location) => { 
        dispatch(handleNavigation(location));
    };

    const navItems = [
        {
            icon: faUserFriends,
            title: 'Find Friends',
            location: FINDFRIENDS
        },
        {
            icon: faCommentAlt,
            title: 'Forum',
            location: FORUM
        },
        {
            icon: faUserCircle,
            title: 'Profile',
            location: PROFILE
        },
        {
            icon: faSignOutAlt,
            title: 'Logout',
            location: LOGOUT
        },
    ];

    useEffect(() => {
        switch(navigation.selection) {
            case FINDFRIENDS:
                history.push('/findfriends');
                break;
            case FORUM:
                history.push('/forum');
                break;
            case PROFILE:
                history.push('/profile');
                break;
            case LOGOUT:
                history.push('/login');
                break;
            default:
                history.push('/findfriends');
        }
    }, [history, navigation])

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
                                className={navigation.selection === item.location 
                                    ? styles.selected 
                                    : null
                                }
                                onClick={() => handleSelection(item.location)}
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

export default Navbar;