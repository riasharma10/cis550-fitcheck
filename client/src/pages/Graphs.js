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
import { getAvgPrice, getNumProducts } from '../fetcher';

import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';


var results1 = [] 

class GraphPage extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      numProductResults: [],
      numData: [],
    }

   
  }


  
  componentDidMount() {
    
    // route for the number of products per category
    
    getNumProducts().then(res => {

        results1 = res.results;
        console.log(res.results)
        for (var i = 0; i < results1.length; i++) {
          console.log("iteration", i)
          // manipulates res.results to get data in right form for the library
          this.setState({ 
            numData: this.state.numData.concat([{name: results1[i].category2, uv: results1[i].NumProducts}])
          })
        }

        console.log("numData", this.state.numData)


    })
      
    
  }


  render() {
    const blueText = {color: '#1e8d9e'}

    return (
      <div>
        <MenuBar />
        
          <Row>
        
      <div>
        <canvas style={{ width: '512px', height: '50px' }}></canvas>
        <h2
          style={{
            fontSize: '30px',
            fontWeight: 'bold',
            textAlign: 'right',
            padding: '10px',
          }}
        >
          {' '}
          Number of Products Per Category:{' '}
        </h2>
        <LineChart width={500} height={300} data={this.state.numData}>
            <XAxis dataKey="name"/>
            <YAxis/>
            <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
            <Line type="monotone" dataKey="uv" stroke="#8884d8" />
            <Line type="monotone" dataKey="pv" stroke="#82ca9d" />
            <Tooltip />
        </LineChart>
      </div>
      </Row>
    </div>

    )
  }

}

export default GraphPage

