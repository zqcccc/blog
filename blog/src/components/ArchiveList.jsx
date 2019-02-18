import React from 'react'
import ClassNames from 'classnames'
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import moment from 'moment'
import { Link } from "react-router-dom";
import { getList } from 'action/action'
import { sortByDate } from 'reducer'

import "./ArchiveList.less"

class ArchiveList extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    componentDidMount(){
        // TODO: 初始化
        if (!this.props.list.size) {
            this.props.getList()
        }
    }

    render(){
        // let years = this.state.years || new Set();
        // let yearsMap = this.state.yearsMap || new Map();
        const { list } = this.props
        let yearsMap = new Map()
        let years = new Set()
        if (list && list.size) {
            for (let i of list.values()) {
                let year = new Date(i.date).getFullYear()
                years.add(year)
                let t = yearsMap.get(year) || []
                t.push(i)
                yearsMap.set(year, t)
            }
            yearsMap.forEach((value, key) => {
                let t = yearsMap.get(key)
                t = sortByDate(t)
                yearsMap.set(key, t)
            })
            console.log('yearsMap: ', yearsMap);
        }
        // 分年月归档信息整理

        return(<div className={"archives-container"}>
            {Array.from(years).map((year, yearIndex) =>
                <div className={"one-tag-list"} key={yearIndex}>

                    <span className={"fa fa-calendar-times-o listing-seperator"}>
                        <span className={"tag-text"}>{year}</span>
                    </span>

                    <ul>
                        {yearsMap.get(year).map((item, index) =>
                            <li key={index}>
                                <span>{moment(item.date).format('MM-DD')}</span>
                                <i className="fa fa-angle-double-right" aria-hidden="true" />
                                <Link to={'/article/' + item.pathName}>
                                    <span>
                                        {item.title}
                                    </span>
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>

            )}
        </div>)
    }
}

const mapStateToProps = (state) => {
    const { status, list } = state
    return { status, list }
}
// const mapDispatchToProps = dispatch => ({
//     // 例如：yourAction:bindActionCreators(yourAction, dispatch),
// })
const mapDispatchToProps = {
    getList
}

export default connect(mapStateToProps, mapDispatchToProps)(ArchiveList)