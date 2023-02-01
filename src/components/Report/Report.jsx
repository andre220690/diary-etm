import React, {useState} from 'react'
import PostService from '../../Api/PostService'
import TopMenu from '../TopMenu'
import FilterReport from './FilterReport'

const Report = () => {
    const [showMenuFilter, setShowMenuFilter] = useState(false)


    const buttons = [
        {
            name: 'Фильтр',
            action: ()=>{setShowMenuFilter(true)}
        }];



    return (
        <div>
            <TopMenu buttons={buttons} />
            {showMenuFilter
            ?<FilterReport/>
            :<div/>
            }

        </div>
    )
}

export default Report