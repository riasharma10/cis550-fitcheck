import React from 'react';
import { Form, FormInput, FormGroup, Button} from "shards-react";

import {
    Table,
    Pagination,
    Select,
    Row,
    Col,
    Divider,
} from 'antd'




import MenuBar from '../components/MenuBar';
import { getInfoQuery1Search, getInfoQuery2Search, getInfoQuery3Search} from '../fetcher'

const infoQuery1Columns = [
    {
        title: 'Purposes',
        dataIndex: 'rented_for',
        key: 'rented_for',
        sorter: (a, b) => a.rented_for.localeCompare(b.rented_for)
    }
];

const infoQuery2Columns = [
    {
        title: 'Review',
        dataIndex: 'Review',
        key: 'Review',
        sorter: (a, b) => a.Review.localeCompare(b.Review)
    },

    {
        title: 'Fit',
        dataIndex: 'Fit',
        key: 'Fit',
        sorter: (a, b) => a.Fit.localeCompare(b.Fit)
    }
];

const infoQuery3Columns = [
    {
        title: 'Average Rating',
        dataIndex: 'avg_rating',
        key: 'avg_rating'
    }
];


class ProductInfoPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            item_id1Query: '',
            size1Query: '',
            item_id2Query: '',
            rating2Query: '',
            item_id3Query: '',
            size3Query: '',
            
            query1Results: [],
            query2Results: [],
            query3Results: []

        }

        this.updateSearchResults1 = this.updateSearchResults1.bind(this)
        this.updateSearchResults2 = this.updateSearchResults2.bind(this)
        this.updateSearchResults3 = this.updateSearchResults3.bind(this)

        this.handleItemId1QueryChange = this.handleItemId1QueryChange.bind(this)
        this.handleSize1QueryChange = this.handleSize1QueryChange.bind(this)
        this.handleItemId2QueryChange = this.handleItemId2QueryChange.bind(this)
        this.handleRating2QueryChange = this.handleRating2QueryChange.bind(this)
        this.handleItemId3QueryChange = this.handleItemId3QueryChange.bind(this)
        this.handleSize3QueryChange = this.handleSize3QueryChange.bind(this)
    }

    handleItemId1QueryChange(event) {
        console.log("item_id1 is changing: ", event.target.value)
        this.setState({ item_id1Query: event.target.value })
    }

    handleSize1QueryChange(event) {
        console.log("size1 is changing: ", event.target.value)
        this.setState({ size1Query: event.target.value })
    }

    handleItemId2QueryChange(event) {
        console.log("item_id2 is changing: ", event.target.value)
        this.setState({ item_id2Query: event.target.value })
    }

    handleRating2QueryChange(event) {
        console.log("rating2 is changing: ", event.target.value)
        this.setState({ rating2Query: event.target.value })
    }

    handleItemId3QueryChange(event) {
        console.log("item_id3 is changing: ", event.target.value)
        this.setState({ item_id3Query: event.target.value })
    }

    handleSize3QueryChange(event) {
        console.log("size3 is changing: ", event.target.value)
        this.setState({ size3Query: event.target.value })
    }

    //NEW STUFF

    updateSearchResults1() {

        getInfoQuery1Search(this.state.item_id1Query, this.state.size1Query, 1).then(res => {
            this.setState({ query1Results: res.results })
        })
    }

    updateSearchResults2() {

        getInfoQuery2Search(this.state.item_id2Query, this.state.rating2Query, 1).then(res => {
            this.setState({ query2Results: res.results })
        })
    }

    updateSearchResults3() {

        getInfoQuery3Search(this.state.item_id3Query, this.state.size3Query, 1).then(res => {
            this.setState({ query3Results: res.results })
        })
    }

    //HOW DO I SEPARATE THIS OUT FOR 3?
    componentDidMount() {
        getInfoQuery1Search(this.state.item_id1Query, this.state.size1Query, 1).then(res => {
            this.setState({ query1Results: res.results })
        })

        getInfoQuery2Search(this.state.item_id2Query, this.state.rating2Query, 1).then(res => {
            this.setState({ query2Results: res.results })
        })

        getInfoQuery3Search(this.state.item_id3Query, this.state.size3Query, 1).then(res => {
            this.setState({ query3Results: res.results })
        })

    }

    render() {
        const blueText = {color: '#1e8d9e'}
        return (

            <div>

                <MenuBar />
                <div style={{ width: '80vw', margin: '0 auto', marginTop: '2vh' }}>
                <h3 style = {blueText}>For what purpose was this item rented for?</h3>
                </div>
                <table>
                    <tr>
                        <td>
                        <div style={{ width: '10vw', margin: '0 auto', marginTop: '2vh' }}>
                            </div>
                        </td>
                        <td>
                        <Form style={{ width: '20vw', margin: '0 auto', marginTop: '5vh' }}>
                    <Row>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Item ID (Rent the Runway)</label>
                            <FormInput placeholder="Item ID" value={this.state.item_id1Query} onChange={this.handleItemId1QueryChange} />
                        </FormGroup></Col>

                    </Row>
                    <Row>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Size</label>
                            <FormInput placeholder="Size (number)" value={this.state.size1Query} onChange={this.handleSize1QueryChange} />
                        </FormGroup></Col>
                    </Row>
                    <Row>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <Button outline pill theme = "danger" style={{ marginTop: '4vh' }} onClick={this.updateSearchResults1}>Find out!</Button>
                        </FormGroup></Col>
                    </Row>

                </Form>
                        </td>
                        <td>
                        <div style={{ width: '10vw', margin: '0 auto', marginTop: '2vh' }}>
                            </div>
                        </td>
                        <td><div style={{ width: '50vw', margin: '0 auto', marginTop: '2vh' }}>
                            <Table dataSource={this.state.query1Results} columns={infoQuery1Columns} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5, showQuickJumper:true }}/></div></td>
                    </tr>
                </table>

                <div style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }}>
                
                </div>

                <Divider />
                <div style={{ width: '80vw', margin: '0 auto', marginTop: '2vh' }}>
                    <h3 style = {blueText}>What was the fit and reviews for this item for customers giving it this rating?</h3>
                </div>

                <table>
                    <tr>
                        <td><div style={{ width: '10vw', margin: '0 auto', marginTop: '2vh' }}>
                
                </div></td>
                        <td><Form style={{ width: '20vw', margin: '0 auto', marginTop: '5vh' }}>
                <Row>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Item ID (Rent the Runway)</label>
                            <FormInput placeholder="Item ID" value={this.state.item_id2Query} onChange={this.handleItemId2QueryChange} />
                        </FormGroup></Col>

                    </Row>
                    <Row>
                    <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Rating</label>
                            <FormInput placeholder="Rating (number 1 - 10)" value={this.state.rating2Query} onChange={this.handleRating2QueryChange} />
                        </FormGroup></Col>
                    </Row>
                    <Row>
                    <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <Button outline pill theme = "danger" style={{ marginTop: '4vh' }} onClick={this.updateSearchResults2}>Find out!</Button>
                        </FormGroup></Col>
                    </Row>
                </Form></td>
                <td><div style={{ width: '10vw', margin: '0 auto', marginTop: '2vh' }}>
                
                </div></td>
                        <td><div style={{ width: '50vw', margin: '0 auto', marginTop: '2vh' }}>
                <Table dataSource={this.state.query2Results} columns={infoQuery2Columns} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5, showQuickJumper:true }}/>
                                </div></td>
                    </tr>
                </table>


                <Divider />

                <div style={{ width: '80vw', margin: '0 auto', marginTop: '2vh' }}>
                    <h3 style = {blueText}>What was the average rating for this product?</h3>
                </div>
                <table>
                    <tr>
                        <td><div style={{ width: '10vw', margin: '0 auto', marginTop: '2vh' }}>
                        </div></td>
                        <td><Form style={{ width: '20vw', margin: '0 auto', marginTop: '5vh' }}>
                    <Row>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Item ID (ModCloth)</label>
                            <FormInput placeholder="Item ID" value={this.state.item_id3Query} onChange={this.handleItemId3QueryChange} />
                        </FormGroup></Col>
                    </Row>
                    <Row><Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Size</label>
                            <FormInput placeholder="Size (number)" value={this.state.size3Query} onChange={this.handleSize3QueryChange} />
                        </FormGroup></Col></Row>
                    <Row><Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <Button outline pill theme = "danger" style={{ marginTop: '4vh' }} onClick={this.updateSearchResults3}>Find out!</Button>
                        </FormGroup></Col></Row>
                </Form></td>
                        <td><div style={{ width: '10vw', margin: '0 auto', marginTop: '2vh' }}>
                        </div></td>
                        <td><div style={{ width: '50vw', margin: '0 auto', marginTop: '2vh' }}>
                <Table dataSource={this.state.query3Results} columns={infoQuery3Columns} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5, showQuickJumper:true }}/>
                                </div></td>
                    </tr>
                </table>

                <Divider />

            </div>
        )
    }
}

export default ProductInfoPage

