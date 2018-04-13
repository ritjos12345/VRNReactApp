import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Hidden from 'material-ui/Hidden';
import LocalShippingIcon from 'material-ui-icons/LocalShipping';
import FlightIcon from 'material-ui-icons/Flight';
import LocalTaxiIcon from 'material-ui-icons/LocalTaxi';
import DirectionsWalkIcon from 'material-ui-icons/DirectionsWalk';
import DirectionsBikeIcon from 'material-ui-icons/DirectionsBike';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import SearchIcon from 'material-ui-icons/Search';
import { Link } from 'react-router-dom';

class Master extends Component {
    constructor(props) {
        super(props);
        console.log(this.props);
    }

    render() {
        const { classes, theme } = this.props;

        const drawer = (
            <div>
                <AppBar className={classes.masterAppBar}>
                <Toolbar>                    
                    <Typography variant="title" color="inherit" noWrap>
                        VRN List
                    </Typography>
                    <SearchIcon className={classes.search}/>
                </Toolbar>
                </AppBar>
                <List component="nav">
                    {
                        this.props.masterData.map((vrn, i) =>
                        <div key={i}>
                            {/* <Link to={'/detail/' + vrn.VRN}> */}
                            <ListItem button>
                            <ListItemIcon>
                                { vrn.MODEOFTRANSPORT === "CA" ? <FlightIcon /> : 
                                (vrn.MODEOFTRANSPORT === "CR" ? <LocalTaxiIcon /> : 
                                (vrn.MODEOFTRANSPORT === "HD" ? <DirectionsWalkIcon /> :
                                (vrn.MODEOFTRANSPORT === "RB" ? <DirectionsBikeIcon /> :
                                (vrn.MODEOFTRANSPORT === "RD" ? <LocalShippingIcon /> : <WarningIcon />)))) }
                            </ListItemIcon>
                            <ListItemText primary={"VRN No.: " + vrn.VRN} secondary={(vrn.MODEOFTRANSPORT === "HD") ? ("Driver Name: " + vrn.DRIVERNAME) : ("Vehicle No.: " + vrn.VEHICLENUM)} />
                            </ListItem>
                            <Divider />
                            {/* </Link> */}
                        </div>
                        )
                    }                    
                </List>
                {/* <Link to={'/create'}> */}
                    <Button variant="fab" color="primary" aria-label="add" className={classes.button}>
                        <AddIcon />
                    </Button>
                {/* </Link> */}
            </div>
          );

        return (
            <div>
                <Hidden mdUp>
                    <Drawer
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={this.props.mobileOpen}
                        onClose={this.props.handleDrawerToggle}
                        classes={{
                        paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden smDown implementation="css">
                    <Drawer
                        variant="permanent"
                        open
                        classes={{
                        paper: classes.drawerPaper,
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </div>
        );        
    }
}

export default Master;