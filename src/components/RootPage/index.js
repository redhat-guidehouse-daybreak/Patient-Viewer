import React from "react"
import { Provider } from "react-redux"
import STORE from "../../redux"
import PatientList from "../PatientList"
import PatientDetail from "../PatientDetail"
import App from "../App"
import { BrowserRouter as Router, Route, Link, Routes, Switch } from "react-router-dom"
import jQuery from "jquery";
import RenderOnAnonymous from '../RenderOnAnonymous';
import RenderOnAuthenticated from '../RenderOnAuthenticated';

export class RootPage extends React.Component {


    render() {
        window.$ = window.jQuery = jQuery

        console.log(STORE.getState());
        return (
            <div>
                <Provider store={STORE}>
                    <Router history={history}>
                        <div>
                            <RenderOnAnonymous>
                                <div> Welcome Please login first</div>
                            </RenderOnAnonymous>
                            <RenderOnAuthenticated>
                                <Switch>
                                    <App>
                                        <Route path="/" component={PatientList} exact />
                                        <Route path="/patient/:index" component={PatientDetail}></Route>
                                    </App>
                                </Switch>
                            </RenderOnAuthenticated>
                        </div>

                    </Router>
                </Provider>
            </div>

        );
    }


}



export default RootPage;
