import React from 'react';
import { Form, FormInput, FormGroup, Button, Card, CardBody, CardTitle, Progress } from "shards-react";

import {
    Table,
    Pagination,
    Select,
    Row,
    Col,
    Divider,
    Slider,
    Rate 
} from 'antd'
import { RadarChart } from 'react-vis';
import { format } from 'd3-format';




import MenuBar from '../components/MenuBar';
import { getPlayerSearch, getPlayer, getProductSuggestions, getBodyTypeCounts, getTopProductsByCategorySize } from '../fetcher'
import HomePage from './HomePage';
const wideFormat = format('.3r');

const query1Columns = [
    {
        title: 'item_id',
        dataIndex: 'item_id',
        key: 'item_id',
        sorter: (a, b) => a.item_id - b.item_id
    },
    {
        title: 'fit',
        dataIndex: 'fit',
        key: 'fit',
        sorter: (a, b) => a.fit.localeCompare(b.fit)
    },
    {
        title: 'review_summary',
        dataIndex: 'review_summary',
        key: 'review_summary',
        sorter: (a, b) => a.review_summary.localeCompare(b.review_summary)
    },
    {
        title: 'rating',
        dataIndex: 'rating',
        key: 'rating',
        sorter: (a, b) => a.rating - b.rating
        
      }
    // TASK 19: copy over your answers for tasks 7 - 9 to add columns for potential, club, and value
];

const query2Columns = [
    {
        title: 'body_type',
        dataIndex: 'body_type',
        key: 'body_type',
        sorter: (a, b) => a.body_type.localeCompare(b.body_type)
    },
    {
        title: 'num',
        dataIndex: 'num',
        key: 'num',
        sorter: (a, b) => a.num - b.num
    }
    // TASK 19: copy over your answers for tasks 7 - 9 to add columns for potential, club, and value
];

const query3Columns = [
    {
        title: 'item_id',
        dataIndex: 'item_id',
        key: 'item_id',
        sorter: (a, b) => a.item_id - b.item_id
    },
    {
        title: 'rating',
        dataIndex: 'rating',
        key: 'rating',
        sorter: (a, b) => a.rating - b.rating
    }
    // TASK 19: copy over your answers for tasks 7 - 9 to add columns for potential, club, and value
];


class ProductSuggestionsPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            bodyTypeQuery: '',
            bustQuery: '',
            ageHighQuery: 100,
            ageLowQuery: 0,
            categoryQuery: '',
            sizeQuery: '',
            //selectedPlayerId: window.location.search ? window.location.search.substring(1).split('=')[1] : 229594,
            //selectedPlayerDetails: null,
            productSuggestionsResults: [],
            query2results: [],
            query3results: []

        }

        this.updateSearchResults = this.updateSearchResults.bind(this)
        this.updateSearch2Results = this.updateSearch2Results.bind(this)
        this.updateSearch3Results = this.updateSearch3Results.bind(this)
        this.handleBodyTypeQueryChange = this.handleBodyTypeQueryChange.bind(this)
        this.handleBustQueryChange = this.handleBustQueryChange.bind(this)
        this.handleAgeChange = this.handleAgeChange.bind(this)
        this.handleCategoryQueryChange = this.handleCategoryQueryChange.bind(this)
        this.handleSizeQueryChange = this.handleSizeQueryChange.bind(this)
    }

    

    handleBodyTypeQueryChange(event) {
        this.setState({ bodyTypeQuery: event.target.value })
    }

    handleBustQueryChange(event) {
        // TASK 20: update state variables appropriately. See handleNameQueryChange(event) for reference
        this.setState({bustQuery: event.target.value})
    }

    handleAgeChange(value) {
        this.setState({ ageLowQuery: value[0] })
        this.setState({ ageHighQuery: value[1] })
    }

    handleCategoryQueryChange(event) {
        this.setState({ categoryQuery: event.target.value })
    }

    handleSizeQueryChange(event) {
        this.setState({ sizeQuery: event.target.value })
    }

    updateSearchResults() {

        //TASK 23: call getPlayerSearch and update playerResults in state. See componentDidMount() for a hint
        getProductSuggestions(this.state.bodyTypeQuery, this.state.bustQuery, this.state.ageHighQuery, this.state.ageLowQuery, 1).then(res => {
            this.setState({ productSuggestionsResults: res.results })
        })
    }

    updateSearch2Results() {

        //TASK 23: call getPlayerSearch and update playerResults in state. See componentDidMount() for a hint
        getBodyTypeCounts(1).then(res => {
            this.setState({ query2results: res.results })
        })
    }

    updateSearch3Results() {

        //TASK 23: call getPlayerSearch and update playerResults in state. See componentDidMount() for a hint
        getTopProductsByCategorySize(this.state.categoryQuery, this.state.sizeQuery, 1).then(res => {
            this.setState({ query3results: res.results })
        })
    }

    componentDidMount() {
        

        // TASK 25: call getPlayer with the appropriate parameter and set update the correct state variable. 
        // See the usage of getMatch in the componentDidMount method of MatchesPage for a hint! 
        /*
        getPlayer(this.state.selectedPlayerId).then(res => {
            console.log("selected player details", res.results)
            this.setState({ selectedPlayerDetails: res.results[0] })
        })
        */

    }

    render() {
        const blueText = {color: '#1e8d9e'}
        return (

            <div>

                <MenuBar />

                <div style={{ width: '80vw', margin: '0 auto', marginTop: '2vh' }}>
                    <h3 style={blueText}>Do you want personalized product suggestions based on reviews from customers with similar body types, bust sizes, and/or ages?</h3>
                </div>

                <table>
                    <tr>
                        <td><div style={{ width: '10vw', margin: '0 auto', marginTop: '2vh' }}>
                            </div></td>
                        <td><Form style={{ width: '20vw', margin: '0 auto', marginTop: '5vh' }}>
                    <Row>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>BodyType</label>
                            <FormInput placeholder="BodyType" value={this.state.bodyTypeQuery} onChange={this.handleBodyTypeQueryChange} />
                        </FormGroup></Col>
                    </Row>
                    <br></br>
                    <Row>
                    <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Bust</label>
                            <FormInput placeholder="Bust" value={this.state.bustQuery} onChange={this.handleBustQueryChange} />
                        </FormGroup></Col>
                    </Row>
                    <br></br>
                    <Row>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Age</label>
                            <Slider range defaultValue={[50, 100]} onChange={this.handleAgeChange} />

                        </FormGroup></Col>
                        
                    </Row>
                    <br></br>
                    <Row>
                    <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <Button outline pill theme = "danger" style={{ marginTop: '4vh' }} onClick={this.updateSearchResults}>Click Me!</Button>
                        </FormGroup></Col>
                    </Row>

                </Form></td>
                        <td><div style={{ width: '10vw', margin: '0 auto', marginTop: '2vh' }}>
                            </div></td>
                        <td><div style={{ width: '50vw', margin: '0 auto', marginTop: '2vh' }}>
                        <Table dataSource={this.state.productSuggestionsResults} columns={query1Columns} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5, showQuickJumper:true }}/></div>
                        </td>
                    </tr>
                </table>


                <Divider />
                <div style={{ width: '80vw', margin: '0 auto', marginTop: '2vh' }}>
                    <h3 style={blueText}>Do you want to know how many distinct sizes customers of each body type have purchased?</h3>
                </div>
                <table>
                    <tr>
                        <td><div style={{ width: '10vw', margin: '0 auto', marginTop: '2vh' }}>
                            </div></td>
                        <td><Form style={{ width: '20vw', margin: '0 auto', marginTop: '2vh' }}>
                    <Row>
                    <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <Button outline pill theme = "danger" style={{ marginTop: '1vh' }} onClick={this.updateSearch2Results}>Click Me!</Button>
                        </FormGroup></Col>
                    </Row>
                </Form></td>
                        <td><div style={{ width: '10vw', margin: '0 auto', marginTop: '2vh' }}>
                            </div></td>
                        <td><div style={{ width: '50vw', margin: '0 auto', marginTop: '2vh' }}>
                        <Table dataSource={this.state.query2results} columns={query2Columns} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5, showQuickJumper:true }}/>
                            </div></td>
                    </tr>
                </table>
                                
                <Divider />

                <div style={{ width: '80vw', margin: '0 auto', marginTop: '2vh' }}>
                    <h3 style={blueText}>Do you want to see the top 100 products for a certain category and size? </h3>
                </div>

                <table>
                    <tr>
                        <td><div style={{ width: '10vw', margin: '0 auto', marginTop: '2vh' }}>
                            </div></td>
                        <td>
                        <Form style={{ width: '20vw', margin: '0 auto', marginTop: '5vh' }}>
                    <Row>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Category</label>
                            <FormInput placeholder="Category" value={this.state.categoryQuery} onChange={this.handleCategoryQueryChange} />
                        </FormGroup></Col>
                    </Row>
                    <Row>
                    <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Size</label>
                            <FormInput placeholder="Size" value={this.state.sizeQuery} onChange={this.handleSizeQueryChange} />
                        </FormGroup></Col>
                    </Row>
                    <Row>
                    <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <Button outline pill theme = "danger" style={{ marginTop: '4vh' }} onClick={this.updateSearch3Results}>Click Me!</Button>
                        </FormGroup></Col>
                    </Row>
                </Form>
                        </td>
                        <td><div style={{ width: '10vw', margin: '0 auto', marginTop: '2vh' }}>
                            </div></td>
                        <td>
                        <div style={{ width: '50vw', margin: '0 auto', marginTop: '2vh' }}>
                        <Table dataSource={this.state.query3results} columns={query3Columns} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5, showQuickJumper:true }}/>
                            </div>
                        </td>
                    </tr>
                </table>

                
                <Divider />

            </div>
        )
    }
}

export default ProductSuggestionsPage

