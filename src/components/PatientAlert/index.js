
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
                            The <strong> VA REACH VET </strong> predictive model has determined that <strong className="orange_hightlight">{getPatientName(this.props.patient)}</strong> is at <strong>{riskLevel}</strong> risk for suicide ideation for the following clinical reasons :
                            <ul className="orange_hightlight">
                                {
                                    rationaleList.map((str, index) => {
                                        return <li>{index+1}. {str} </li>
                                    })
                                }
                            </ul>
                            <p> The following areas of the patient record are recommended for review :</p>
                            <ul>
                                <li> Link to <a>Problem List</a></li>
                                <li> Link to <a>Current Medication</a></li>
                                <li> Link to <a>Problem Encounters last 30 Days</a></li>
                            </ul>
                            <p> In addition, because <strong>{getPatientName(this.props.patient)}</strong> lives at <strong>{getPatientHomeAddress(this.props.patient)}</strong>, they are at elevated rils for the following community reasons :</p>
                            <ul className="orange_hightlight">
                                {
                                    socialDeterminants.map((str,index)=>{
                                        return <li>{index+1}. {str} </li>
                                    })
                                }
                            </ul>
                            <p> The following are the individuals who are a part of <strong>{getPatientName(this.props.patient)}</strong> care team :</p>
                            <ul className="orange_hightlight">
                                {
                                    careTeam.map((obj)=>{
                                        return <li> [{obj.name}],[{obj.Role}],[{obj.Phone}]</li>
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