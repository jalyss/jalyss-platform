import * as React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import  Assesment  from '../training/Assesment';
import Coachs from '../training/Coachs';
import Tarifs from '../training/Tarifs'
import Typography from '@mui/material/Typography';
import  tabsClasses  from '@mui/material/Tabs';
import { red } from '@mui/material/colors';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Courses from './Courses';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

function Tarining() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <Box sx={{ bgcolor: 'background.paper', width: 1105,marginTop:'-20px', backgroundColor:'white' ,maxWidth:1105}}>
    <AppBar position="static" sx={{backgroundColor:'white',color:'violet'}}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="secondary"
        textColor="inherit"
        variant="fullWidth"
        aria-label="full width tabs example"
      >
        <Tab label="courses" {...a11yProps(0)} />
        <Tab label="coches" {...a11yProps(1)} />
        <Tab label="tarifs" {...a11yProps(2)} />
        <Tab label="ASSESMENT" {...a11yProps(3)} />
       
      </Tabs>
    </AppBar>
    <SwipeableViews
      axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
      index={value}
      onChangeIndex={handleChangeIndex}
    >
      <TabPanel value={value} index={0} dir={theme.direction}>
                   <Courses/> 
      </TabPanel>
      <TabPanel value={value} index={1} dir={theme.direction}>
                  <Coachs/>
      </TabPanel>
      <TabPanel value={value} index={2} dir={theme.direction}>
                  <Tarifs/>
      </TabPanel>
      
      <TabPanel value={value} index={3} dir={theme.direction}>
                     < Assesment />
      </TabPanel>
     
    </SwipeableViews>
  </Box>
  );
}
export default Tarining;