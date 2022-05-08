import React from 'react';
import {
  Table,
  Pagination,
  Select
} from 'antd'

import MenuBar from '../components/MenuBar';
import { getCategoriesHelpful, getAllPlayers } from '../fetcher'
const { Column, ColumnGroup } = Table;
const { Option } = Select;


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
  // TASK 7: add a column for Potential, with the ability to (numerically) sort ,
  // TASK 8: add a column for Club, with the ability to (alphabetically) sort 
  // TASK 9: add a column for Value - no sorting required
];

class HomePage extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      categoryResults: [],
      matchesPageNumber: 1,
      matchesPageSize: 10,
      playersResults: [],
      pagination: null  
    }

    this.leagueOnChange = this.leagueOnChange.bind(this)
    this.goToMatch = this.goToMatch.bind(this)
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

  componentDidMount() {
    getCategoriesHelpful(1, null, 'Women').then(res => {
      this.setState({ categoryResults: res.results })
    })
    /*
    getAllPlayers().then(res => {
      console.log(res.results)
      // TASK 1: set the correct state attribute to res.results
      this.setState({playersResults: res.results})

    })
*/
  }



  render() {

    return (
      <div>
        <MenuBar />
        <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
          <h3>Players</h3>
          <Table dataSource={this.state.playersResults} columns={playerColumns} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5, showQuickJumper:true }}/>
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


      </div>
    )
  }

}

export default HomePage

