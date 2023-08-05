import React from "react";
import WhatsAppWidget from "react-whatsapp-chat-widget";
import "react-whatsapp-chat-widget/index.css";

import { MDBFooter, MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";
import { useTranslation } from "react-i18next";

import { RiCustomerService2Line } from "react-icons/ri";
import { MdPayment } from "react-icons/md";
import { CiDiscount1 } from "react-icons/ci";
import { TbDiscount2 } from "react-icons/tb";
import { BsTruck } from "react-icons/bs";
import {
  TextField,
  Typography,
  List,
  ListItem,
  Link,
  Button,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";

import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
function Footer() {
  const { t } = useTranslation();
  const mapLink =
    "https://www.google.com/maps/place/Jalyss+coworking+space/@34.7376857,10.734417,14.35z/data=!4m6!3m5!1s0x13002d4f164be823:0x8421ad05b2c858fa!8m2!3d34.7370995!4d10.7518306!16s%2Fg%2F11fpjwlqjm?entry=ttu";

  return (
    <MDBFooter className="bg-darkPurple pt-3">
      <WhatsAppWidget
        phoneNo="+216 56 525 519"
        position="right"
        widgetWidth="300px"
        widgetWidthMobile="260px"
        autoOpen={false}
        autoOpenTimer={5000}
        messageBox={true}
        messageBoxTxt="Hi Jalyss Team, is there any related service available ?"
        iconSize="40"
        iconColor="white"
        iconBgColor="#25D366"
        headerIcon="https://www.pdapps.net.in/_next/static/media/android-chrome-192x192.9a39c2c7.png"
        headerIconColor="pink"
        headerTxtColor="black"
        headerBgColor="#25D366"
        headerTitle="Jalyss Support"
        headerCaption="Online"
        bodyBgColor="#ECE5DD"
        chatPersonName="Jalyss Support"
        chatMessage={
          <>
            Hi there 👋 <br />
            <br /> How can I help you?
          </>
        }
        footerBgColor="#aaaaaa"
        placeholder="Type a message.."
        btnBgColor="#25D366"
        btnTxt="Start Chat"
        btnTxtColor="black"
      />
      <MDBContainer>
        <MDBRow className="text-center mb-5 justify-content-center">
          <MDBCol>
            <RiCustomerService2Line size="50px" fill="white" className="mb-2" />
            <Typography className="text-color-grey">{t("footer.support")}</Typography>
          </MDBCol>
          <MDBCol>
            <MdPayment size="50px" fill="white" className="mb-2" />
            <Typography className="text-color-grey">{t("footer.secure")}</Typography>
          </MDBCol>
          <MDBCol>
            <CiDiscount1 size="50px" color="white" />
            <Typography className="text-color-grey">{t("footer.shipping")}</Typography>
          </MDBCol>
        </MDBRow>

        <MDBRow className="mt-3 mb-4 text-center ">
          <MDBCol>
            <Typography variant="h5" className="mb-4 text-color-white  fw-bold ">
              {t("storeInfo.infoStore")}
            </Typography>
            <List className="p-0 text-color-grey text-center " id="footer_account_list" style={{marginLeft:50}}>
              <ListItem className="mb-2">
                <Button
                  component="a"
                  href={mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-decoration-none text-color-white m-0"
                  startIcon={<LocationOnIcon />}
                >
                  {t("storeInfo.adress")}
                </Button>
              </ListItem>
              <ListItem className="mb-2">
                <Button
                  component="a"
                  href="tel:+21651165003"
                  className="text-decoration-none text-color-white m-0"
                  startIcon={<PhoneIcon />}
                >
                  {t("ourcompany.callUs")}
                </Button>
              </ListItem>
              <ListItem className="mb-2">
                <Button
                  component="a"
                  href="mailto:jalysscom.book@gmail.com"
                  className="text-decoration-none text-color-white m-0"
                  startIcon={<EmailIcon />}
                >
                  jalysscom.book@gmail.com
                </Button>
              </ListItem>
            </List>
          </MDBCol>
          <MDBCol>
          <Typography variant="h5" className="mb-4 text-color-white  fw-bold">
              {t("joinMailingList")}
            </Typography>
            <List className="p-0 text-color-grey" id="footer_account_list" style={{marginLeft:50}}>
              <ListItem className="mb-2">
                <Typography className="text-decoration-none text-color-grey">
                  {t("Would you like to join our mailing list ?")}
                </Typography>
              </ListItem>
              <ListItem>
                <Typography className="text-decoration-none text-color-grey">
                  {t("Please enter your email address here :")}
                </Typography>
              </ListItem>

              <ListItem>
                <TextField
                  fullWidth
                  variant="outlined"
                  label={t("Your email adress")}
                  inputProps={{
                    style: {
                      color: "white",
                    },
                  }}
                  style={{ borderColor: "white" }}
                  InputLabelProps={{
                    style: {
                      color: "grey",
                    },
                  }}
                  sx={{
                    color: "white",
                    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                      {
                        borderColor: "white",
                      },
                  }}
                />
              </ListItem>
            </List>
          </MDBCol>
          <MDBCol>
          <Typography variant="h5" className="mb-4 text-color-white  fw-bold">
              Keep in touch on
            </Typography>
            <List
              className="p-0 text-color-grey  "
              id="footer_account_list"
              style={{marginLeft:110}}
            >
              <ListItem>
                <Link
                  href="https://www.instagram.com/jalysscom/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-reset"
                >
                  <ListItemIcon style={{ color: "white" }}>
                    <InstagramIcon fontSize="large" />
                  </ListItemIcon>
                </Link>
                <Link
                  href="https://www.instagram.com/jalysscom/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-reset text-decoration-none"
                >
                  <ListItemText primary="Instagram" />
                </Link>
              </ListItem>
              <ListItem>
                <Link
                  href="https://www.linkedin.com/company/jalysscom/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-reset "
                >
                  <ListItemIcon style={{ color: "white" }}>
                    <LinkedInIcon fontSize="large" />
                  </ListItemIcon>
                </Link>
                <Link
                  href="https://www.linkedin.com/company/jalysscom/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-reset text-decoration-none"
                >
                  <ListItemText primary="LinkedIn" />
                </Link>
              </ListItem>
              <ListItem>
                <Link
                  href="https://www.facebook.com/Jalysscom"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-reset"
                >
                  <ListItemIcon style={{ color: "white" }}>
                    <FacebookIcon fontSize="large" />
                  </ListItemIcon>
                </Link>
                <Link
                  href="https://www.facebook.com/Jalysscom"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-reset text-decoration-none"
                >
                  <ListItemText primary="Facebook" />
                </Link>
              </ListItem>
            </List>
          </MDBCol>
        </MDBRow>

        <MDBRow className="text-center p-4 text-color-white">
          <MDBCol className="text-reset fw-bold" href="https://jalyss.com/">
            © 2023 Copyright: JALYSS.COM
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </MDBFooter>
  );
}

export default Footer;
