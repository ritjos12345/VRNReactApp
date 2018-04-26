import React, { Component } from 'react';
import { Router, Route, withRouter } from 'react-router-dom';//BrowserRouter as 
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Master from '../master/Master.jsx';
import Detail from '../detail/Detail.jsx';
import Create from '../create/Create.jsx';
import BusyDialog from '../dialog/BusyDialog.jsx';
import MessageDialog from '../dialog/MessageDialog.jsx';
import history from '../history';
import Snackbar from 'material-ui/Snackbar';

const APIUrl = "http://" + window.location.hostname + ":5000/";//"http://192.168.43.110:5000/";

const drawerWidth = 300;

const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  selectedItem: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)'
  },
  masterAppBar: {
    position: 'relative',
    [theme.breakpoints.up('md')]: {
      width: `calc(${drawerWidth}px)`,
    },
  },
  detailAppBar: {
    position: 'absolute',
    marginLeft: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.up('md')]: {
      position: 'relative',
    },
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    height: "100%"
  },
  button: {
    margin: theme.spacing.unit,
    position: 'absolute',
    right: '10px',
    bottom: '10px'
  },
  stepperButton: {
    margin: theme.spacing.unit
  },
  searchButton: {
      position: 'absolute',
      right: '10px'
  },
  formControl: {
    margin: theme.spacing.unit,
    width: '100%'
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '100%'
  },
  group: {
      margin: `${theme.spacing.unit}px 0`,
      display: 'block'
  },
  progress: {
    margin: theme.spacing.unit * 2,
    // position: 'absolute',
    // left: "500px",
    // top: "200px",
    // textAlign: 'center',
    // zIndex: 1000,
    // opacity: 1
  },
  busyDialog: {
    backgroundColor: 'transparent',
    boxShadow: 'none'
  },
  dialog: {
    width: '80%',
    maxHeight: 435,
  },
  checkInIcon:{
    position: 'absolute',
    right: '5px',
    top: '5px',
    width: '20px',
    height: '20px',
    fontSize: '20px'
  }
});

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            mobileOpen: false,
            tabValue: 0,
            tempMasterData: [],
            masterData: [],
            detailData: [],
            selectedIndex: 0,
            searchVisible: false,
            searchText: "",
            isLoading: false,
            error: null,
            expanded: null,
            controlsVisibility : {
              vehStat 	  : { RD: true,  RB: false, HD: false,  CR: false, CA: false },
              vehNo 	    : { RD: true,  RB: true,  HD: false,  CR: true,  CA: true  },
              fleetType   : { RD: true,  RB: true,  HD: false,  CR: true,  CA: true  },
              transName   : { RD: true,  RB: true,  HD: false,  CR: true,  CA: true  },
              sealCond 	  : { RD: true,  RB: false, HD: false,  CR: false, CA: false },
              seal1 	    : { RD: true,  RB: false, HD: false,  CR: false, CA: false },
              seal2 	    : { RD: true,  RB: false, HD: false,  CR: false, CA: false },
              licNo 	    : { RD: true,  RB: true,  HD: false,  CR: true,  CA: true  },
              mobNo 	    : { RD: true,  RB: true,  HD: true,   CR: true,  CA: true  },
              personName  : { RD: true,  RB: true,  HD: true,   CR: true,  CA: true  },
              noOfBoxes   : { RD: true,  RB: false, HD: false,  CR: false, CA: false },
              lrNo 		    : { RD: true,  RB: false, HD: false,  CR: true,  CA: true },
              idProof 	  : { RD: false, RB: false, HD: true,   CR: false, CA: false },
              outVehStat 	: { RD: true,  RB: true,  HD: false,  CR: true,  CA: true },  
              outSealCond : { RD: true,  RB: false, HD: false,  CR: false, CA: false },
              outNoOfBoxes: { RD: true,  RB: true,  HD: true,   CR: true,  CA: true },
              podRemarks  : { RD: true,  RB: true,  HD: true,   CR: true,  CA: true }
            },
            outVehStatus: "",
            outNoOfBoxes: "",
            outSealCond: "",
            outPODRemarks: "",
            messageDialogOpen: false,
            messageDialogTitle: "",
            messageDialogValue: "",
            messageDialogButtons: [],
            snackBarOpen: false,
            snackBarMessage: "",            
            transportModes: [],
            transporters: [],
            proofTypes: [],
            activeStep: 0,
            modeOfTransport: "",      
            inVehStat: "",
            inVehNo: "",
            inFleetType: "",
            inFleetTypeDesc: "",
            inTransporter: "",
            inTransporterDesc: "",
            inSealCond: "",
            inSeal1: "",
            inSeal2: "",
            inNoOfBoxes: "",
            inLicNo: "",
            inMobNo: "",
            inDriverName: "",
            inProofType: "",
            inProofNo: "",
            inLRNo: "",
            inRemarks: ""
        };

        this.handleMasterData = this.handleMasterData.bind(this);
        this.handleTempMasterData = this.handleTempMasterData.bind(this);
        this.handleSearchVisible = this.handleSearchVisible.bind(this);
        this.updateSearchText = this.updateSearchText.bind(this);
        this.handleAPICall = this.handleAPICall.bind(this);
        this.loadMasterData = this.loadMasterData.bind(this);
        this.loadDetailData = this.loadDetailData.bind(this);
        this.loadTransportModes = this.loadTransportModes.bind(this);
        this.loadTransporters = this.loadTransporters.bind(this);
        this.loadProofTypes = this.loadProofTypes.bind(this);
        this.updateSelectedIndex = this.updateSelectedIndex.bind(this);
        this.handleDrawerToggle = this.handleDrawerToggle.bind(this);
        this.handleTabChange = this.handleTabChange.bind(this);
        this.updateDetailData = this.updateDetailData.bind(this);
        this.handleExpPanelChange = this.handleExpPanelChange.bind(this);
        //Departure
        this.handleOutVehStat = this.handleOutVehStat.bind(this);
        this.handleOutNoOfBoxes = this.handleOutNoOfBoxes.bind(this);
        this.handleOutSealCond = this.handleOutSealCond.bind(this);
        this.handleOutPODRemarks = this.handleOutPODRemarks.bind(this);
        //Message Dialog
        this.handleMsgDlg = this.handleMsgDlg.bind(this);
        //Snackbar
        this.toggleSnackBar = this.toggleSnackBar.bind(this);
        //Create methods
        this.handleMOTChange = this.handleMOTChange.bind(this);
        this.handleActiveStep = this.handleActiveStep.bind(this);
        this.handleStepperNext = this.handleStepperNext.bind(this);
        this.handleStepperBack = this.handleStepperBack.bind(this);

        this.handleInVehStat = this.handleInVehStat.bind(this);
        this.handleBlurInVehNo = this.handleBlurInVehNo.bind(this);        
        this.handleChangeInVehNo = this.handleChangeInVehNo.bind(this);
        this.handleInTransporter = this.handleInTransporter.bind(this);
        this.handleInSealCond = this.handleInSealCond.bind(this);
        this.handleInSeal1 = this.handleInSeal1.bind(this);
        this.handleInSeal2 = this.handleInSeal2.bind(this);
        this.handleInNoOfBoxes = this.handleInNoOfBoxes.bind(this);
        this.handleChangeInLicNo = this.handleChangeInLicNo.bind(this);
        this.handleBlurInLicNo = this.handleBlurInLicNo.bind(this);
        this.handleInMobNo = this.handleInMobNo.bind(this);
        this.handleInDriverName = this.handleInDriverName.bind(this);
        this.handleInProofType = this.handleInProofType.bind(this);
        this.handleInProofNo = this.handleInProofNo.bind(this);
        this.handleInLRNo = this.handleInLRNo.bind(this);
        this.handleInRemarks = this.handleInRemarks.bind(this);

        this.inVehNoChanged = false;
        this.inLicNoChanged = false;
    }

    render() {
        const { classes, theme } = this.props;      

        return (
          <div>
            <Router history={history}>
                <div className={classes.root}>
                  <Route 
                  exact 
                  path='' 
                  render={
                      (props) => <Master 
                                  classes={classes} 
                                  theme={theme}
                                  handleMasterData={this.handleMasterData}
                                  handleTempMasterData={this.handleTempMasterData}
                                  handleAPICall={this.handleAPICall}
                                  loadDetailData={this.loadDetailData}
                                  selectedIndex={this.state.selectedIndex}
                                  updateSelectedIndex={this.updateSelectedIndex}
                                  handleDrawerToggle={this.handleDrawerToggle} 
                                  mobileOpen={this.state.mobileOpen}
                                  tempMasterData={this.state.tempMasterData}  
                                  masterData={this.state.masterData} 
                                  updateDetailData={this.updateDetailData}
                                  handleTabChange={this.handleTabChange}
                                  handleExpPanelChange={this.handleExpPanelChange}
                                  search={this.state.search}
                                  handleSearchVisible={this.handleSearchVisible}
                                  searchText={this.state.searchText}
                                  updateSearchText={this.updateSearchText}
                                  {...props} />} />
                  <Route 
                    exact 
                    path='/detail/:id' 
                    render={
                      (props) => <Detail 
                                  classes={classes} 
                                  theme={theme}
                                  handleAPICall={this.handleAPICall}
                                  loadMasterData={this.loadMasterData}
                                  handleDrawerToggle={this.handleDrawerToggle} 
                                  tabValue={this.state.tabValue} 
                                  handleTabChange={this.handleTabChange} 
                                  tempMasterData={this.state.tempMasterData} 
                                  detailData={this.state.detailData} 
                                  updateDetailData={this.updateDetailData}
                                  expanded={this.state.expanded} 
                                  handleExpPanelChange={this.handleExpPanelChange} 
                                  controlsVisibility={this.state.controlsVisibility} 
                                  outVehStatus={this.state.outVehStatus}
                                  handleOutVehStat={this.handleOutVehStat}
                                  outNoOfBoxes={this.state.outNoOfBoxes}                                  
                                  handleOutNoOfBoxes={this.handleOutNoOfBoxes}
                                  outSealCond={this.state.outSealCond}
                                  handleOutSealCond={this.handleOutSealCond}
                                  outPODRemarks={this.state.outPODRemarks}
                                  handleOutPODRemarks={this.handleOutPODRemarks}
                                  handleMsgDlg={this.handleMsgDlg}
                                  toggleSnackBar={this.toggleSnackBar}
                                  {...props} 
                                  />} 
                  />
                  <Route
                    exact
                    path='/create'
                    render={
                      props => <Create
                                classes={classes}
                                theme={theme}
                                controlsVisibility={this.state.controlsVisibility}
                                handleAPICall={this.handleAPICall}
                                loadMasterData={this.loadMasterData}
                                handleDrawerToggle={this.handleDrawerToggle}
                                handleMsgDlg={this.handleMsgDlg}
                                toggleSnackBar={this.toggleSnackBar}
                                modeOfTransport={this.state.modeOfTransport}
                                transportModes={this.state.transportModes}
                                transporters={this.state.transporters}
                                proofTypes={this.state.proofTypes}
                                loadTransportModes={this.loadTransportModes}                                
                                handleMOTChange={this.handleMOTChange}
                                activeStep={this.state.activeStep}
                                handleActiveStep={this.handleActiveStep}
                                handleStepperNext={this.handleStepperNext}
                                handleStepperBack={this.handleStepperBack}
                                inVehStat={this.state.inVehStat}                                
                                inVehNo={this.state.inVehNo}                                
                                inFleetType={this.state.inFleetType}
                                inFleetTypeDesc={this.state.inFleetTypeDesc}
                                inTransporter={this.state.inTransporter}
                                inTransporterDesc={this.state.inTransporterDesc}
                                inSealCond={this.state.inSealCond}
                                inSeal1={this.state.inSeal1}
                                inSeal2={this.state.inSeal2}
                                inNoOfBoxes={this.state.inNoOfBoxes}
                                inLicNo={this.state.inLicNo}
                                inMobNo={this.state.inMobNo}
                                inDriverName={this.state.inDriverName}
                                inProofType={this.state.inProofType}
                                inProofNo={this.state.inProofNo}
                                inLRNo={this.state.inLRNo}
                                inRemarks={this.state.inRemarks}
                                handleInVehStat={this.handleInVehStat}
                                handleChangeInVehNo={this.handleChangeInVehNo}
                                handleBlurInVehNo={this.handleBlurInVehNo}
                                handleInTransporter={this.handleInTransporter}
                                handleInSealCond={this.handleInSealCond}
                                handleInSeal1={this.handleInSeal1}
                                handleInSeal2={this.handleInSeal2}
                                handleInNoOfBoxes={this.handleInNoOfBoxes}
                                handleChangeInLicNo={this.handleChangeInLicNo}
                                handleBlurInLicNo={this.handleBlurInLicNo}
                                handleInMobNo={this.handleInMobNo}
                                handleInDriverName={this.handleInDriverName}
                                handleInProofType={this.handleInProofType}
                                handleInProofNo={this.handleInProofNo}
                                handleInLRNo={this.handleInLRNo}
                                handleInRemarks={this.handleInRemarks}
                                {...props}
                                />} 
                  />
                </div>
            </Router>
            <BusyDialog classes={classes} isLoading={this.state.isLoading} />
            <MessageDialog
              classes={{
                  paper: classes.dialog
              }}
              handleMsgDlg={this.handleMsgDlg}              
              open={this.state.messageDialogOpen}
              title={this.state.messageDialogTitle}
              value={this.state.messageDialogValue}
              btns={this.state.messageDialogButtons}
              loadMasterData={this.loadMasterData}
            />
            <Snackbar
              anchorOrigin={{
                  vertical: 'bottom', 
                  horizontal: 'center'
              }}
              open={this.state.snackBarOpen}
              onClose={() => this.toggleSnackBar()}
              //autoHideDuration={3000}
              SnackbarContentProps={{
                  'aria-describedby': 'message-id'
              }}
              message={<span id="message-id">{this.state.snackBarMessage}</span>}
            />
          </div>
        );        
    }

    componentDidMount() {
      this.loadMasterData();
    }

    handleMasterData(data) {
      this.setState({masterData: data});
    }

    handleTempMasterData(data) {
      this.setState({tempMasterData: data});
    }

    updateSelectedIndex(index) {
      this.setState({selectedIndex: index});
    }

    handleSearchVisible(visible) {
      this.setState({search: visible});
    }

    updateSearchText(value) {
      this.setState({searchText: value});
    }

    handleAPICall(path, method, callBack, data){
      var payload = JSON.stringify(data);
      this.setState({isLoading: true});
      fetch(APIUrl + path, {
            method: method,
            headers: {
                'Accept':'application/json',
                'Content-Type': 'application/json'
            },
            body: payload
        })
        .then(response => {
          if(response.ok) {
            return response.json(); 
          }
          else{
            throw new Error("Something went wrong ...");
          }
        })
        .then(data => {
          this.setState({isLoading: false});
          if(Array.isArray(data)){
            callBack(data);
          }
          else if(typeof data === "object" && data.message !== undefined){
            var btns = [{
                text: "Ok",
                event: () => {
                  if(data.msgCode === "S"){
                    callBack();
                  }
                  this.handleMsgDlg()                 
                }
            }];
            this.handleMsgDlg(this.getTitle(data.msgCode), data.message, btns);
          }          
        })
        .catch(error => {
          this.setState({error, isLoading: false});
          var btns = [{
            text: 'Ok',
            event: () => this.handleMsgDlg()
          }]
          this.handleMsgDlg("Error", error.message, btns);
        })
    }

    loadMasterData(){
      let that = this;
      history.push("");
      var fnResponse = function(data){
        if(Array.isArray(data) && data.length > 0){
          var sortedData = data.sort(function(a, b){
            return b.VRN - a.VRN;
          });
          that.setState({masterData: sortedData, tempMasterData: sortedData});
          that.loadDetailData(sortedData[0]);
        }        
      }
      let path = "VRNMaster";
      this.handleAPICall(path, "GET", fnResponse);
    }

    loadDetailData(vrn){
      var that = this;
      history.push("/detail/" + vrn.VRN);//for Routing to detail
      this.handleTabChange(null,0);//for initially setting Arrival tab visible
      var fnExpPanelChange = this.handleExpPanelChange((vrn.MODEOFTRANSPORT !== 'HD') ? 'panel1' : 'panel2');//for initially setting Vehicle panel visible
      fnExpPanelChange(null, true);//calling the returned function
      var fnDetailResponse = function(data){
          if(Array.isArray(data) && data.length > 0){
            that.updateDetailData(data);
          }          
      }
      let path = "VRNDetail/";
      this.handleAPICall(path + vrn.VRN, "GET", fnDetailResponse);
    }

    loadTransportModes() {
      let that = this;
      var callBack = function(data){
          if(Array.isArray(data) && data.length > 0){
            that.setState({
              transportModes: data,
              modeOfTransport: "RD",
              inVehStat: "L",
              inVehNo: "",
              inFleetType: "",
              inFleetTypeDesc: "",
              inTransporter: "",
              inTransporterDesc: "",
              inSealCond: "I",
              inSeal1: "",
              inSeal2: "",
              inNoOfBoxes: "",
              inLicNo: "",
              inMobNo: "",
              inDriverName: "",
              inProofType: "",
              inProofNo: "",
              inLRNo: "",
              inRemarks: ""
            });
            that.loadTransporters();
            that.loadProofTypes();
          }          
      }
      let path = "VRNParam/TrnsprtMode";
      this.handleAPICall(path, "GET", callBack);
    }

    loadTransporters() {
      let that = this;
      var transName = "TEST";
      var callBack = function(data){
          if(Array.isArray(data) && data.length > 0){
              that.setState({ transporters: data });
          }
      }
      let path = "VRNTransporters/";
      this.handleAPICall(path + transName, "GET", callBack);
    }

    loadProofTypes() {
      let that = this;
      var callBack = function(data){
          if(Array.isArray(data) && data.length > 0){
              that.setState({ proofTypes: data });
          }
      }
      let path = "VRNParam/IDProffList";
      this.handleAPICall(path, "GET", callBack);
    }

    handleDrawerToggle() {
        this.setState({ mobileOpen: !this.state.mobileOpen });
    };

    handleTabChange(event, value) {
        this.setState({ tabValue: value });
    }

    updateDetailData(data) {
        this.setState({
          detailData: data, 
          outVehStatus: "",
          outNoOfBoxes: "",
          outSealCond: "",
          outPODRemarks: ""
        });
    }

    handleExpPanelChange(panel){
      var that = this;
        return function(event, expanded) {
          that.setState({ expanded : expanded ?  panel : false });
      }
    }

    handleOutVehStat(event, value) {
      this.setState({
        outVehStatus: value        
      });
      if(value === "E") {
        this.setState({
          outNoOfBoxes: "",
          outSealCond: ""
        });
      }
    }

    handleOutNoOfBoxes(event) {
      var val = event.target.value;
      if(val.length <= 6){
        if(/^[0-9]+$/.test(val)){
          this.setState({ outNoOfBoxes: val});
        }
        else{
          this.setState({ outNoOfBoxes: ""});
        }
      }
    }

    handleOutSealCond(event, value) {
      this.setState({ outSealCond: value});
    }

    handleOutPODRemarks(event) {
      this.setState({ outPODRemarks: event.target.value });
    }

    handleMsgDlg(title, value, btns) {
      const { messageDialogOpen } = this.state;
      this.setState({
        messageDialogOpen: !messageDialogOpen,
        messageDialogTitle: title ? title : "",
        messageDialogValue: value ? value : "",
        messageDialogButtons: btns ? btns : []
      });
    }    

    toggleSnackBar(msg){
      const { snackBarOpen } = this.state;
      this.setState({
        snackBarOpen: !snackBarOpen,
        snackBarMessage: (msg ? msg : "")
      });
    }    

    handleMOTChange(event){
      var val = event.target.value;
      this.setState({
        modeOfTransport: val, 
        inVehStat: (val === "RD") ? "L": "",
        inSealCond: (val === "RD") ? "I": "",
      });
    }

    handleActiveStep(step) {
      this.setState({activeStep: step});
    }

    handleStepperNext() {
      const { activeStep } = this.state;
      this.setState({activeStep: activeStep + 1});
    }

    handleStepperBack() {
      const { activeStep } = this.state;
      this.setState({activeStep: activeStep - 1});
    }

    handleInVehStat(event, value) {
      this.setState({inVehStat: value});
    }

    handleChangeInVehNo(event) {
      var val = event.target.value;
      if(val.length <= 10){
        this.setState({inVehNo: val});
        this.inVehNoChanged = true;
      }
    }

    handleBlurInVehNo(event){
      const { inVehNo, modeOfTransport } = this.state;
      if(inVehNo !== ""){
        if(/^[A-Z]{2}[0-9]{1,3}(?:[A-Z])?(?:[A-Z]*)?[0-9]{1,4}$/.test(inVehNo)){
          let that = this;
          var fnResponse = function(data){
            if(Array.isArray(data)){
              if(data.length > 0){
                that.setState({
                  inFleetType: data[0].FleetType,
                  inFleetTypeDesc: data[0].FleetTypeDesc,
                  inTransporter: data[0].Vendor,
                  inTransporterDesc: data[0].VendorName
                });
              }
              else{
                var fleetType = "", fleetTypeDesc = "";
                switch(modeOfTransport){
                  case "RD": fleetType = "M";
                             fleetTypeDesc = "Market Vehicle";
                             break;
                  case "CA":
                  case "CR": fleetType = "V";
                             fleetTypeDesc = "Vendor Vehicle";
                             break;
                  case "RB": fleetType = "B";
                             fleetTypeDesc = "Biker";
                             break;
                  default: fleetType = "";
                           fleetTypeDesc = "";
                }
                that.setState({
                  inFleetType: fleetType,
                  inFleetTypeDesc: fleetTypeDesc,
                  inTransporter: "",
                  inTransporterDesc: ""
                });
              }
            }
            else{
              that.setState({
                inVehNo: "",
                inFleetType: "",
                inFleetTypeDesc: "",
                inTransporter: "",
                inTransporterDesc: ""
              });
            }
          }
          let path = "VRNVehicle/";
          if(this.inVehNoChanged){
            this.handleAPICall(path + inVehNo, "GET", fnResponse);
            this.inVehNoChanged = false;
          }
        }
        else{
          this.setState({inVehNo: ""});
          this.toggleSnackBar("Invalid vehicle number");
        }
      }      
    }

    handleInTransporter(event) {
      var val = event.target.value;
      const { transporters } = this.state;
      var trans = transporters.filter((e) => e.Vendor === val);
      this.setState({
        inTransporter: trans[0].Vendor,
        inTransporterDesc: trans[0].VendorName
      });      
    }

    handleInSealCond(event, value) {
      this.setState({inSealCond: value});
    }

    handleInSeal1(event) {
      this.setState({inSeal1: event.target.value});
    }

    handleInSeal2(event) {
      this.setState({inSeal2: event.target.value});
    }

    handleInNoOfBoxes(event) {
      var val = event.target.value;
      if(val.length <= 6){
        if(/^[0-9]+$/.test(val)){
          this.setState({ inNoOfBoxes: val});
        }
        else{
          this.setState({ inNoOfBoxes: ""});
        }
      }      
    }

    handleChangeInLicNo(event) {
      this.setState({inLicNo: event.target.value});
    }

    handleBlurInLicNo(event) {
      const { inLicNo } = this.state;
      if(inLicNo !== ""){
        let that = this;
        var fnResponse = function(data){
          if(Array.isArray(data)){
            if(data.length > 0){
              that.setState({
                inMobNo: data[0].Telephone,
                inDriverName: data[0].Lastname
              });
            }
          }
          else{
            that.setState({
              inMobNo: "",
              inDriverName: ""
            });
          }
        }
        let path = "License/";
        if(this.inLicNoChanged){
          this.handleAPICall(path + inLicNo, "GET", fnResponse);
          this.inLicNoChanged = false;
        }        
      }
    }

    handleInMobNo(event) {
      this.setState({inMobNo: event.target.value});
    }

    handleInDriverName(event) {
      this.setState({inDriverName: event.target.value});
    }

    handleInProofType(event) {
      var val = event.target.value;
      const { proofTypes } = this.state;
      var proof = proofTypes.filter((e) => e.modeNum === val);
      this.setState({
        inProofType: proof[0].modeNum,
        inProofTypeDesc: proof[0].modeTxt
      });
    }

    handleInProofNo(event) {
      this.setState({inProofNo: event.target.value});
    }

    handleInLRNo(event) {
      this.setState({inLRNo: event.target.value});
    }

    handleInRemarks(event) {
      this.setState({inRemarks: event.target.value});
    }

    getTitle(code){
      switch(code) {
        case "S": return "Success";
        case "E": return "Error";
        default: return "Warning";
      }
    }
}

App.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};
  
export default (withStyles(styles, { withTheme: true }))(App);