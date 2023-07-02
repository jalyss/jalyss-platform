import React, { useMemo } from 'react'
import { Navbar, Container} from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom'
import { sidebarDataBranch } from '../constants/sidebarDataBranch'
import isEnglish from '../helpers/isEnglish'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import Avatar from '@mui/material/Avatar'
import { FiSettings } from 'react-icons/fi'
import { useSelector } from 'react-redux'
import MenuItem from '@mui/material/MenuItem'
import WhiteSelect from '../components/WhiteSelect'
import { useTranslation } from 'react-i18next'
import { useLanguage } from '../hooks/useLanguage'
import { Box, Stack } from '@mui/material'

function Header() {
  const { t, i18n } = useTranslation()
  const currentLanguage = useLanguage()
  const [anchorElUser, setAnchorElUser] = React.useState(null)
  const navigate = useNavigate()
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }
  const userStore = useSelector((state) => state.auth)

  const onChangeLanguage = (event) => {
    console.log('hello')
    console.log(event.target.value)
    i18n.changeLanguage(event.target.value)
    localStorage.setItem('lg', event.target.value)
  }
  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const location = useLocation()
  const isEng = isEnglish()
  const isRtl = useMemo(() => i18n?.languages[0] === 'ar', [i18n?.languages])

  const getBrandText = () => {
    const currentPath = location.pathname;
  
    for (let i = 0; i < sidebarDataBranch.length; i++) {
      const item = sidebarDataBranch[i];
  
      if (currentPath === `/${item.path}`) {
        return isEng ? item.nameEn : item.nameAr;
      }
  
      for (let j = 0; j < item.children.length; j++) {
        const child = item.children[j];
  
        if (currentPath.endsWith(`/${child.path}`)) {
          return isEng ? child.nameEn : child.nameAr;
        }
      }
    }
    return 'MasterKnowledgeAcademy'
  }

  return (
    <Box
      bgcolor="white"
      zIndex="99"
      position="fixed"
      width="calc(100% - 260px)"
      borderBottom="1px solid #d9d9d9"
      mr={isRtl && '260px'}
      ml={!isRtl && '260px'}
    >
      <Navbar>
        <Container>
          <Typography variant="h6" fontWeight="bold">
            {getBrandText()}
          </Typography>
          <Box>
            <Stack direction="row" spacing={3}>
              <WhiteSelect
                color="#48184c"
                height={30}
                width={70}
                value={currentLanguage}
                onChange={onChangeLanguage}
                data={[
                  { label: 'AR', value: 'ar' },
                  { label: 'EN', value: 'en' },
                ]}
                helper={t('Language')}
              />

              <Box
                sx={{ cursor: 'pointer' }}
                display='flex'
                justifyContent='center'
                alignItems="center"
                onClick={handleOpenUserMenu}
                px={1.5}
                py={0.75}
                boxSizing="border-box"
                bgcolor="#b911c816"
                borderRadius="30px"
              >
                <FiSettings size={22} color="#48184c" />
                <Typography fontWeight="bold" mx={2}>
                  {userStore.meAdmin[isEng ? 'fullNameEn' : 'fullNameAr']}
                </Typography>
                <Avatar
                  alt="Remy Sharp"
                  sx={{ width: 36, height: 36 }}
                  src={userStore?.meAdmin?.avatar?.path}
                />
              </Box>
            </Stack>

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
                  <Typography textAlign="center" onClick={()=>{
                    navigate("/profile")
                  }}>
                    <span className="no-icon">Profile</span>
                  </Typography>
                </MenuItem>
                <MenuItem>
                  <Typography>
                    <span
                      onClick={(e) => {
                        e.preventDefault()
                        localStorage.removeItem('tokenAdmin')
                        window.location.pathname = '/'
                      }}
                      className="no-icon"
                    >
                      Log out
                    </span>
                  </Typography>
                </MenuItem>
              </MenuItem>
            </Menu>
          </Box>
        </Container>
      </Navbar>
    </Box>
  )
}

export default Header