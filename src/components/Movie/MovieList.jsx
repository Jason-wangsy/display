import React from 'react'
import { Spin, Alert,Pagination  } from 'antd';
import fetchJSONP from 'fetch-jsonp'
import MovieItem from './MovieItem.jsx'

export default class MovieList extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            movies:[],
            nowPage:parseInt(props.match.params.page) || 1,
            pageSize:12,
            total:0,
            isLoading:true,
            movieType:props.match.params.type
        }
    }
    componentWillMount(){
        this.loadMoviesListByTypeAndPage()
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            nowPage:parseInt(nextProps.match.params.page) || 1,
            isLoading:true,
            movieType:nextProps.match.params.type
        },function(){
            this.loadMoviesListByTypeAndPage()
        })
    }

    render(){
        return <div>{this.renderList()}</div>
    }

    

    loadMoviesListByTypeAndPage=()=>{
        const start = this.state.pageSize * (this.state.nowPage - 1)

        const url = `https://api.douban.com/v2/movie/${this.state.movieType}?start=${start}&count=${this.state.pageSize}`

        fetchJSONP(url)
        .then(response => response.json())
        .then(data => {
            // console.log(data);
            this.setState({
            isLoading: false, 
            movies: data.subjects, 
            total: data.total 
            })
        }) 
        
        // const data = require('../movie_data/'+this.state.movieType+'.json')
        // setTimeout(() => {
        // this.setState({
        //     isLoading: false, 
        //     movies: data.subjects, 
        //     total: data.total 
        // })}, 1000)
    }

    renderList= () =>{
        if(this.state.isLoading){
           return  <Spin tip="Loading...">
                        <Alert
                        message="Yange Shuai"
                        description="Further details about the context of this alert."
                        type="info"
                        />
                    </Spin>
        }else{
            return <div><div style={{display:'flex',flexWrap:'wrap'}}>{this.state.movies.map(item=>{
                return <MovieItem {...item} key={item.id} history={this.props.history}></MovieItem>
            })}</div>
            <div><Pagination defaultCurrent={this.state.nowPage} total={this.state.total} pageSize={this.state.pageSize} onChange={this.onChange}/></div></div>
        }
    }

    onChange=(page)=>{
        this.props.history.push('/Movie/'+this.state.movieType+'/'+page+'')
    }
}

