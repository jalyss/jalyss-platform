import React from "react";
import { Navbar, Container, Nav, Dropdown, Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";
// import { sidebarData } from "../constants/sidebarDataBranch";
import isEnglish from "../helpers/isEnglish";
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';


const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function Header() {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };


  const location = useLocation();
  const isEng = isEnglish()
  const mobileSidebarToggle = (e) => {
    e.preventDefault();
    document.documentElement.classList.toggle("nav-open");
    var node = document.createElement("div");
    node.id = "bodyClick";
    node.onclick = function () {
      this.parentElement.removeChild(this);
      document.documentElement.classList.toggle("nav-open");
    };
    document.body.appendChild(node);
  };

  const getBrandText = () => {
    //   for (let i = 0; i < sidebarData.length; i++) {
    //     if (location.pathname.indexOf('admin' + sidebarData[i].path) !== -1) {
    //       if(isEng)
    //       return sidebarData[i].nameEn;
    //       else
    //       return sidebarData[i].nameAr
    //     }
    //   }
    return "Brand";
  };
  return (
    <div className="bg-lightPurple header">
      <div className=""></div>
      <Navbar bg="bg-lightPurple" expand="lg">
        <Container >
          <div className="d-flex justify-content-center align-items-center ml-2 ml-lg-0">
            <Button
              variant="dark"
              className="d-lg-none btn-fill d-flex justify-content-center align-items-center rounded-circle p-2"
              onClick={mobileSidebarToggle}
            >
              <i className="fas fa-ellipsis-v"></i>
            </Button>
            <Navbar.Brand
              href="#home"
              onClick={(e) => e.preventDefault()}
              className="mr-2"
            >
              {getBrandText()}
            </Navbar.Brand>
          </div>
          <Navbar.Toggle aria-controls="basic-navbar-nav" className="mr-2 d-flex flex-column">
            <span className="navbar-toggler-bar burger-lines">...</span>
            <span className="navbar-toggler-bar burger-lines">...</span>
            <span className="navbar-toggler-bar burger-lines">...</span>
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="nav mr-auto" navbar>
              <Nav.Item>
                <Nav.Link
                  data-toggle="dropdown"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  className="m-0"
                >
                  <i className="nc-icon nc-palette"></i>
                  <span className="d-lg-none ml-1">Dashboard</span>
                </Nav.Link>
              </Nav.Item>
              <Dropdown as={Nav.Item}>
                <Dropdown.Toggle
                  as={Nav.Link}
                  data-toggle="dropdown"
                  id="dropdown-67443507"
                  variant="default"
                  className="m-0"
                >
                  <i className="nc-icon nc-planet"></i>
                  <span className="notification">5</span>
                  <span className="d-lg-none ml-1">Notification</span>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    Notification 1
                  </Dropdown.Item>
                  <Dropdown.Item
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    Notification 2
                  </Dropdown.Item>
                  <Dropdown.Item
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    Notification 3
                  </Dropdown.Item>
                  <Dropdown.Item
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    Notification 4
                  </Dropdown.Item>
                  <Dropdown.Item
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    Another notification
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Nav.Item>
                <Nav.Link
                  className="m-0"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                >
                  <i className="nc-icon nc-zoom-split"></i>
                  <span className="d-lg-block"> Search</span>
                </Nav.Link>
              </Nav.Item>
            </Nav>
            <Nav className="ml-auto" navbar>
              <Nav.Item>
                <Nav.Link
                  className="m-0"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                >
                  <span className="no-icon">Account</span>
                </Nav.Link>
              </Nav.Item>
              <Dropdown as={Nav.Item}>
                <Dropdown.Toggle
                  aria-expanded={false}
                  aria-haspopup={true}
                  as={Nav.Link}
                  data-toggle="dropdown"
                  id="navbarDropdownMenuLink"
                  variant="default"
                  className="m-0"
                >
                  <span className="no-icon">Dropdown</span>
                </Dropdown.Toggle>
                <Dropdown.Menu aria-labelledby="navbarDropdownMenuLink">
                  <Dropdown.Item
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    Action
                  </Dropdown.Item>
                  <Dropdown.Item
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    Another action
                  </Dropdown.Item>
                  <Dropdown.Item
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    Something
                  </Dropdown.Item>
                  <Dropdown.Item
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    Something else here
                  </Dropdown.Item>
                  <div className="divider"></div>
                  <Dropdown.Item
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    Separated link
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>


            </Nav>
          </Navbar.Collapse>
        </Container>
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="Remy Sharp" src="https://stimg.cardekho.com/images/carexteriorimages/930x620/Nissan/Nissan-GTR/744/front-left-side-47.jpg" />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >

            <MenuItem onClick={handleCloseUserMenu}>
              <MenuItem>
                <Typography textAlign="center">
                  <span className="no-icon">
                    Profile
                  </span>
                </Typography>
              </MenuItem>
              <MenuItem>
                <Typography>
                  <span onClick={(e) => {
                    e.preventDefault()
                    localStorage.removeItem('tokenAdmin')
                    window.location.pathname = '/'
                  }} className="no-icon">
                    Log out
                  </span>
                </Typography>
              </MenuItem>

            </MenuItem>
            <Typography>
              <MenuItem>
                <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                  <Badge badgeContent={4} color="error">
                    <MailIcon />
                  </Badge>
                </IconButton>
                <p>Messages</p>
              </MenuItem>
            </Typography>
            <Typography>
              <MenuItem>
                <IconButton
                  size="large"
                  aria-label="show 17 new notifications"
                  color="inherit"
                >
                  <Badge badgeContent={17} color="error">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
                <p>Notifications</p>
              </MenuItem>
            </Typography>

          </Menu >
        </Box >
      </Navbar >
    </div >
  );
}

export default Header
