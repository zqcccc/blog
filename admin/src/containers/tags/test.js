// import React, { PureComponent, Fragment } from 'react'
// import { connect } from 'react-redux'
// import { getTagList, newTag, toggleEditable } from '../../redux/action'
// import { Table, Button, Input, message, Popconfirm, Divider } from 'antd'
// import isEqual from 'lodash/isEqual'
// import styles from './style.less'

// const tableData = [
//   {
//     key: '1',
//     workId: '00001',
//     name: 'John Brown',
//     department: 'New York No. 1 Lake Park'
//   },
//   {
//     key: '2',
//     workId: '00002',
//     name: 'Jim Green',
//     department: 'London No. 1 Lake Park'
//   },
//   {
//     key: '3',
//     workId: '00003',
//     name: 'Joe Black',
//     department: 'Sidney No. 1 Lake Park'
//   }
// ]
// class TableForm extends PureComponent {
//   index = 0

//   cacheOriginData = {}

//   constructor(props) {
//     super(props)

//     this.state = {
//       // data: props.tag || [],
//       data: tableData,
//       loading: false,
//       /* eslint-disable-next-line react/no-unused-state */
//       // value: props.tag || []
//       value: tableData,
//     }
//   }

//   componentDidMount() {
//     this.props.init()
//   }
//   // static getDerivedStateFromProps(nextProps, preState) {
//   //   if (isEqual(nextProps.value, preState.value)) {
//   //     return null;
//   //   }
//   //   return {
//   //     data: nextProps.value,
//   //     value: nextProps.value,
//   //   };
//   // }

//   // getRowByKey(key, newData) {
//   //   const { data } = this.state;
//   //   return (newData || data).filter(item => item.key === key)[0];
//   // }

//   toggleEditable = (e, key) => {
//     e.preventDefault()
//     const { tag } = this.props
//     // const newData = data.map(item => ({ ...item }));
//     const target = tag.filter(i => i.key === key)
//     if (target) {
//       // 进入编辑状态时保存原始数据
//       if (!target.editable) {
//         this.cacheOriginData[key] = { ...target }
//       }
//       this.props.toggleTag(key)
//       // target.editable = !target.editable;
//       // this.setState({ data: newData });
//     }
//   }

//   newMember = () => {
//     // this.props.newTag()
//     const { data } = this.state;
//     const newData = [...data]
//     newData.push({
//       key: `NEW_TEMP_ID_${this.index}`,
//       _Id: '',
//       name: '',
//       descript: '',
//       editable: true,
//       isNew: true,
//     });
//     this.index += 1;
//     this.setState({ data: newData });
//   }

//   remove(key) {
//     const { data } = this.state
//     const { onChange } = this.props
//     const newData = data.filter(item => item.key !== key)
//     this.setState({ data: newData })
//     // onChange(newData);
//   }

//   handleKeyPress(e, key) {
//     if (e.key === 'Enter') {
//       this.saveRow(e, key)
//     }
//   }

//   handleFieldChange(e, fieldName, key) {
//     const { data } = this.state
//     const newData = [...data]
//     const target = (newData || data).filter(item => item.key === key)[0]
//     if (target) {
//       target[fieldName] = e.target.value
//       this.setState({ data: newData })
//     }
//   }

//   saveRow(e, record) {
//     e.persist()
//     this.setState({
//       loading: true
//     })
//     setTimeout(() => {
//       if (this.clickedCancel) {
//         this.clickedCancel = false
//         return
//       }
//       const target = record || {}
//       if (!target.name || !target.descript) {
//         message.error('请填写完整信息。')
//         e.target.focus()
//         this.setState({
//           loading: false
//         })
//         return
//       }
//       delete target.isNew
//       this.toggleEditable(e, record.key)
//       // const { data } = this.state
//       // const { onChange } = this.props
//       // onChange(data);
//       this.setState({
//         loading: false
//       })
//     }, 500)
//   }

//   cancel(e, key) {
//     this.clickedCancel = true
//     e.preventDefault()
//     const { data } = this.state
//     const newData = data.map(item => ({ ...item }))
//     const target = this.getRowByKey(key, newData)
//     if (this.cacheOriginData[key]) {
//       Object.assign(target, this.cacheOriginData[key])
//       delete this.cacheOriginData[key]
//     }
//     target.editable = false
//     this.setState({ data: newData })
//     this.clickedCancel = false
//   }

//   render() {
//     const columns = [
//       {
//         title: 'id',
//         dataIndex: '_id',
//         key: '_id',
//         width: '20%',
//         render: (text, record) => {
//           if (record.editable) {
//             return (
//               <Input
//                 value={text}
//                 autoFocus
//                 onChange={e => this.handleFieldChange(e, '_id', record.key)}
//                 onKeyPress={e => this.handleKeyPress(e, record.key)}
//                 placeholder=""
//               />
//             )
//           }
//           return text
//         }
//       },
//       {
//         title: '标签名',
//         dataIndex: 'name',
//         key: 'name',
//         width: '20%',
//         render: (text, record) => {
//           if (record.editable) {
//             return (
//               <Input
//                 value={text}
//                 onChange={e => this.handleFieldChange(e, 'name', record.key)}
//                 onKeyPress={e => this.handleKeyPress(e, record.key)}
//                 placeholder="标签名"
//               />
//             )
//           }
//           return text
//         }
//       },
//       {
//         title: '描述',
//         dataIndex: 'descript',
//         key: 'descript',
//         width: '40%',
//         render: (text, record) => {
//           if (record.editable) {
//             return (
//               <Input
//                 value={text}
//                 onChange={e =>
//                   this.handleFieldChange(e, 'descript', record.key)
//                 }
//                 onKeyPress={e => this.handleKeyPress(e, record.key)}
//                 placeholder="描述"
//               />
//             )
//           }
//           return text
//         }
//       },
//       {
//         title: '操作',
//         key: 'action',
//         render: (text, record) => {
//           const { loading } = this.state
//           if (!!record.editable && loading) {
//             return null
//           }
//           if (record.editable) {
//             if (record.isNew) {
//               return (
//                 <span>
//                   <a onClick={e => this.saveRow(e, record)}>添加</a>
//                   <Divider type="vertical" />
//                   <Popconfirm
//                     title="是否要删除此行？"
//                     onConfirm={() => this.remove(record.key)}
//                   >
//                     <a>删除</a>
//                   </Popconfirm>
//                 </span>
//               )
//             }
//             return (
//               <span>
//                 <a onClick={e => this.saveRow(e, record)}>保存</a>
//                 <Divider type="vertical" />
//                 <a onClick={e => this.cancel(e, record.key)}>取消</a>
//               </span>
//             )
//           }
//           return (
//             <span>
//               <a onClick={e => this.toggleEditable(e, record.key)}>编辑</a>
//               <Divider type="vertical" />
//               <Popconfirm
//                 title="是否要删除此行？"
//                 onConfirm={() => this.remove(record.key)}
//               >
//                 <a>删除</a>
//               </Popconfirm>
//             </span>
//           )
//         }
//       }
//     ]

//     const { loading, data } = this.state
//     const tag = this.props.tag
//     const allData = tag.concat(data)
//     return (
//       <Fragment>
//         <Table
//           loading={loading}
//           columns={columns}
//           dataSource={allData}
//           pagination={false}
//           rowClassName={record => (record.editable ? styles.editable : '')}
//         />
//         <Button
//           style={{ width: '100%', marginTop: 16, marginBottom: 8 }}
//           type="dashed"
//           onClick={this.newMember}
//           icon="plus"
//         >
//           新增成员
//         </Button>
//       </Fragment>
//     )
//   }
// }

// export default connect(
//   ({ tag }) => ({ tag }),
//   {
//     init: () => getTagList(),
//     newTag: () => newTag(),
//     toggleTag: key => toggleEditable(key)
//   }
// )(TableForm)
