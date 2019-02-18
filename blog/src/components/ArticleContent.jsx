import React from 'react'
const queryString = require('query-string');
import "./ArticleContent.less"
import axios from "axios/index";
import {preURL, publicURL} from "../config";
import moment from "moment/moment";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import { getContent } from 'action/action'
const ReactMarkdown = require('react-markdown')

class ArticleContent extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            post:{}
        }
    }

    componentDidMount(){

        const query = this.props.match.params;
        const { contentList, getContent } = this.props
        // TODO: 可以先采用 redux 中的信息
        if(!contentList.get(query.pathName)) {
            getContent(query.pathName)
        } // 如果 store 里有文章的内容就不请求了
        // fetchData(`post?pathName=${query.pathName}`).then(() => {
        //     content = this.props.contentList.get(query.pathName)
        //     this.setState({
        //         post: content || {}
        //     })
        // })
        // axios.get(`${preURL}/post?pathName=${query.pathName}`).then((response) => {
        //     console.log('%c content response', 'color: #898989', response.data)
        //     this.setState({
        //         post:response.data
        //     })
        // },(error) => {
        //     alert('拉取数据失败，请配置后端博客服务！')
        // })
    }

    render(){
        const query = this.props.match.params
        // 先用列表页的元数据
        const contentMeta = this.props.list.get(query.pathName) || {}
        const content = this.props.contentList.get(query.pathName) || {}

        return(
            <div className={'post-container'}>

                <div className={'post-title'}>
                    {content.title || contentMeta.title}
                </div>

                <div className={'post-meta'}>

                    <span className={'attr'}>
                        发布于：
                        {moment(content.date || contentMeta.date).format('YYYY-MM-DD hh:mm:ss')}
                    </span>

                    <span className={'attr'}>
                        标签：/
                        {(content.tags || contentMeta.tags || []).map((item, index) =>
                            " " + item + " /"
                        )}
                    </span>

                    <span className={'attr'}>
                        访问：

                    </span>

                </div>


                <div className={'post-content'}>
                    <ReactMarkdown source={'# pipeline\n\n如果你了解`管道`的概念，你可以跳过这一段话。如果你不了解，我在这里打个比方，比如生活中的水管，水(也就是我们的数据源)源源不断的从一节(一个管道)流向另一节(另一个管道)；如果对某一节(一个管道)的水做了一些处理(也就是数据的筛选，排序等)，那么在下一节(另一个管道)接收到的水就是你处理后的，当然，你也可以再次处理，如此反复...最后流到你家的就是经过层层处理的水(也就是我们需要得到的数据)。\n\n而Mongoose的`聚合函数`的原理就是这样，后一个管道得到的数据是上一个管道处理后的数据...。\n\n**管道是可重复的。**\n\n## 表达式\n\n表达式很简单，你可以理解为计算。在Mongoose中主要处理输入文档并输出。表达式是无状态的，只能用于计算当前聚合管道的文档，不能处理其它的文档。\n\n下面开始学习聚合函数。\n\n语法：\n\n```\ndb.COLLECTION_NAME.aggregate(OPERATION， CALLBACK)\n```\n\nOPERATION: Object | Array，可选\n\nCALLBACK: 可选\n\n## 管道\n\n- `$project`：修改输入文档的结构。可以用来重命名、增加或删除域，也可以用于创建计算结果以及嵌套文档。对应`project()`方法\n- `$match`：用于过滤数据，只输出符合条件的文档。$match使用MongoDB的标准查询操作。对应`match()`。\n- `$limit`：用来限制MongoDB聚合管道返回的文档数。对应`limit()`方法\n- `$skip`：在聚合管道中跳过指定数量的文档，并返回余下的文档。对应`skip()`。\n- `$unwind`：将文档中的某一个数组类型字段拆分成多条，每条包含数组中的一个值。对应`unwind()`方法\n- `$group`：将集合中的文档分组，可用于统计结果。对应`group()`方法\n- `$sort`：将输入文档排序后输出。对应`sort()`方法\n- `$geoNear`：输出接近某一地理位置的有序文档。对应`near()`。\n\n**v3.2**\n\n- `$sample`：随机选择N个\n- `$lookup`：连接操作符，用于连接同一个数据库中另一个集合，并获取指定的文档，类似于populate\n\n更多管道操作符：<https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline/>\n\n\n\n对于`$group`的表达式：\n\n- `$sum` 计算总和。\n- `$avg` 计算平均值 \n- `$min` 获取集合中所有文档对应值得最小值。\n- `$max` 获取集合中所有文档对应值得最大值。\n- `$push` 在结果文档中插入值到一个数组中。\n- `$addToSet` 在结果文档中插入值到一个数组中，但不创建副本。\n- `$first` 根据资源文档的排序获取第一个文档数据。\n- `$last` 根据资源文档的排序获取最后一个文档数据\n\n\n\n更多表达式：<https://docs.mongodb.com/manual/meta/aggregation-quick-reference/#aggregation-expressions>\n\n'} />
                </div>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { status, contentList, list } = state
    return { status, contentList, list }
}
// const mapDispatchToProps = dispatch => ({
//     // 例如：yourAction:bindActionCreators(yourAction, dispatch),
//     fetchData
// })
const mapDispatchToProps = {
    getContent
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleContent)