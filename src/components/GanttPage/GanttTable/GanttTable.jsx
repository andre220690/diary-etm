import React, { useEffect, useState } from 'react'
import HeaderTable from './HeaderTable'
import '../GanttTable.css'
import BodyTable from './BodyTable'

const GanttTable = ({data, dateInterval}) => {
    const [header, setHeader] = useState([])

    useEffect(()=>{


    },[])

  return (
    <div>
        <table class="iksweb">
            <HeaderTable dateInterval={dateInterval}/>
            <BodyTable/>
        </table>
    </div>
  )
}

export default GanttTable