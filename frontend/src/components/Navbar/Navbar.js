import React, {useState} from 'react';

//Material-ui
import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';

//FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faUserFriends } from '@fortawesome/free-solid-svg-icons';
import { faCommentAlt, faUserCircle } from '@fortawesome/free-regular-svg-icons';

//CSS
import styles from './Navbar.module.css';

//Resources
import NUSociaLifeLogo from '../../resources/NUSociaLife_Navbar_Icon.png';

function Navbar() {
    const [selection, setSelection] = useState('Match')

    const navItems = [
        {
            icon: faUserFriends,
            title: 'Find Friends'
        },
        {
            icon: faCommentAlt,
            title: 'Forum'
        },
        {
            icon: faUserCircle,
            title: 'Profile'
        },
        {
            icon: faSignOutAlt,
            title: 'Logout'
        },
    ];

    return (
        <AppBar position="static" className={styles.navColor}>
            <Container>
            <Toolbar>
                <IconButton color='inherit'>
                    <img alt='NUSociaLifeLogo' src={NUSociaLifeLogo} className={styles.logo}/>
                </IconButton> 
                <div className={styles.nav}>
                    {
                        navItems.map((item) => (
                            <IconButton key={item.title} color='inherit' className={selection === item.title ? styles.selected : null} onClick={() => setSelection(item.title)}>
                                <div className={styles.navIcon}>
                                    <FontAwesomeIcon icon={item.icon} />
                                    <h6 className={styles.titleSpacing}>{item.title}</h6>
                                </div>
                            </IconButton>
                        ))
                    }
                </div>
            </Toolbar>
            </Container>
        </AppBar>     
    )
}

export default Navbar;