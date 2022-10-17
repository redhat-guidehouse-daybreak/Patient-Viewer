
import React from "react"
import PropTypes from "prop-types"
import "./PatientAlert.less"
import { getPatientName,
getPatientPhone,
getPatientEmail,
getPatientHomeAddress } from "../../lib"

export default class PatientAlert extends React.Component {
    static propTypes = {
        patient: PropTypes.object.isRequired,
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
                            The <strong> VA REACH VET </strong> predictive model has determined that <strong className="orange_hightlight">{getPatientName(this.props.patient)}</strong> is at <strong>Elevated/High</strong> risk for suicide ideation for the following clinical reasons :
                            <ul className="orange_hightlight">
                                <li> 1.  [Clinical Reason 1]</li>
                                <li> 2.  [Clinical Reason 2]</li>
                            </ul>
                            <p> The following areas of the patient record are recommended for review :</p>
                            <ul>
                                <li> Link to <a>Problem List</a></li>
                                <li> Link to <a>Current Medication</a></li>
                                <li> Link to <a>Problem Encounters last 30 Days</a></li>
                            </ul>
                            <p> In addition, because <strong>{getPatientName(this.props.patient)}</strong> lives at <strong>{getPatientHomeAddress(this.props.patient)}</strong>, they are at elevated rils for the following community reasons :</p>
                            <ul className="orange_hightlight">
                                <li> 1.  Food insecurity / Substance Sbuse/ Poor Health/ Severe Housing issues</li>
                                <li> 2.  Food insecurity / Substance Sbuse/ Poor Health/ Severe Housing issues</li>
                            </ul>
                            <p> The following are the individuals who are a part of <strong>PAtient Name 's</strong> care team :</p>
                            <ul className="orange_hightlight">
                                <li> [Care Giver #1],[Role/Position],[Contact Info]</li>
                                <li> [Care Giver #2],[Role/Position],[Contact Info]</li>
                                <li> [Care Giver #3],[Role/Position],[Contact Info]</li>
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
        )
    }

}