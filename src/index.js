import React from "react"
import ReactDOM from "react-dom"
import UserService from "./services/UserService"
//import HttpService from "./services/HttpService"

import RootPage from "./components/RootPage"


var callback = () => {
    console.log(" Callback Invoked  :  " + UserService.isLoggedIn());
    ReactDOM.render(
        <RootPage/>,
        document.getElementById("main")
    )
}

/* $(function () {
    $("body").tooltip({
        selector: ".patient-detail-page [title]"
    })
})
 */
UserService.initKeycloak(callback);
//HttpService.configure();