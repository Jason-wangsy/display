import React from 'react'
import { HashRouter as Router, Route, Link } from "react-router-dom";
import { Layout, Menu, Breadcrumb } from 'antd';

function About() {
    return <h2>About</h2>;
  }

const { Header, Content, Footer } = Layout;
import styles from './css/app.scss'

import HomeContainer from './components/Home/Home.jsx'
import MovieContainer from './components/Movie/Movie.jsx'
import AboutContainer from './components/About/About.jsx'

export default class App extends React.Component{
    constructor(props){
        super(props)

        this.state = {

        }
    }

    render(){
        return <Router>
            <Layout className="layout" style={{height:'100%'}}>
                <Header>
                <div className={styles.logo} />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={[window.location.hash.split('/')[1]]}
                    style={{ lineHeight: '64px' }}
                >
                    <Menu.Item key="Home">
                    <Link to="/Home">首页</Link>
                    </Menu.Item>
                    <Menu.Item key="Movie">
                    <Link to='/Movie/in_theaters/1'>电影</Link>
                    </Menu.Item>
                    <Menu.Item key="About">
                    <Link to='/About'>关于</Link>
                    </Menu.Item>
                </Menu>
                </Header>
                <Content style={{ padding: '0 50px',backgroundColor:'#fff',height:'100%' }}>
                    <Route path={["/Home", "/"]} exact component={HomeContainer} />
                    <Route path="/Movie" component={MovieContainer} />
                    <Route path="/About" component={AboutContainer} />
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                Yan ge ©2019 Created by Ant UED
                </Footer>
            </Layout>
        </Router> 
    }
}