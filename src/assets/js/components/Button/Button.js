var React = require('react');
var ActionCreators = require('../../actions/CommonActions');
var appConstants = require('../../constants/appConstants');
var mainstore = require('../../stores/mainstore');

var Button1 = React.createClass({
            _checklistClass: '',
            performAction: function(module, action) {
                var data = {
                    "event_name": "",
                    "event_data": {}
                };
                switch (module) {
                    case appConstants.PUT_BACK:
                        switch (action) {
                            case appConstants.STAGE_ONE_BIN:
                                ActionCreators.stageOneBin();
                                break;
                            case appConstants.STAGE_ALL:
                                ActionCreators.stageAllBins();
                                break;
                            case appConstants.CANCEL_SCAN:
                                data["event_name"] = "cancel_barcode_scan";
                                data["event_data"]["barcode"] = this.props.barcode;
                                ActionCreators.postDataToInterface(data);
                                break;
                            case appConstants.CANCEL_EXCEPTION:
                                ActionCreators.enableException(false);
                                break;
                            case appConstants.CANCEL_EXCEPTION_TO_SERVER:
                                data["event_name"] = "cancel_exception";
                                ActionCreators.postDataToInterface(data);
                                break;
                            case appConstants.SEND_KQ_QTY:
                                data["event_name"] = "put_back_exception";
                                data["event_data"]["action"] ="confirm_quantity_update";
                                data["event_data"]["event"] = mainstore.getExceptionType();
                                data["event_data"]["quantity"] = mainstore.getkQQuanity();
                                ActionCreators.postDataToInterface(data);
                                break;
                            case appConstants.FINISH_EXCEPTION_ITEM_OVERSIZED:
                                  data["event_name"] = "put_back_exception";
                                  data["event_data"]["action"] ="finish_exception";
                                  data["event_data"]["event"] = mainstore.getExceptionType();
                                  ActionCreators.postDataToInterface(data);
                                break;
                            case appConstants.SEND_EXCESS_ITEMS_BIN:
                                data["event_name"] = "put_back_exception";
                                data["event_data"]["action"] ="extra_items_bin_select";
                                data["event_data"]["event"] = mainstore.getExceptionType();
                                data["event_data"]["bin_id"] = mainstore.getSelectedBin();
                                ActionCreators.postDataToInterface(data);
                                break;
                            case appConstants.CONFIRM_ITEM_PLACE_IN_IRT:
                                 data["event_name"] = "put_back_exception";
                                 data["event_data"]["action"] ="finish_exception";
                                 data["event_data"]["event"] = mainstore.getExceptionType();
                                 ActionCreators.postDataToInterface(data);
                                break;
                            case appConstants.CANCEL_TOTE:
                            case appConstants.CLOSE_TOTE:
                                data["event_name"] = "confirm_close_tote";
                                data["event_data"]["close_value"] = this.props.status;
                                data["event_data"]["barcode"] = this.props.toteId;
                                ActionCreators.postDataToInterface(data);
                                break;
                            case appConstants.CONFIRM_TOTE_EXCEPTION:
                                data["event_name"] = "put_back_exception";
                                data["event_data"]["action"] = "confirm_invalid_item_in_tote",
                                data["event_data"]["event"] = mainstore.getExceptionType();
                                data["event_data"]["item_uid"] = mainstore.getItemUid();
                                ActionCreators.postDataToInterface(data);
                                break;
                            case appConstants.CANCEL_TOTE_EXCEPTION:
                                data["event_name"] = "put_back_exception";
                                data["event_data"]["action"] = "cancel_invalid_item_in_tote",
                                data["event_data"]["event"] = mainstore.getExceptionType();
                                data["event_data"]["item_uid"] = mainstore.getItemUid();
                                ActionCreators.postDataToInterface(data);      
                            default:
                                return true;
                        }
                        break;
                    case appConstants.PUT_FRONT:
                        switch (action) {
                            case appConstants.CANCEL_SCAN:
                                data["event_name"] = "cancel_scan_all";
                                data["event_data"]["barcode"] = this.props.barcode;
                                ActionCreators.postDataToInterface(data);
                                break;
                            case appConstants.CANCEL_EXCEPTION:
                                ActionCreators.enableException(false);
                                break;
                            case appConstants.GET_MISSING_AND_DAMAGED_QTY:
                                ActionCreators.changePutFrontExceptionScreen("damaged_or_missing");
                                break;
                            case appConstants.GET_REVISED_QUANTITY:
                                 ActionCreators.changePutFrontExceptionScreen("revised_quantity");
                                break;
                            case appConstants.CANCEL_EXCEPTION_TO_SERVER:
                                data["event_name"] = "cancel_exception";
                                ActionCreators.postDataToInterface(data);
                                break;
                            case appConstants.VALIDATE_AND_SEND_DATA_TO_SERVER:
                                ActionCreators.validateAndSendDataToServer();
                                break;
                            case appConstants.VALIDATE_AND_SEND_SPACE_UNAVAILABLE_DATA_TO_SERVER:
                                ActionCreators.validateAndSendSpaceUnavailableDataToServer();
                                break;
                            default:
                                return true;
                        }
                        break;
                    case appConstants.PICK_FRONT:
                        switch (action) {
                            case appConstants.CANCEL_SCAN:
                                data["event_name"] = "cancel_scan_all";
                                ActionCreators.postDataToInterface(data);
                                break;
                            case appConstants.CHECKLIST_SUBMIT:
                                var checklist_index = this.props.checkListData.checklist_index;
                                var checkList = this.props.checkListData;
                                if (checklist_index != "all") {
                                    checkList.checklist_data[checklist_index - 1].map(function(value, index) {
                                        var keyvalue = Object.keys(value);
                                        checkList.checklist_data[checklist_index - 1][index][keyvalue[0]].value = document.getElementById("checklist_field" + index + "-" + (checklist_index - 1)).value;
                                    });
                                } else {
                                    checkList.checklist_data.map(function(value, index) {
                                        if(index < mainstore.scanDetails()["current_qty"])
                                        value.map(function(value1, index1) {
                                            var keyvalue = Object.keys(value1);
                                            checkList.checklist_data[index][index1][keyvalue[0]].value = document.getElementById("checklist_field" + index1 + "-" + index ).value;
                                        })
                                    });
                                }
                                data["event_name"] = "pick_checklist_update";
                                data["event_data"]["pick_checklist"] = checkList;
                                ActionCreators.postDataToInterface(data);
                                break;
                            case appConstants.GET_MISSING_AND_DAMAGED_QTY:
                                ActionCreators.changePickFrontExceptionScreen("damaged_or_missing");
                                break;
                            case appConstants.CONFIRM_FROM_USER:
                                ActionCreators.changePickFrontExceptionScreen("confirm_from_user");
                                break;
                             case appConstants.PLACE_ITEM_BACK:
                                ActionCreators.changePickFrontExceptionScreen("pick_front_quantity");
                                break;
                            case appConstants.VALIDATE_AND_SEND_DATA_TO_SERVER:
                                ActionCreators.validateAndSendDataToServer();
                                break;
                            case appConstants.SEND_MISSING_BOX_EXCEPTION:
                                 data["event_name"] = "pick_front_exception";
                                 data["event_data"]["event"] = mainstore.getExceptionType();
                                ActionCreators.postDataToInterface(data);
                                break;
                            case appConstants.EDIT_DETAILS:
                                data["event_name"] = "checklist_edit";
                                ActionCreators.postDataToInterface(data);
                                break;
                            case appConstants.CANCEL_EXCEPTION:
                                ActionCreators.enableException(false);
                                break;
                             case appConstants.CANCEL_EXCEPTION_TO_SERVER:
                                data["event_name"] = "cancel_exception";
                                ActionCreators.postDataToInterface(data);
                                break;
                            default:
                                return true;
                        }
                        break;
                    case appConstants.PICK_BACK:
                        switch (action) {
                            case appConstants.CANCEL_SCAN:
                                data["event_name"] = "cancel_tote_scan";
                                data["event_data"]["barcode"] = this.props.barcode;
                                ActionCreators.postDataToInterface(data);
                                break;
                            case appConstants.CANCEL_EXCEPTION:
                                ActionCreators.enableException(false);
                                break;
                            case appConstants.CANCEL_EXCEPTION_TO_SERVER:
                                data["event_name"] = "cancel_exception";
                                ActionCreators.postDataToInterface(data);
                                break;
                            case appConstants.REPRINT_INVOICE:
                                 data["event_name"] = "pick_back_exception";
                                 data["event_data"]["ppsbin_id"] = "undefined";
                                 data["event_data"]["type"] = mainstore.getExceptionType();
                                ActionCreators.postDataToInterface(data);
                                break;
                            case appConstants.SKIP_PRINTING:
                                 data["event_name"] = "pick_back_exception";
                                 data["event_data"]["ppsbin_id"] = mainstore.getSelectedBin();
                                 data["event_data"]["type"] = mainstore.getExceptionType();
                                ActionCreators.postDataToInterface(data);
                                break;
                            case appConstants.DIS_ASSOCIATE_TOTE:
                                ActionCreators.postDataToInterface(data);
                                break;
                            case appConstants.OVERRIDE_TOTE:
                                ActionCreators.postDataToInterface(data);
                                break;
                            default:
                                return true;
                        }
                        break;
                    case appConstants.AUDIT:
                        data["event_name"] = "audit_actions";
                        switch (action) {
                            case appConstants.CANCEL_SCAN:
                                data["event_data"]["type"] = "cancel_audit";
                                ActionCreators.postDataToInterface(data);
                                break;
                            case appConstants.GENERATE_REPORT:
                                data["event_data"]["type"] = "generate_report";
                                ActionCreators.postDataToInterface(data);
                                break;
                            case appConstants.CANCEL_FINISH_AUDIT:
                                data["event_data"]["type"] = "cancel_finish_audit";
                                ActionCreators.postDataToInterface(data);
                                break;
                            case appConstants.FINISH_CURRENT_AUDIT:
                                data["event_data"]["type"] = "finish_current_audit";
                                ActionCreators.postDataToInterface(data);
                                break;
                             case appConstants.SEND_KQ_QTY:
                                data["event_name"] = "audit_actions";
                                data["event_data"]["type"] = "exception_response";
                                data["event_data"]["event"] = mainstore.getExceptionType();
                                data["event_data"]["quantity"] = mainstore.getkQQuanity();
                                ActionCreators.postDataToInterface(data);
                                break;
                            case appConstants.CANCEL_EXCEPTION_TO_SERVER:
                                data["event_name"] = "cancel_exception";
                                ActionCreators.postDataToInterface(data);
                                break;    
                            default:
                                return true;
                        }
                        break;

                    default:
                        return true;
                }
            },
            render: function() {
                if (this.props.buttonChecklist != undefined) {
                    _checklistClass = 'checklistButtonSubmit';
                } else {
                    _checklistClass = '';
                }
                if (this.props.disabled == false)
                    return ( < a className = {
                            this.props.color == "orange" ? "custom-button orange " + _checklistClass : "custom-button black " + _checklistClass
                        }
                        onClick = {
                            this.performAction.bind(this, this.props.module, this.props.action)
                        }  > {
                            this.props.text
                        } < /a>
                    );
                else
                    return ( < a className = {
                            this.props.color == "orange" ? "custom-button disabled orange" : "custom-button disabled black"
                        } > {
                            this.props.text
                        } < /a>);
                    }
            });

        module.exports = Button1;