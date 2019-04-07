import React from 'react'
import { Button, Radio, Icon,Spin, Alert } from 'antd';
import fetchJSONP from 'fetch-jsonp'
export default class MovieDetail extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            info:{},
            isLoading:true
        }
    }

    componentWillMount(){
        fetchJSONP('https://api.douban.com/v2/movie/subject/'+this.props.match.params.id+'').then(res=>res.json()).then(data=>{
            this.setState({
                info:data,
                isLoading:false
            })
        })
    }

    render(){
        return <div>
            <div>
                <Button type="primary" onClick={this.goBack}><Icon type="left" />返回电影列表</Button>
            </div>
            <div>
             {this.renderInfo()}
            </div>
            </div>
    }

    goBack=()=>{
        this.props.history.go(-1)
    }

    renderInfo = ()=>{
        if(this.state.isLoading){
            <Spin tip="Loading...">
                        <Alert
                        message="正在加载电影详情"
                        description="Further details about the context of this alert."
                        type="info"
                        />
                    </Spin>
        }else{
            return <div>
                <div style={{textAlign:'center'}}>
                <h1>{this.state.info.title}</h1>
                <img src={this.state.info.images.large.replace('img3','img1')} alt=""/>
            </div>
            <p style={{textIndent:'2em',lineHeight:'30px'}}>{this.state.info.summary}</p>
            </div>
        }
    }
}