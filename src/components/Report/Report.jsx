import React, { useState } from 'react'
import TopMenu from '../TopMenu'
import FilterReport from './FilterReport'
import styles from './Report.module.css'
import ChartBar from './ChartBar'

const Report = () => {
    const [showMenuFilter, setShowMenuFilter] = useState(false)
    const [reportData, setReportData] = useState();

    const buttons = [
        {
            name: 'Фильтр',
            action: () => { setShowMenuFilter(true) }
        }];

    return (
        <div>
            <TopMenu buttons={buttons} />
            {reportData
                ? <div className={styles.r01}>
                    <ChartBar data={reportData.tasks} />
                    <ChartBar data={reportData.sticks} />
                </div>
                : <div />
            }
            {showMenuFilter
                ? <FilterReport setReportData={setReportData} setShowMenuFilter={setShowMenuFilter} />
                : <div />
            }
        </div>
    )
}

export default Report