import React from 'react';
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
import { Form, FormInput, FormGroup, Button, Card, CardBody, CardTitle, Progress } from "shards-react";


import MenuBar from '../components/MenuBar';
import { getCategoriesHelpful, getProductsFromKeywords } from '../fetcher'
const { Column, ColumnGroup } = Table;
const { Option } = Select;


const productColumns = [
  {
    title: 'Title',
    dataIndex: 'ProductTitle',
    key: 'ProductTitle',
    sorter: (a, b) => a.ProductTitle.localeCompare(b.ProductTitle),
  },
  {
    title: 'Rating',
    dataIndex: 'AvgRating',
    key: 'AvgRating',
    sorter: (a, b) => a.AvgRating.localeCompare(b.AvgRating)
  },
  {
    title: 'Image',
    dataIndex: 'image',
    key: 'image',
    
  },
];

class HomePage extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      categoryResults: [],
      keywordResults: [],
      matchesPageNumber: 1,
      matchesPageSize: 10,
      playersResults: [],
      pagination: null,
      keyWord1Query: '',
      keyWord2Query: '',
      priceLowQuery: 0,
      priceHighQuery: 0,
    }

    this.leagueOnChange = this.leagueOnChange.bind(this)
    this.goToMatch = this.goToMatch.bind(this)

    this.keywordOnChange = this.keywordOnChange.bind(this)
    this.handlePriceChange = this.handlePriceChange.bind(this)
    this.handleKeyWord1QueryChange = this.handleKeyWord1QueryChange.bind(this)
    this.handleKeyWord2QueryChange = this.handleKeyWord2QueryChange.bind(this)
  }


  goToMatch(matchId) {
    window.location = `/matches?id=${matchId}`
  }


  leagueOnChange(value) {
    // TASK 2: this value should be used as a parameter to call getAllMatches in fetcher.js with the parameters page and pageSize set to null
    // then, matchesResults in state should be set to the results returned - see a similar function call in componentDidMount()

    getCategoriesHelpful(1, null, value).then(res => {
      this.setState({ categoryResults: res.results})
      console.log("results", res.results)
    })
    
  }

  keywordOnChange() {
    console.log("keyword on change function")
    getProductsFromKeywords(1, this.state.keyWord1Query, this.state.keyWord2Query, this.state.priceLowQuery, this.state.priceHighQuery).then(res => {
      this.setState({ keywordResults: res.results})
      console.log("keyword results", res.results)
    })
    
  }

  handlePriceChange(value) {
    this.setState({ priceLowQuery: value[0] })
    this.setState({ priceHighQuery: value[1] })
  }

  handleKeyWord1QueryChange(event) {
    console.log("keyword1 is changing: ", event.target.value)
    this.setState({keyWord1Query: event.target.value})
  }

  handleKeyWord2QueryChange(event) {
    console.log("keyword2 is changing: ", event.target.value)
    this.setState({keyWord2Query: event.target.value})
  }


  componentDidMount() {
    getCategoriesHelpful(1, null, 'Women').then(res => {
      this.setState({categoryResults: res.results })
    })

    getProductsFromKeywords(1, "pretty", "nice", 0, 100).then(res => {
      this.setState({ keywordResults: res.results})
      console.log("results", res.results)
    })
    
  }



  render() {

    return (
      <div>
        <MenuBar />
        <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
          
          <h3>Players</h3>
          <Table dataSource={this.state.playersResults} columns={productColumns} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5, showQuickJumper:true }}/>
        </div>
        <div style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }}>
          <h3>Matches</h3>
          <Select defaultValue="Women" style={{ width: 120 }} onChange={this.leagueOnChange}>
            <Option value="Novelty, Costumes & More">Novelty, Costumes & More</Option>
             {/* TASK 3: Take a look at Dataset Information.md from MS1 and add other options to the selector here  */}
             <Option value="Girls">Girls</Option>
             <Option value="Sports">Sports</Option>
             <Option value="Men">Men</Option>
             <Option value="Clothing">Clothing</Option>
             <Option value="New Arrivals">New Arrivals</Option>
             <Option value="Accessories">Accessories</Option>
             <Option value="Gemstones">Gemstones</Option>
             <Option value="Jewelry">Jewelry</Option>
             <Option value="Luggage & Travel Gear">Luggage & Travel Gear</Option>
          </Select>
          <Table onRow={(record, rowIndex) => {
    return {
      onClick: event => {this.goToMatch(record.MatchId)}, // clicking a row takes the user to a detailed view of the match in the /matches page using the MatchId parameter  
    };
  }} dataSource={this.state.categoryResults} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5, showQuickJumper:true }}>
            <ColumnGroup title="Teams">
              {/* TASK 4: correct the title for the 'Home' column and add a similar column for 'Away' team in this ColumnGroup */}
              <Column title="ASIN" dataIndex="asin" key="asin" sorter= {(a, b) => a.asin.localeCompare(b.asin)}/>
              <Column title="TITLE" dataIndex="title" key="title" sorter= {(a, b) => a.avg_rating.localeCompare(b.avg_rating)}/>
              <Column title="AVG_RATING" dataIndex="avg_rating" key="avg_rating" sorter= {(a, b) => a.title.localeCompare(b.title)}/>
            </ColumnGroup>
            
             {/* TASK 6: create two columns (independent - not in a column group) for the date and time. Do not add a sorting functionality */}
             <Column title="Date" dataIndex="Date" key="Date" />
             <Column title="Time" dataIndex="Time" key="Time" />
          </Table>

        </div>

        <div style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }}>
        <h3>Best Related Products by Review</h3>
        <Row gutter='30' align='middle' justify='center'>
            <Col flex={2}><FormGroup style={{ width: '15vw', margin: '0 auto' }}>
                <label>Keyword 1</label>
                <FormInput placeholder="Keyword" value={this.state.keyWord1Query} onChange={this.handleKeyWord1QueryChange} />
            </FormGroup></Col>
            <Col flex={2}><FormGroup style={{ width: '15vw', margin: '0 auto' }}>
                <label>Keyword 2</label>
                <FormInput placeholder="Keyword" value={this.state.keyWord2Query} onChange={this.handleKeyWord2QueryChange} />
            </FormGroup></Col>
            <Col flex={2}><FormGroup style={{ width: '15vw', margin: '0 auto' }}>
                <label>Price</label>
                <Slider range defaultValue={[1, 300]} onChange={this.handlePriceChange} />
            </FormGroup></Col>
            <Col flex={2}><FormGroup style={{ width: '10vw' }}>
                            <Button style={{ marginTop: '4vh' }} onClick={this.keywordOnChange}>Search</Button>
                        </FormGroup></Col>
            
        </Row>

        <div style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }}>
                
                <Table dataSource={this.state.keywordResults} columns={productColumns} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5, showQuickJumper:true }}/>
                                </div>


        </div>


      </div>
    )
  }

}

export default HomePage

