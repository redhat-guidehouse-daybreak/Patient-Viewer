
import React from "react"
import PropTypes from "prop-types"
import "./PatientAlert.less"
import {
    getPatientName,
    getPatientPhone,
    getPatientEmail,
    getPatientHomeAddress
} from "../../lib"

export default class PatientAlert extends React.Component {
    static propTypes = {
        patient: PropTypes.object.isRequired,
        patientResources: PropTypes.object,
        className: PropTypes.string,
        style: PropTypes.object,
        base: PropTypes.string,
        toggle: PropTypes.func
    };

    static defaultProps = {
        base: ""
    };

    handleClick = () => {
        this.props.toggle();
    };

    getCityState = (patient) => {
        var cityState = {
            city: "",
            state: ""
        };
        if (patient.address && patient.address instanceof Array) {
            for (var i = 0; i < patient.address.length; i++) {
                if (patient.address[i].use == "home") {
                    cityState.city = patient.address[i].city;
                    cityState.state = patient.address[i].state;
                }
            }
        }

        return cityState;
    }



    render() {
        console.log(this.props.patient);

        var riskAssessment = this.props.patientResources.RiskAssessment;
        var outcome = {};
        try {
            var outcomestr = riskAssessment[0].resource.prediction[0].outcome.text;
            outcome = JSON.parse(outcomestr);
        } catch (e) {
            console.error(e);
        }

        console.log(outcome);
        var riskLevel = "";
        var rationaleList = [];
        var socialDeterminants = [];
        var careTeam = [];

        if (outcome instanceof Array) {
            outcome.forEach(o => {
                if (o.name == "Suicide Risk")
                    riskLevel = o.value;
                if (o.name == "Rationale")
                    rationaleList = o.value;
                if (o.name == "Social Determinants")
                    socialDeterminants = o.value;
                if (o.name == "Care Team")
                    careTeam = o.value;
            })
        }

        console.log("riskLevel :" + riskLevel);
        console.log("rationaleList :" + rationaleList);
        console.log("socialDeterminants :" + socialDeterminants);
        console.log("careTeam :" + careTeam);

        let { className, style, patient, base, ...rest } = this.props;
        style = { ...(style || {}) }
        style.backgroundColor = 'rgba(255, 255, 255, 0.6)'
        return (
            <div className="modal_local">
                <div className="modal_content">
                    <span className="close" onClick={this.handleClick}>
                        &times;
                    </span>
                    <div>
                        <h3 className="alert_heading">BEHAVIORAL SAFETY ALERT</h3>
                        <div>
                            <p>The <strong> VA REACH VET </strong> predictive model has determined that <strong>{getPatientName(this.props.patient)}</strong> is at <strong className={`${riskLevel.indexOf("Medium") != -1 ? "orange_hightlight" : "red_hightlight"}`} >{riskLevel}</strong> for <b>attempting suicide/self-harm</b> for the following clinical reasons:</p>
                            <ul className="no-bullets">
                                {
                                    rationaleList.map((str, index) => {
                                        return <li className="numbered">{index + 1}. {str} </li>
                                    })
                                }
                            </ul>
                            <p > The following areas of the patient record are recommended for review:</p>
                            <ul>
                                <li> Link to <a>Problem List</a></li>
                                <li> Link to <a>Current Medication</a></li>
                                <li> Link to <a>Problem Encounters last 30 Days</a></li>
                            </ul>
                            <p> In addition, because <strong>{getPatientName(this.props.patient)}</strong> lives in <strong>{this.getCityState(this.props.patient).city}, {this.getCityState(this.props.patient).state}</strong>, they are at an elevated social risk for <b> attempting suicide/self-harm</b>  for the following community reasons:</p>
                            <ul className="no-bullets">
                                {
                                    socialDeterminants.map((str, index) => {
                                        return <li className="numbered">{index + 1}. {str} </li>
                                    })
                                }
                            </ul>
                            <p> The following individuals are part of the care team for <strong>{getPatientName(this.props.patient)}:</strong> </p>
                            <ul>
                                {
                                    careTeam.map((obj) => {
                                        return <li> {obj.name}, {obj.Role}, {obj.Phone}</li>
                                    })
                                }
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
        )
    }

}