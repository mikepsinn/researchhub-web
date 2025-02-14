import { StyleSheet } from "aphrodite";
import { NAVBAR_HEIGHT } from "~/components/Navbar";
import colors from "~/config/themes/colors";
import { breakpoints } from "~/config/themes/screen";

export const styles = StyleSheet.create({
  viewAll: {
    marginLeft: "auto",
    color: colors.NEW_BLUE(0.9),
    textDecoration: "none",
    textTransform: "initial",
    fontSize: 14,
    letterSpacing: "normal",
    ":hover": {
      opacity: 0.5,
    },
  },
  RSC: {
    height: 20,
  },
  HomeRightSidebar: {
    margin: "32px 32px 0 0",
    height: "100%",
    position: "relative",
    width: "100%",
    maxWidth: 320,
    [`@media only screen and (max-width: ${breakpoints.large.str})`]: {
      display: "none",
    },
  },
  HomeRightSidebarContainer: {
    borderRadius: 4,
    color: colors.GREY_LIST_LABEL,
    padding: "0 0 16px 0",
    position: "sticky",
    top: NAVBAR_HEIGHT,
    boxShadow: "none",
  },
  RightSidebarTitle: {
    background: colors.WHITE,
    padding: "16px 20px 10px 20px",
    width: "100%",
    [`@media only screen and (max-width: ${breakpoints.xxsmall.str})`]: {
      padding: "15px 0 5px",
    },
  },
});
