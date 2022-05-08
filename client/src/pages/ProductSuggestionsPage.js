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
        this.handleBodyTypeQueryChange = this.handleBodyTypeQueryChange.bind(this)
        this.handleBustQueryChange = this.handleBustQueryChange.bind(this)
        this.handleAgeChange = this.handleAgeChange.bind(this)
        this.handleCategoryChange = this.handleCategoryChange.bind(this)
        this.handleSizeChange = this.handleSizeChange.bind(this)
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
            console.log(res.results);
            this.setState({ productSuggestionsResults: res.results })
        })
    }

    componentDidMount() {
        getProductSuggestions(this.state.bodyTypeQuery, this.state.bustQuery, this.state.ageHighQuery, this.state.ageLowQuery, 1).then(res => {
            this.setState({ productSuggestionsResults: res.results })
        })

        getBodyTypeCounts(1).then(res => {
            this.setState({ query2results: res.results })
        })

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
        return (

            <div>

                <MenuBar />
                <Form style={{ width: '80vw', margin: '0 auto', marginTop: '5vh' }}>
                    <Row>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>BodyType</label>
                            <FormInput placeholder="BodyType" value={this.state.bodyTypeQuery} onChange={this.handleBodyTypeQueryChange} />
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Bust</label>
                            <FormInput placeholder="Bust" value={this.state.bustQuery} onChange={this.handleBustQueryChange} />
                        </FormGroup></Col>
                        {/* TASK 26: Create a column for Club, using the elements and style we followed in the above two columns. Use the onChange method (handleClubQueryChange)  */}
                    </Row>
                    <br></br>
                    <Row>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Age</label>
                            <Slider range defaultValue={[50, 100]} onChange={this.handleAgeChange} />

                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '10vw' }}>
                            <Button style={{ marginTop: '4vh' }} onClick={this.updateSearchResults}>Search</Button>
                        </FormGroup></Col>
                    </Row>


                </Form>
                <Divider />
                {/* TASK 24: Copy in the players table from the Home page, but use the following style tag: style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }} - this should be one line of code! */}
                
                <div style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }}>
                <h3>Product Suggestions</h3>
                <Table dataSource={this.state.productSuggestionsResults} columns={query1Columns} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5, showQuickJumper:true }}/>
                                </div>


                <Divider />
                <div style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }}>
                <h3>Body Type Counts</h3>
                <Table dataSource={this.state.query2results} columns={query2Columns} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5, showQuickJumper:true }}/>
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

export default ProductSuggestionsPage

