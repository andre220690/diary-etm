import React from 'react'
import { Chart } from "react-google-charts";


const ChartBar = ({data}) => {


    return (
        <div>
            <Chart
                chartType="Bar"
                width="100%"
                height="400px"
                data={data.data}
                options={data.options}
            />
        </div>
    )
}

export default ChartBar