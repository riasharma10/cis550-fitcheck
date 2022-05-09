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




import MenuBar from '../components/MenuBar';
import { getCategoriesHelpful, getProductsFromKeywords, getRelatedProducts, getAboveRating } from '../fetcher'
const { Column, ColumnGroup } = Table;
const { Option } = Select;


//columns to be displayed with the first query on page (QUERY 7)
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
    title: 'Price',
    dataIndex: 'price',
    key: 'price'
  },
  {
    title: 'Review Text',
    dataIndex: 'review',
    key: 'review'
  }
];

//columns to be displayed with the third query on page (QUERY 9)
const relatedProductColumns = [
  {
    title: 'ASIN',
    dataIndex: 'asin',
    key: 'asin',
    sorter: (a, b) => a.ProductTitle.localeCompare(b.ProductTitle),
  },
  {
    title: 'Also Bought Item',
    dataIndex: 'alsoBought',
    key: 'alsoBought',
    sorter: (a, b) => a.alsoBought < b.alsoBought
  },
  {
    title: 'Also Viewed Item',
    dataIndex: 'alsoView',
    key: 'alsoView',
    
  },
  {
    title: 'Item Bought Together',
    dataIndex: 'boughtTogether',
    key: 'boughtTogether',
    
  },
  {
    title: 'Difference between Item Bought Together and Also Bought (in days)',
    dataIndex: 'Difference',
    key: 'Difference',
    sorter: (a, b) => a.Difference - b.Difference
    
  },
];

//columns to be displayed with the last query on page (QUERY 10)
const aboveRatingColumns = [
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
    sorter: (a, b) => a.title.localeCompare(b.title),
  },
  {
    title: 'Image',
    dataIndex: 'image',
    key: 'image',
    
  },
  {
    title: 'Brand',
    dataIndex: 'brand',
    key: 'brand',
    sorter: (a, b) => a.brand.localeCompare(b.brand),
    
  },
  {
    title: 'Rating',
    dataIndex: 'avg_rating',
    key: 'avg_rating',
    sorter: (a, b) => a.avg_rating.localeCompare(b.avg_rating),
    
  },

];

class HomePage extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      //state for the page
      categoryResults: [],
      keywordResults: [],
      relatedProductResults: [],
      aboveRatingResults: [],
      category: '',
      helpfulness: '',
      matchesPageNumber: 1,
      matchesPageSize: 10,
      playersResults: [],
      pagination: null,
      keyWord1Query: '',
      keyWord2Query: '',
      priceLowQuery: 0,
      priceHighQuery: 0,
      ratingLowQuery: 0,
      ratingHighQuery: 0,
      itemASIN: '',
      relatedCategory: '',
    }

    this.relatedProductsOnChange = this.relatedProductsOnChange.bind(this)
    this.handleRelatedCategoryChange = this.handleRelatedCategoryChange.bind(this)
    //for helpful category query 8
    this.categoryOnChange = this.categoryOnChange.bind(this)
    this.helpOnChange = this.helpOnChange.bind(this)
    this.updateSearchHelpfulCategory = this.updateSearchHelpfulCategory.bind(this)
    
    this.handleAboveRatingChance = this.handleAboveRatingChance.bind(this)

    this.aboveRatingChange = this.aboveRatingChange.bind(this)

    this.keywordOnChange = this.keywordOnChange.bind(this)
    this.handlePriceChange = this.handlePriceChange.bind(this)
    this.handleKeyWord1QueryChange = this.handleKeyWord1QueryChange.bind(this)
    this.handleKeyWord2QueryChange = this.handleKeyWord2QueryChange.bind(this)
  }


  
  
  //QUERY 8 
  //CATEGORY DROP DOWN: changes the category with the drop down
  categoryOnChange(value) {
    this.setState({category: value})
    console.log("category updated", this.state.category)
    console.log("category updated", value)
  }
  //HELPFULNESS DROP: changes the helpfulness based on dropdown value 
  helpOnChange(value) {
    this.setState({helpfulness: value})
    console.log("helpful updated", this.state.helpfulness)
    console.log("category updated", value)
  }
  //SEARCH: updates states to current and then searches for results
  updateSearchHelpfulCategory() {
    getCategoriesHelpful(1, this.state.helpfulness, this.state.category).then(res => {
      this.setState({ categoryResults: res.results})
      console.log("results", res.results)
    })
  }

  //KEYWORD1 INPUT: handles the user typing into the keyword1 spot
  handleKeyWord1QueryChange(event) {
    console.log("keyword1 is changing: ", event.target.value)
    this.setState({keyWord1Query: event.target.value})
  }

  //KEYWORD2 INPUT: handles the user typing into the keyword12spot
  handleKeyWord2QueryChange(event) {
    console.log("keyword2 is changing: ", event.target.value)
    this.setState({keyWord2Query: event.target.value})
  }

  //PRICE INPUT: handles the user sliding the price bar
  handlePriceChange(value) {
    this.setState({ priceLowQuery: value[0] })
    this.setState({ priceHighQuery: value[1] })
  }

  // updates and calls the route for QUERY 7 and puts results into the state
  keywordOnChange() {
    console.log("keyword on change function")
    getProductsFromKeywords(1, this.state.keyWord1Query, this.state.keyWord2Query, this.state.priceLowQuery, this.state.priceHighQuery).then(res => {
      this.setState({ keywordResults: res.results})
      console.log("keyword results", res.results)
    })
    
  }

  // handles the user typing in new category for QUERY 9
  handleRelatedCategoryChange(value) {
    this.setState({relatedCategory: value})
    console.log("related category updated", this.state.relatedCategory)
    console.log("related category updated", value)
  }

  // calls the route for QUERY 9 when user submits and updates state with the result
  relatedProductsOnChange() {
    
    getRelatedProducts(1, this.state.relatedCategory).then(res => {
      this.setState({ relatedProductResults: res.results})
      console.log("relatedProducts", res.results)
    })
    
  }
  
  // handles the user changing the lower rating for QUERY 10
  aboveRatingChange(value) {
    this.setState({ratingLowQuery: value})
    console.log("ratingLow updated", this.state.ratingLowQuery)
  }
  
  // calls the route for QUERY 10 and sets result to state
  handleAboveRatingChance() {
    console.log("above rating  on change function")
    getAboveRating(1, this.state.ratingLowQuery).then(res => {
      this.setState({ aboveRatingResults: res.results})
      console.log("above rating results", res.results)
    })
  }

  

  componentDidMount() {
    
    getCategoriesHelpful(1, 0.2, 'Women').then(res => {
      this.setState({ categoryResults: res.results })
      console.log("results: ", res.results)
    });

    
    getProductsFromKeywords(1, "greg", "zzz", 7, 15).then(res => {
      this.setState({ keywordResults: res.results})
      console.log("results", res.results)
    });
    
    
    getRelatedProducts(1, "Women").then(res => {
      this.setState({ relatedProductResults: res.results})
      console.log("relatedProducts", res.results)
    })
    
    
    getAboveRating(1, 3, 5).then(res => {
      this.setState({ aboveRatingResults: res.results})
      console.log("above rating", res.results)
    })
    
  }

  render() {
    const blueText = {color: '#1e8d9e'}

    return (
      <div>
        <MenuBar />
        <div style={{ width: '80vw', margin: '0 auto', marginTop: '2vh' }}>
          <h3 style = {blueText}>Products by Categories and Helpfulness</h3>
          </div>

         <table>
           <tr>
             <td><div style={{ width: '10vw', margin: '0 auto', marginTop: '2vh' }}>
              </div></td>
             <td><Row gutter='30' align='middle' justify='center'>
          {/* CATEGORY DROP DOWN*/}
            <Col flex={1}>
              <Select defaultValue="Women" style={{ width: 120 }} onChange={this.categoryOnChange}>
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
                <Option value="Travel">Luggage & Travel Gear</Option>
              </Select>
            </Col>
          
          </Row>

          <Row>
            {/* HELPFUL DROP DOWN*/}
            <Col style={{ marginTop: '2vh' }} flex={1}>
              <Select defaultValue="0" style={{ width: 120 }} onChange={this.helpOnChange}>
                <Option value="2">0</Option>
                {/* TASK 3: Take a look at Dataset Information.md from MS1 and add other options to the selector here  */}
                <Option value=".1">1</Option>
                <Option value=".2">2</Option>
                <Option value=".3">3</Option>
                <Option value=".4">4</Option>
                <Option value=".5">5</Option>
                <Option value=".6">6</Option>
                <Option value=".7">7</Option>
                <Option value=".8">8</Option>
                <Option value=".9">9</Option>
                <Option value="1">10</Option>
              </Select>
          </Col>
          </Row>
          <Row>
          <Col flex={35}>
            <FormGroup style={{ width: '15vw' }}>
              <Button outline pill theme = "danger" style={{ marginTop: '2vh' }} onClick={this.updateSearchHelpfulCategory}>Search</Button>
            </FormGroup>
          </Col>
          </Row></td>
             <td><div style={{ width: '10vw', margin: '0 auto', marginTop: '2vh' }}>
              </div></td>
             <td><div style={{ width: '50vw', margin: '0 auto', marginTop: '2vh' }}>
             <Table onRow={(record, rowIndex) => {
    return {
      onClick: event => {this.goToMatch(record.MatchId)}, // clicking a row takes the user to a detailed view of the match in the /matches page using the MatchId parameter  
    };
  }} dataSource={this.state.categoryResults} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5, showQuickJumper:true }}>
              {/* TASK 4: correct the title for the 'Home' column and add a similar column for 'Away' team in this ColumnGroup */}
              <Column title="Product Id" dataIndex="asin" key="asin" sorter= {(a, b) => a.asin.localeCompare(b.asin)}/>
              <Column title="Name" dataIndex="title" key="title" sorter= {(a, b) => a.avg_rating.localeCompare(b.avg_rating)}/>
              <Column title="Average Rating" dataIndex="avg_rating" key="avg_rating" sorter= {(a, b) => a.title.localeCompare(b.title)}/>
             {/* TASK 6: create two columns (independent - not in a column group) for the date and time. Do not add a sorting functionality */}
          </Table>
              </div>
               </td>
           </tr>
           </table> 

          

           <Divider />

        <div style={{ width: '80vw', margin: '0 auto', marginTop: '2vh' }}>
          <h3 style = {blueText}>Best Related Products by Review</h3>
          </div>
          <table>
            <tr>
              <td><div style={{ width: '10vw', margin: '0 auto', marginTop: '2vh' }}>
              </div></td>
              <td><Row gutter='30' align='middle' justify='center'>
              <Col flex={2}><FormGroup style={{ width: '15vw', margin: '0 auto' }}>
                  <label>Keyword 1</label>
                  <FormInput placeholder="Greg" value={this.state.keyWord1Query} onChange={this.handleKeyWord1QueryChange} />
              </FormGroup></Col>
              
          </Row>

          <Row><Col flex={2}><FormGroup style={{ width: '15vw', margin: '0 auto' }}>
                  <label>Keyword 2</label>
                  <FormInput placeholder="ZZZ" value={this.state.keyWord2Query} onChange={this.handleKeyWord2QueryChange} />
              </FormGroup></Col></Row>
          <Row><Col flex={2}><FormGroup style={{ width: '15vw', margin: '0 auto' }}>
                  <label>Price</label>
                  <Slider range defaultValue={[1, 300]} onChange={this.handlePriceChange} />
              </FormGroup></Col></Row>
          <Row><Col flex={2}><FormGroup style={{ width: '15vw', margin: '0 auto' }}>
                              <Button outline pill theme = "danger" style={{ marginTop: '4vh' }} onClick={this.keywordOnChange}>Search</Button>
                          </FormGroup></Col></Row></td>
              <td><div style={{ width: '10vw', margin: '0 auto', marginTop: '2vh' }}>
              </div></td>
              <td><div style={{ width: '50vw', margin: '0 auto', marginTop: '2vh' }}>     
            <Table dataSource={this.state.keywordResults} columns={productColumns} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5, showQuickJumper:true }}/>
          </div></td>
            </tr>
          </table>

        <Divider />

        <div style={{ width: '80vw', margin: '0 auto', marginTop: '2vh' }}>
          <h3 style = {blueText}>You Might Also Enjoy in this Category...</h3>
        </div>
          <table>
            <tr>
              <td><div style={{ width: '10vw', margin: '0 auto', marginTop: '2vh' }}>
              </div></td>
              <td><Row gutter='30' align='middle' justify='center'>
              <Col flex={2}>
              <Select defaultValue="Women" style={{ width: 120 }} onChange={this.handleRelatedCategoryChange}>
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
                <Option value="Travel">Luggage & Travel Gear</Option>
              </Select>
              </Col>         
          </Row>
          <Row><Col flex={2}>
                <FormGroup style={{ width: '15vw' }}>
                    <Button outline pill theme = "danger" style={{ marginTop: '4vh' }} onClick={this.relatedProductsOnChange}>Search</Button>
                </FormGroup></Col>  </Row></td>
              <td><div style={{ width: '10vw', margin: '0 auto', marginTop: '2vh' }}>
              </div></td>
              <td><div style={{ width: '60vw', margin: '0 auto', marginTop: '2vh' }}>                
            <Table dataSource={this.state.relatedProductResults} columns={relatedProductColumns} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5, showQuickJumper:true }}/>
          </div></td>
            </tr>
          </table>
        
          <Divider />

        <div style={{ width: '80vw', margin: '0 auto', marginTop: '2vh' }}>
          <h3 style = {blueText}>All Products Above Your Rating</h3>
        </div>

          <table>
            <tr>
              <td><div style={{ width: '10vw', margin: '0 auto', marginTop: '2vh' }}>
              </div></td>
              <td><Row gutter='30' align='middle' justify='center'>
          <Col flex={2}>
                <Select defaultValue="0" style={{ width: 120 }} onChange={this.aboveRatingChange}>
                    <Option value="0">0</Option>
                    {/* TASK 3: Take a look at Dataset Information.md from MS1 and add other options to the selector here  */}
                    <Option value="1">1</Option>
                    <Option value="2">2</Option>
                    <Option value="3">3</Option>
                    <Option value="4">4</Option>
                    <Option value="5">5</Option>
                  
                </Select>
            </Col>   
                
          </Row>
          <Row><Col flex={2}>
                <FormGroup style={{ width: '15vw' }}>
                    <Button outline pill theme = "danger" style={{ marginTop: '4vh' }} onClick={this.handleAboveRatingChance}>Search</Button>
                </FormGroup>
              </Col></Row></td>
              <td><div style={{ width: '10vw', margin: '0 auto', marginTop: '2vh' }}>
              </div></td>
              <td><div style={{ width: '50vw', margin: '0 auto', marginTop: '2vh' }}>    
            <Table dataSource={this.state.aboveRatingResults} columns={aboveRatingColumns} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5, showQuickJumper:true }}/>
          </div></td>
            </tr>
          </table>

    </div>

    )
  }

}

export default HomePage

