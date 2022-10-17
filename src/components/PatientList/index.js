import React from "react"
import PropTypes from "prop-types"
import PatientListItem from "../PatientListItem"
import { toggle, setAll } from "../../redux/selection"
import { showSelectedOnly } from "../../redux/settings"
import { setParam, fetch } from "../../redux/query"
import store from "../../redux"
import { connect } from "react-redux"
import Footer from "../Footer"
import Header from "../Header"
import ErrorMessage from "../ErrorMessage"
import Alert from "../Alert"
import "./PatientList.less"
import UserService from "../../services/UserService"


export class PatientList extends React.Component {
    static propTypes = {
        query: PropTypes.object,
        selection: PropTypes.object,
        location: PropTypes.object,
        settings: PropTypes.object,
        urlParams: PropTypes.object,
        dispatch: PropTypes.func
    };

    render() {
        return (
            <div className="page">
                <div className="row login_bg">
                    <div className="col-md-3 login_user"> Signed in as : <strong>{UserService.getUsername()}</strong></div>
                    <div className="col-md-offset-6 col-md-3 logout_button">
                        <button className="btn btn-info  navbar-btn navbar-right" style={{ marginRight: 0 }} onClick={() => UserService.doLogout()}>
                            Logout
                        </button>
                    </div>
                </div>

                <Header
                    query={this.props.query}
                    settings={this.props.settings}
                    location={this.props.location}
                    urlParams={this.props.urlParams}
                />
                <div className="patient-search-results">
                    {this.renderContents()}
                </div>
                <Footer
                    query={this.props.query}
                    bundle={this.props.query.bundle}
                    dispatch={this.props.dispatch}
                    selection={this.props.selection}
                    canShowSelected
                />
            </div>
        )
    }

    renderContents() {
        if (this.props.query.error) {
            return <ErrorMessage error={this.props.query.error} />
        }

        if (!this.props.query.bundle || this.props.query.loading) {
            return (
                <div className="patient-search-loading">
                    <i className="fa fa-spinner spin" /> Loading. Please wait...
                </div>
            )
        }

        if (!this.props.query.bundle.entry || !this.props.query.bundle.entry.length) {
            return (
                <Alert>
                    No patients found to match this search criteria
                </Alert>
            )
        }

        return this.renderPatientItems()
    }

    renderPatientItems() {

        const isSelected = (item) => {
            let idLower = (item.resource.id || "").toLowerCase();
            let key = Object.keys(this.props.selection).find(k => k.toLowerCase() == idLower);
            return key && this.props.selection[key] !== false;
        }

        let offset = this.props.query.offset || 0
        let items = this.props.query.bundle.entry || [];
        if (this.props.settings.renderSelectedOnly) {
            items = items.filter(isSelected);
        }
        return items.map((o, i) => (
            <PatientListItem
                {...o.resource}
                patient={o.resource}
                key={o.resource.id}
                index={offset + i}
                selected={isSelected(o)}
                onSelectionChange={patient => {
                    if (this.props.settings.renderSelectedOnly &&
                        Object.keys(this.props.selection).filter(k => !!this.props.selection[k]).length === 1) {
                        store.dispatch(setAll({}))
                        store.dispatch(showSelectedOnly(false))
                        store.dispatch(setParam({ name: "_id", value: undefined }))
                        store.dispatch(fetch())
                    }
                    else {
                        store.dispatch(toggle(patient))
                    }
                }}
                query={this.props.query}
                settings={this.props.settings}
            />
        ))
    }
}

export default connect(state => state)(PatientList);
