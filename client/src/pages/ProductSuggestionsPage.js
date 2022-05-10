import React from 'react';
import { Form, FormInput, FormGroup, Button} from "shards-react";

import {
    Table,
    Pagination,
    Select,
    Row,
    Col,
    Divider,
    Slider,
} from 'antd'
import { format } from 'd3-format';





import MenuBar from '../components/MenuBar';
import {getProductSuggestions, getBodyTypeCounts, getTopProductsByCategorySize } from '../fetcher'

const { Option } = Select;

// getProductSuggestions returns item_id, fit feedback, review summary, and rating
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
];

// getBodyTypeCounts returns body types with their respective sizes
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
];

// getTopProductsByCategorySize returns item ids as well as their ratings
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

    

    handleBodyTypeQueryChange(value) {
        this.setState({ bodyTypeQuery: value })
    }

    handleBustQueryChange(value) {
        this.setState({bustQuery: value})
    }

    handleAgeChange(value) {
        this.setState({ ageLowQuery: value[0] })
        this.setState({ ageHighQuery: value[1] })
    }

    handleCategoryQueryChange(value) {
        this.setState({ categoryQuery: value })
    }

    handleSizeQueryChange(event) {
        this.setState({ sizeQuery: event.target.value })
    }

    updateSearchResults() {
        getProductSuggestions(this.state.bodyTypeQuery, this.state.bustQuery, this.state.ageHighQuery, this.state.ageLowQuery, 1).then(res => {
            this.setState({ productSuggestionsResults: res.results })
        })
    }

    updateSearch2Results() {
        getBodyTypeCounts(1).then(res => {
            this.setState({ query2results: res.results })
        })
    }

    updateSearch3Results() {
        getTopProductsByCategorySize(this.state.categoryQuery, this.state.sizeQuery, 1).then(res => {
            this.setState({ query3results: res.results })
        })
    }

    componentDidMount() {

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
                    <Col flex={2}>
                    
                    <Select defaultValue="hourglass" style={{ width: '20vw' }} onChange={this.handleBodyTypeQueryChange}>
                        <Option value="hourglass">Hourglass</Option>
                        <Option value="petite">Petite</Option>
                        <Option value="athletic">Athletic</Option>
                        <Option value="straight & narrow">Straight & Narrow</Option>
                        <Option value="full bust">Full Bust</Option>
                        <Option value="pear">Pear</Option>
                        <Option value="apple">Apple</Option>
                    </Select>
                    </Col>
                        
                    </Row>
                    <br></br>
                    <Row>
                        <Col flex={2}>
                            
                            <Select defaultValue="32d" style={{ width: '20vw' }} onChange={this.handleBustQueryChange}>
                                <Option value="32d">32d</Option>
                                <Option value="32b">32b</Option>
                                <Option value="32c">32c</Option>
                                <Option value="32d">32d</Option>
                                <Option value="36dd">34dd</Option>
                                <Option value="34a">34a</Option>
                                <Option value="34b">34b</Option>
                                <Option value="34c">34c</Option>
                                <Option value="34d">34d</Option>
                                <Option value="34dd">34dd</Option>
                                <Option value="34g">34g</Option>
                                <Option value="36a">34a</Option>
                                <Option value="36b">34d</Option>
                                <Option value="36c">34d</Option>
                                <Option value="36d">34d</Option>
                                <Option value="36d+">34d+</Option>
                                <Option value="38c">38c</Option>
                                <Option value="38d">38d</Option>


                            </Select>
                            </Col>
                    
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
                        <Col flex={2}>
                        
                        <Select defaultValue="dresses" style={{ width: '20vw' }} onChange={this.handleCategoryQueryChange}>
                            <Option value="dresses">Dresses</Option>
                            <Option value="wedding">Wedding</Option>
                            <Option value="tops">Tops</Option>
                            <Option value="bottoms">Bottoms</Option>
                            <Option value="shift">Shift</Option>
                            <Option value="outerwear">Outerwear</Option>
                        </Select>
                        </Col>
                    </Row>
                    <br></br>
                    <Row>
                    <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Size (number from 0 to 40)</label>
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

