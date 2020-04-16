import React, { useState, useEffect } from 'react';
import marked from 'marked'
import './index.scss'
import { Row, Col, Input, Select, Button, DatePicker, message } from 'antd'
import axios from 'axios'
import { servicePath } from '../../config/apiUrl'
import { articleType } from '../../config/articleType'
import { requestGet, requestPost } from '../../config/request'

const { Option } = Select;
const { TextArea } = Input

function AddArticle(props) {
  const [typeId, setTypeId] = useState(0) //文章类型id
  const [articleId, setArticleId] = useState(0)  // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
  const [articleTitle, setArticleTitle] = useState('')   //文章标题
  const [articleContent, setArticleContent] = useState('')  //markdown的编辑内容
  const [markdownContent, setMarkdownContent] = useState('预览内容') //html内容
  const [introducemd, setIntroducemd] = useState()            //简介的markdown内容
  const [introducehtml, setIntroducehtml] = useState('等待编辑') //简介的html内容
  const [showDate, setShowDate] = useState()   //发布日期
  const [updateDate, setUpdateDate] = useState() //修改日志的日期
  const [typeInfo, setTypeInfo] = useState([]) // 文章类别信息
  const [selectedType, setSelectType] = useState('请选择类别') //选择的文章类别

  const renderer = new marked.Renderer();
  marked.setOptions({ // marked配置
    renderer: renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
  });

  const changeArticleContent = (e) => { //文章预览
    setArticleContent(e.target.value)
    let articleHtml = marked(e.target.value)
    setMarkdownContent(articleHtml)
  }

  const changeIntroducemd = (e) => {  //简介预览
    setIntroducemd(e.target.value)
    let introducehtml = marked(e.target.value)
    setIntroducehtml(introducehtml)
  }

  const getTypeInfo = () => {  // 获取文章分类
    requestGet(servicePath.getTypeInfo)
      .then((res) => {
        setTypeInfo(res.data.data)
        // res.data.data == "未登录" ? (localStorage.removeItem("openId"), props.history.push('/')) : setTypeInfo(res.data.data);
        if (res.data.data == "未登录") {
          localStorage.removeItem('openId')
          props.history.push('/')  
        } else {
          setTypeInfo(res.data.data)
        }
      }).catch(() => {
        console.log('getTypeInfo 请求失败!')
      })
  }

  const selectTypeHandler = (value) => {  //文章类别
    setSelectType(value)
  }
  const changeShowDate = (data) => {  //发布时间
    setShowDate(data)
  }
  const changeArticleTitle = (title) => { //文章标题
    setArticleTitle(title)
  }

  // const changeSelectedType = ()=>{
  //   console.log(typeId)
  //   console.log(articleType[typeId]);

  //   setSelectType(articleType[typeId])
  // }
  const saveArticle = () => {
    if (!selectedType) {
      message.error('必须选择文章类别')
      return false
    } else if (!articleTitle) {
      message.error('文章名称不能为空')
      return false
    } else if (!articleContent) {
      message.error('文章内容不能为空')
      return false
    } else if (!introducemd) {
      message.error('简介不能为空')
      return false
    } else if (!showDate) {
      message.error('发布日期不能为空')
      return false
    }
    let dataProps = {}
    dataProps.type_id = selectedType
    dataProps.title = articleTitle
    dataProps.article_content = articleContent
    dataProps.introduce = introducemd
    let datetext = showDate.replace('-', '/') //把字符串转换成时间戳
    dataProps.addTime = (new Date(datetext).getTime()) / 1000

    if (articleId === 0) {
      dataProps.view_count = Math.ceil(Math.random() * 100) + 1000
      requestPost(servicePath.addArticle, dataProps)
      .then((res) => {
        setArticleId(res.data.insertId)
        res.data.isSuccess ? message.success('添加成功!') : message.success('添加失败!');
      })
    } else {
      dataProps.id = articleId
      requestPost(servicePath.updateArticle, dataProps)
      .then((res) => {
        if (res.data.isSuccess) { }
        res.data.isSuccess ? message.success('文章修改成功! ') : message.success('文章修改失败!')
      })
    }

  }

  const getArticleById = id => {
    requestGet(servicePath.getArticleById + id)
      .then(res => {
        let article = res.data.data[0]
        console.log(article);
        setArticleTitle(article.title)
        setArticleContent(article.article_content)
        let contentHtml = marked(article.article_content)
        setMarkdownContent(contentHtml)
        setIntroducemd(article.introduce)
        let introHtml = marked(article.introduce)
        setIntroducehtml(introHtml)
        setShowDate(article.addTime)
        setIntroducemd(article.introduce)
        setSelectType(article.typeId)
        setTypeId(article.typeId)
        // console.log(article.typeId);
        // console.log(typeId);

        // changeSelectedType()

        // setSelectType(articleType[typeId])
        // console.log(articleType[typeId])
      })
  }
  useEffect(() => {
    getTypeInfo();
    let id = props.match.params.id
    if (id) {
      setArticleId(id)
      getArticleById(id)
    }
  }, [])
  // useEffect(()=>{
  //   console.log('changeSeleted');

  //   changeSelectedType()
  // },[])


  return (
    <div>
      <Row gutter={5}>
        <Col span={18}>
          <Row gutter={10}>
            <Col span={20}>
              <Input size="middle" placeholder="请输入博客标题" onChange={(e) => { changeArticleTitle(e.target.value) }} value={articleTitle} />
            </Col>
            <Col span={4}>
              <Select placeholder='请选择累别' value={selectedType} onChange={selectTypeHandler} size="middle">
                {
                  typeInfo.map((item, key) => {
                    return (
                      <Option value={item.id} key={key}>{item.typeName}</Option>
                    )
                  })
                }
              </Select>
            </Col>
          </Row>
          <br />
          <Row gutter={8}>
            <Col span={12}>
              <TextArea
                className="markdown-content"
                rows={35}
                onChange={changeArticleContent}
                onPressEnter={changeArticleContent}
                placeholder="文章内容"
                value={articleContent}
              >
              </TextArea>
            </Col>
            <Col span={12}>
              <div className="show-html"
                dangerouslySetInnerHTML={{ __html: markdownContent }}
              >
              </div>
            </Col>
          </Row>
        </Col>
        <Col span={6}>
          <Row>
            <Col span={8}>
              <Button type="default" >暂存文章</Button>

            </Col>
            <Col span={8}>
              <Button type="primary" onClick={saveArticle}>发布文章</Button>
            </Col>
          </Row>
          <br />
          <Row>
            <br />
            <Col span={24}>
              <TextArea
                placeholder="文章简介"
                rows={4}
                onChange={changeIntroducemd}
                onPressEnter={changeIntroducemd}
                value={introducemd}
              >
              </TextArea>
              <br /><br />
              <div className="introduce-html"
                dangerouslySetInnerHTML={{ __html: introducehtml }}
              ></div>
            </Col>

          </Row>
          <Row>
            <Col span={12}>
              <div className="date-select">
                <DatePicker
                  onChange={(data, dataString) => { changeShowDate(dataString) }}
                  placeholder="发布日期"
                  size="middle"
                />
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  )
}
export default AddArticle