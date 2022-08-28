import colors, { iconColors } from "~/config/themes/colors";
import { css, StyleSheet } from "aphrodite";
import { topLevelFilters } from "./constants/UnifiedDocFilters";
import { useMemo, useRef, useState } from "react";
import handleFilterSelect from "./utils/handleFilterSelect";
import { useRouter } from "next/router";
import AuthorAvatar from "../AuthorAvatar";
import icons from "~/config/themes/icons";
import { connect } from "react-redux";
import MyHubsDropdown from "../Hubs/MyHubsDropdown";
import { SelectedUrlFilters } from "./utils/getSelectedUrlFilters";
import { breakpoints } from "~/config/themes/screen";

type Args = {
  selectedFilters: SelectedUrlFilters,
  currentUser?: any,
  hubState: any,
  feedOrderingElem: React.ReactNode, 
}

const TopLevelFilters = ({ selectedFilters, currentUser, hubState, feedOrderingElem }: Args) => {
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const hubsDownRef = useRef(null);
  const isSubscribedToHubs = hubState?.subscribedHubs?.length > 0;
  const isCurrentUserLoaded = !!currentUser;
  const renderAsDropdown = false;

  const filterElems = useMemo(() => {
    return topLevelFilters.map((f) => {
      const isSelected = f.value === selectedFilters.topLevel;
      const isMyHubs = f.value === "my-hubs";
      return ( 
        <div
          className={`${css(
            styles.filter, isSelected && styles.filterSelected, renderAsDropdown && styles.filterAsDropdownOpt
          )} filterSelected`}
          onClick={() => {
            if (isSelected && isMyHubs) {
              setIsDropdownOpen(!isDropdownOpen);
            } else {
              handleFilterSelect({ router, topLevel: f.value });
            }
          }}
        >
          <span className={css(styles.filterIcon)}>
            {isMyHubs && (
              <AuthorAvatar
                author={currentUser?.author_profile || {}}
                size={20}
              />
            )}
            {f.icon}
          </span>
          <span className={css(styles.filterLabel)}>
            {f.label}
          </span>
          {isMyHubs && isSubscribedToHubs && !renderAsDropdown && (
            <span
              className={css(styles.myHubsDown)}
              onClick={(event) => {
                event.stopPropagation();
                setIsDropdownOpen(!isDropdownOpen);
              }}
              ref={hubsDownRef}
            >
              {isDropdownOpen ? icons.chevronUp : icons.chevronDown}
            </span>
          )}
          {isDropdownOpen && isMyHubs && !renderAsDropdown && <MyHubsDropdown hubState={hubState} />}
          {/* {isMyHubs && (
            isTagsMenuOpen
              ? <span className={css(styles.icon)}>{icons.chevronUp}</span>
              : isSelected
              ? <span className={css(styles.icon)}>{icons.chevronDown}</span>
              : null
          )} */}
        </div>
      )
  })}, [selectedFilters, isSubscribedToHubs, isCurrentUserLoaded, isDropdownOpen] )  

  if (renderAsDropdown) {
    const selected = topLevelFilters.find(f => f.value === selectedFilters.topLevel);
    return (
      <div className={css(styles.container)} onClick={() => {
        setIsDropdownOpen(!isDropdownOpen);
      }}>
        <div className={css(styles.filter)}>
          <div className={css(styles.filterIcon)}>{selected?.icon}</div>
          <div className={css(styles.filterLabel)}>{selected?.label}</div>
          {isDropdownOpen
            ? <div className={css(styles.chevronIcon)}>{icons.chevronUp}</div>
            : <div className={css(styles.chevronIcon)}>{icons.chevronDown}</div>
          }
        </div>
        {isDropdownOpen &&
          <div className={css(styles.dropdown)}>
            {filterElems}
          </div>
        }
        <div className={css(styles.orderingContainer)}>
          {feedOrderingElem}
        </div>
      </div>
    )
  }
  else {
    return (
      <div className={css(styles.container)}>
        {filterElems}
      </div>    
    )
  }
}

const styles = StyleSheet.create({
  dropdown: {
    position: "absolute",
    top: 30,
    left: 0,
    zIndex: 10,
    padding: "5px 12px",
    background: "white",
    boxShadow: "rgb(0 0 0 / 15%) 0px 0px 10px 0px",
  },
  orderingContainer: {

  },
  container: {
    display: "flex",
    borderBottom: `1px solid ${colors.GREY_LINE(1)}`,
    width: "100%",
    marginBottom: 15,
    position: "relative",
  },
  filterAsDropdownOpt: {
    borderBottom: 0,
    padding: "10px 14px",    
  },
  filter: {
    padding: "0px 4px 12px 0px",
    display: "flex",
    position: "relative",
    marginRight: 25,
    alignItems: "center",
    cursor: "pointer",
    userSelect: "none",
    color: colors.BLACK(0.6),
    ":hover": {
      color: colors.NEW_BLUE(),
    },
    [`@media only screen and (max-width: ${breakpoints.xsmall.str})`]: {
      fontSize: 15,
    }
  },
  chevronIcon: {
    marginLeft: 8,
  },
  filterIcon: {
    marginRight: 8,
    fontSize: 18,
    [`@media only screen and (max-width: ${breakpoints.xsmall.str})`]: {
      fontSize: 16,
    }
  },
  filterLabel: {},
  filterSelected: {
    borderBottom: `2px solid ${colors.NEW_BLUE()}`,
    color: colors.NEW_BLUE(),
  },
  myHubsDown: {
    marginLeft: 3,
    padding: "5px 5px",
    ":hover": {
      background: iconColors.BACKGROUND,
      borderRadius: 3,
      transition: "0.3s",
    },
  },
});

const mapStateToProps = (state) => ({
  currentUser: state.auth.user,
});

export default connect(mapStateToProps, null)(TopLevelFilters);