import React from 'react'
import ClassNames from 'classnames'
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import { Link } from "react-router-dom";
import { getList } from 'action/action'

import './TagList.less'

class TagList extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    componentDidMount(){
       // TODO: 判断以及初始化
        if (!this.props.list.size) {
            this.props.getList()
        }
    }

    render(){

        const { list } = this.props
        let tags = new Map()
        let tagKeys = new Set()
        if (list && list.size) {
            for (let i of list.values()) {
                i.tag.map(tag => {
                    tagKeys.add(tag.name)
                    let t = tags.get(tag.name) || []
                    t.unshift(i)
                    tags.set(tag.name, t)
                })
            }
        }
        // let tags = new Map();
        // let tagKeys = new Set();
        // let tags = this.state.tags || new Map();
        // let tagKeys = this.state.tagKeys || new Set();

        // TODO: 设定 tags 和 tagKeys

        return (<div>
            <div id='tag_cloud' className="tags">
                {Array.from(tagKeys).map((tagKey, keyIndex) =>
                    <a key={keyIndex}>{tagKey}</a>
                )}
            </div>

            {Array.from(tagKeys).map((tagKey, keyIndex) =>
                <div className={'one-tag-list'} key={keyIndex}>
                    <span className="fa fa-tag listing-seperator" id={keyIndex}>
                        <span className="tag-text">{tagKey}</span>
                    </span>
                    {tags.get(tagKey).map((item, itemIndex) =>
                        <div className={'post-preview'} key={itemIndex}>
                            <Link to={'/article/' + item._id}>
                                <h2 className={'post-title'}>
                                    {item.title}
                                </h2>
                            </Link>
                        </div>
                    )}
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

export default connect(mapStateToProps, mapDispatchToProps)(TagList)
