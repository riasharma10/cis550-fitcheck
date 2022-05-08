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
import { getPlayerSearch, getPlayer } from '../fetcher'
import { getInfoQuery1Search} from '../fetcher'
import HomePage from './HomePage';
const wideFormat = format('.3r');

const playerColumns = [
    {
        title: 'Name',
        dataIndex: 'Name',
        key: 'Name',
        sorter: (a, b) => a.Name.localeCompare(b.Name),
        render: (text, row) => <a href={`/players?id=${row.PlayerId}`}>{text}</a>
    },
    {
        title: 'Nationality',
        dataIndex: 'Nationality',
        key: 'Nationality',
        sorter: (a, b) => a.Nationality.localeCompare(b.Nationality)
    },
    {
        title: 'Rating',
        dataIndex: 'Rating',
        key: 'Rating',
        sorter: (a, b) => a.Rating - b.Rating

    },
    {
        title: 'Potential',
        dataIndex: 'Potential',
        key: 'Potential',
        sorter: (a, b) => a.Potential - b.Potential
        
      },
      {
        title: 'Club',
        dataIndex: 'Club',
        key: 'Club',
        sorter: (a, b) => a.Club.localeCompare(b.Club),
        
      },
      {
        title: 'Value',
        dataIndex: 'Value',
        key: 'Value',    
      },
    // TASK 19: copy over your answers for tasks 7 - 9 to add columns for potential, club, and value
];

const infoQuery1Columns = [
    {
        title: 'rented_for',
        dataIndex: 'rented_for',
        key: 'rented_for',
        sorter: (a, b) => a.rented_for.localeCompare(b.rented_for)
    }
];


class ProductInfoPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            nameQuery: '',
            nationalityQuery: '',
            clubQuery: '',
            ratingHighQuery: 100,
            ratingLowQuery: 0,
            potHighQuery: 100,
            potLowQuery: 0,
            selectedPlayerId: window.location.search ? window.location.search.substring(1).split('=')[1] : 229594,
            selectedPlayerDetails: null,
            playersResults: [],

            // NEW STUFF

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
        console.log("item_id33 is changing: ", event.target.value)
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

    //HOW DO I SEPARATE THIS OUT FOR 3?
    componentDidMount() {
        getInfoQuery1Search(this.state.item_id1Query, this.state.size1Query, 1).then(res => {
            this.setState({ query1Results: res.results })
        })

        // TASK 25: call getPlayer with the appropriate parameter and set update the correct state variable. 
        // See the usage of getMatch in the componentDidMount method of MatchesPage for a hint! 
        //getPlayer(this.state.selectedPlayerId).then(res => {
            //console.log("selected player details", res.results)
            //this.setState({ selectedPlayerDetails: res.results[0] })
        //})


    }

    render() {
        return (

            <div>

                <MenuBar />
                <Form style={{ width: '80vw', margin: '0 auto', marginTop: '5vh' }}>
                    <Row>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Item ID</label>
                            <FormInput placeholder="Item ID" value={this.state.item_id1Query} onChange={this.handleItemId1QueryChange} />
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Size</label>
                            <FormInput placeholder="Size" value={this.state.size1Query} onChange={this.handleSize1QueryChange} />
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '10vw' }}>
                            <Button style={{ marginTop: '4vh' }} onClick={this.updateSearchResults1}>Search</Button>
                        </FormGroup></Col>

                    </Row>


                </Form>
                <Divider />
                {/* TASK 24: Copy in the players table from the Home page, but use the following style tag: style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }} - this should be one line of code! */}
                
                <div style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }}>
                <h3>Purposes</h3>
                <Table dataSource={this.state.query1Results} columns={infoQuery1Columns} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5, showQuickJumper:true }}/>
                                </div>


                <Divider />

                {this.state.selectedPlayerDetails ? <div style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }}>
                    <Card>
                    
                        <CardBody>
                        <Row gutter='30' align='middle' justify='center'>
                            <Col flex={2} style={{ textAlign: 'left' }}>
                            <h3>{this.state.selectedPlayerDetails.Name}</h3>

                            </Col>

                            <Col flex={2} style={{ textAlign: 'right' }}>
                            <img src={this.state.selectedPlayerDetails.Photo} referrerpolicy="no-referrer" alt={null} style={{height:'15vh'}}/>

                            </Col>
                        </Row>
                            <Row gutter='30' align='middle' justify='left'>
                                <Col>
                                <h5>{this.state.selectedPlayerDetails.Club}</h5>
                                </Col>
                                <Col>
                                <h5>{this.state.selectedPlayerDetails.JerseyNumber}</h5>
                                </Col>
                                <Col>
                                <h5>{this.state.selectedPlayerDetails.BestPosition}</h5>
                                </Col>
                            </Row>
                            <br>
                            </br>
                            <Row gutter='30' align='middle' justify='left'>
                                <Col>
                                Age: {this.state.selectedPlayerDetails.Age}
                                </Col>
                                {/* TASK 28: add two more columns here for Height and Weight, with the appropriate labels as above */}
                                <Col>
                                Height: {this.state.selectedPlayerDetails.Height}
                                </Col>
                                <Col>
                                Weight: {this.state.selectedPlayerDetails.Weight}
                                </Col>
                                <Col flex={2} style={{ textAlign: 'right' }}>
                                {this.state.selectedPlayerDetails.Nationality}
                                    <img src={this.state.selectedPlayerDetails.Flag} referrerpolicy="no-referrer" alt={null} style={{height:'3vh', marginLeft: '1vw'}}/>
                                </Col>

                            </Row>
                            <Row gutter='30' align='middle' justify='left'>
                                <Col>
                                Value: {this.state.selectedPlayerDetails.Value}
                                </Col>
                                <Col>
                                Release Clause: {this.state.selectedPlayerDetails.ReleaseClause}
                                </Col>
                                {/* TASK 29: Create 2 additional columns for the attributes 'Wage' and 'Contract Valid Until' (use spaces between the words when labelling!) */}
                                <Col>
                                Wage: {this.state.selectedPlayerDetails.Wage}
                                </Col>
                                <Col>
                                Contract Valid Until: {this.state.selectedPlayerDetails.ContractValidUntil}
                                </Col>
                            </Row>
                        </CardBody>

                    </Card>

                    <Card style={{marginTop: '2vh'}}>
                        <CardBody>
                            <Row gutter='30' align='middle' justify='center'>
                            <Col flex={2} style={{ textAlign: 'left' }}>
                            <h6>Skill</h6>
                            <Rate disabled defaultValue={this.state.selectedPlayerDetails.Skill} />
                            <h6>Reputation</h6>
                            <Rate disabled defaultValue={this.state.selectedPlayerDetails.InternationalReputation} />
                            {/* TASK 30: create a star rating component for 'InternationalReputation'. Make sure you use the 'disabled' option as above to ensure it is read-only*/}
                            
                            <Divider/>
                            <h6>Best Rating</h6>
                                <Progress style={{ width: '20vw'}} value={this.state.selectedPlayerDetails.BestOverallRating} >{this.state.selectedPlayerDetails.BestOverallRating}</Progress>
                                {/* TASK 31: create the headings and progress bars for 'Potential' and 'Rating'. Use the same style as the one above for 'Best Rating'.*/}
                                <h6>Potential</h6>
                                <Progress style={{ width: '20vw'}} value={this.state.selectedPlayerDetails.Potential} >{this.state.selectedPlayerDetails.Potential}</Progress>
                                <h6>Rating</h6>
                                <Progress style={{ width: '20vw'}} value={this.state.selectedPlayerDetails.Rating} >{this.state.selectedPlayerDetails.Rating}</Progress>
                                </Col >
                                <Col  push={2} flex={2}>
                                {/*TASK 32: In case the player is a GK, show a radar chart (replacing 'null' below) with the labels: Agility, Ball Control, Passing, Positioning, Stamina, Strength */}

                                    {this.state.selectedPlayerDetails.BestPosition === 'GK'?
                                    <RadarChart
                                    data={[this.state.selectedPlayerDetails]}
                                    tickFormat={t => wideFormat(t)}
                                    startingAngle={0}
                                    domains={[
                                        { name: 'Penalties', domain: [0, 100], getValue: d => d.GKPenalties },
                                        { name: 'Diving', domain: [0, 100], getValue: d => d.GKDiving },
                                        { name: 'Handling', domain: [0, 100], getValue: d => d.GKHandling },
                                        { name: 'Kicking', domain: [0, 100], getValue: d => d.GKKicking },
                                        { name: 'Positioning', domain: [0, 100], getValue: d => d.GKPositioning },
                                        { name: 'Reflexes', domain: [0, 100], getValue: d => d.GKReflexes }
                                    ]}
                                    width={450}
                                    height={400}
                                    
                                />
                                    
                                    
                                    :<RadarChart
                                data={[this.state.selectedPlayerDetails]}
                                tickFormat={t => wideFormat(t)}
                                startingAngle={0}
                                domains={[
                                    { name: 'Agility', domain: [0, 100], getValue: d => d.NAdjustedAgility },
                                    { name: 'Ball Control', domain: [0, 100], getValue: d => d.NBallControl },
                                    { name: 'Passing', domain: [0, 100], getValue: d => d.NPassing },
                                    { name: 'Positioning', domain: [0, 100], getValue: d => d.NPositioning },
                                    { name: 'Stamina', domain: [0, 100], getValue: d => d.NStamina },
                                    { name: 'Strength', domain: [0, 100], getValue: d => d.NStrength }
                                ]}
                                width={450}
                                height={400}
                                
                            />}
                                
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>

                </div> : null}

            </div>
        )
    }
}

export default ProductInfoPage

