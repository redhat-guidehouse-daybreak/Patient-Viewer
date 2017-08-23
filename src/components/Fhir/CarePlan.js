import React       from "react"
import Grid        from "./Grid"
import { getPath } from "../../lib"
import Period      from "./Period"

export default class CarePlan extends React.Component
{
    static propTypes = {
        resources: React.PropTypes.arrayOf(React.PropTypes.object)
    };

    render()
    {
        return (
            <Grid
                rows={ (this.props.resources || []).map(o => o.resource) }
                title="CarePlan"
                cols={[
                    {
                        label: "Category",
                        render: rec => (
                            <b>
                                { getPath(rec, "category.0.coding.0.display") }
                            </b>
                        )
                    },
                    {
                        label: "Reason",
                        render: rec => (rec.activity || []).map((a, i) => {
                            let reason = getPath(a, "detail.code.coding.0.display") || ""
                            return reason ? (
                                <div key={i}>
                                    { reason }
                                    <span> - </span>
                                    <span className="text-muted">{
                                        getPath(a, "detail.status") || "no data"
                                    }</span>
                                </div>
                            ) : ""
                        })
                    },
                    {
                        label: "Period",
                        render: o => Period(o.period)
                    },
                    {
                        label: "Status",
                        path : "status"
                    }
                ]}
            />
        )
    }
}
