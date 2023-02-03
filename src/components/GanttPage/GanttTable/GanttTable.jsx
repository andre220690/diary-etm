import React, { useEffect, useState } from 'react'
import HeaderTable from './HeaderTable'
import '../GanttTable.css'
import BodyTable from './BodyTable'

const GanttTable = ({data, dateInterval}) => {

    useEffect(()=>{


    },[])

  return (
    <div>
        <table class="iksweb">
            <HeaderTable dateInterval={dateInterval}/>
            <BodyTable data={data} dateInterval={dateInterval}/>
        </table>
    </div>
  )
}

export default GanttTable