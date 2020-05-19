import React, { useEffect, useState, useRef } from 'react';
import PatientTrackingStyle, {
  StyledFilterBox,
  TableRowStyle,
  StyledTitle,
} from './Style';
import StatusFilterBox from 'Assets/Elements/StatusFilterBox';
import CustomizedTable from 'Assets/Elements/CustomizedTable';
import { connect } from 'react-redux';
import Header from 'Assets/Elements/Header';
import { useTranslation } from 'react-i18next';
import { getMenu } from 'Utils/Services/API';
import FilterBox from './FilterBox';
import Title from 'Assets/Elements/Title';
import isAllowed from 'Utils/Helpers/isAllowed';
import { getStaticTabsArray } from 'Utils/Helpers/patientTrackingTabs/staticTabsArray';
import CustomizedPopup from 'Assets/Elements/CustomizedPopup';

const PatientTracking = ({ vertical, history, selectFilter }) => {
  const { t } = useTranslation();
  // Set the popUp
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);

  //The tabs of the Status filter box component.
  const [tabs, setTabs] = useState([]);

  //table is an array of 2 arrays inside. First array represents the table headers, the second array represents the table data combined them together so it won't be making double rendering.
  const [[tableHeaders, tableData], setTable] = useState([[], []]);

  //The headers menu items
  const [menuItems, setMenuItems] = useState([]);

  const prevFilterBoxValue = useRef(0);

  useEffect(() => {
    //Create an array of permitted tabs according to the user role.
    if (tabs.length === 0) {
      let tabs = getStaticTabsArray();
      for (let tabIndex = 0; tabIndex < tabs.length; tabIndex++) {
        const tab = tabs[tabIndex];
        const mode = isAllowed(tab.id);
        tab.mode = mode;
      }
      const MAX_TABS = tabs.length;
      tabs = tabs.filter((tab) => tab.mode !== 'hide');
      if (MAX_TABS !== tabs.length) {
        tabs.forEach((tab, tabIndex) => {
          tab.tabValue = tabIndex;
        });
      }
      setTabs(tabs);
    }

    //Filter box mechanism for activeTabs
    for (let tabIndex = 0; tabIndex < tabs.length; tabIndex++) {
      const tab = tabs[tabIndex];
      if (tab.tabValue === selectFilter.statusFilterBoxValue) {
        tab.activeAction(
          setTable,
          setTabs,
          history,
          selectFilter,
          setIsPopUpOpen,
        );
      } else {
        //TODO make this call in a different useEffect because when statusFiltterBoxValue changes
        // there is no need to call `tab.activeAction` only call `tab.notActiveAction`
        if (selectFilter.statusFilterBoxValue === prevFilterBoxValue.current) {
          tab.notActiveAction(setTabs, selectFilter);
        }
      }
    }
    prevFilterBoxValue.current = selectFilter.statusFilterBoxValue;
  }, [
    selectFilter.filter_date,
    selectFilter.statusFilterBoxValue,
    selectFilter.filter_service_type,
    selectFilter.filter_organization,
  ]);
  //Gets the menu items
  useEffect(() => {
    (async () => {
      try {
        const menuData = await getMenu(`${vertical}-client`);
        const menuDataClone = menuData.data.map((menuDataItem) => {
          menuDataItem.label = t(menuDataItem.label);
          return menuDataItem;
        });
        setMenuItems(menuDataClone);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const onClosePopUpHandler = () => {
    setIsPopUpOpen(false);
  };
  return (
    <React.Fragment>
      <CustomizedPopup
        isOpen={isPopUpOpen}
        onClose={onClosePopUpHandler}
        title={t('System notification')}>
        {t(
          'The patient admission process has been started by another user and is yet to be finished',
        )}
      </CustomizedPopup>
      <Header Items={menuItems} />
      <PatientTrackingStyle>
        <StyledTitle>
          <Title
            fontSize={'28px'}
            color={'#002398'}
            label={'Patient tracking'}
          />
        </StyledTitle>
        <StyledFilterBox>
          <FilterBox />
        </StyledFilterBox>
        <TableRowStyle>
          <StatusFilterBox tabs={tabs} />
          <CustomizedTable tableHeaders={tableHeaders} tableData={tableData} />
        </TableRowStyle>
      </PatientTrackingStyle>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    // fhirDataStatus: state.fhirData.STATUS,
    // appointments: state.fhirData.appointments,
    // patients: state.fhirData.patients,
    vertical: state.settings.clinikal_vertical,
    // userRole: state.settings.user_role,
    selectFilter: state.filters,
  };
};

export default connect(mapStateToProps, null)(PatientTracking);
