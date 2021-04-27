import React, { Component } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import DropdownButton from 'react-bootstrap/DropdownButton'
import './App.css';
import { Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


class App extends Component {
  state = {
    data: [],
    button1: {
      graphData: {
        labels: ['January', 'February', 'March',
          'April', 'May', 'June', 'July'],
        // datasets needs to be in array for charts.js
        datasets: [
          {
            label: 'RoboData',
            fill: false,
            lineTension: 0.5,
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: []
          }]
      },
      id: null,
      num1: null,
      num2: null,
      num3: null,
      error: null
    //data1: null
    },

    button2: {
      id: null,
      graphData: {
        labels: ['January', 'February', 'March',
          'April', 'May', 'June', 'July'],
        // datasets needs to be in array for charts.js
        datasets: [
          {
            label: 'RoboData',
            fill: false,
            lineTension: 0.5,
            backgroundColor: 'rgba(0,0,0,1)',
            borderColor: 'rgba(39,204, 47,1)',
            borderWidth: 2,
            data: []
          }]
      },
      num1: null,
      num2: null,
      num3: null,
      error: false
    //data1: null
    }
    
  }
  
  componentDidMount() {
    axios.get('http://localhost:8000/')
      .then(response => {
        const posts = (response.data);
        //const updatedPosts = posts.map
        //console.log(JSON.parse(posts));
      

        
        this.setState({ data: posts.data });
        this.onLoadDefault();
        
       // console.log(this.state.data.data[1]);
       // console.log(response);
        
      })
      .catch(error => {
        console.log(error)
        this.setState({ error: true });
      })
  }

  onLoadDefault = () => {
    let lastNum = this.state.data.length - 1;
    //console.log(lastNum);
          this.setState({
            button1: {
              graphData: {
              labels: ['January', 'February', 'March',
                'April', 'May', 'June', 'July'],
              // datasets needs to be in array for charts.js
              datasets: [
                {
                  label: 'RoboData',
                  fill: false,
                  lineTension: 0.5,
                  backgroundColor: 'rgba(0, 0, 0,1)',
                  borderColor: 'rgba(75,192,192,1)',
                  borderWidth: 2,
                  data: this.state.data[0].graph
                }]
              }, num1: this.state.data[0].num1, num2: this.state.data[0].num2, num3: this.state.data[0].num3,
              id: this.state.data[0].id
          },

            button2: {
            graphData: {
              labels: ['January', 'February', 'March',
                'April', 'May', 'June', 'July'],
              // datasets needs to be in array for charts.js
              datasets: [
                {
                  label: 'RoboData',
                  fill: false,
                  lineTension: 0.5,
                  backgroundColor: 'rgba(0,0,0,1)',
                  borderColor: 'rgba(39,204, 47,1)',
                  borderWidth: 2,
                  data: this.state.data[lastNum].graph
                }]
            }, 
              num1: this.state.data[lastNum].num1, num2: this.state.data[lastNum].num2, num3: this.state.data[lastNum].num3,
            id: this.state.data[lastNum].id
          }
        })
  }
  //When I did if statements for buttonNums it wouldn't change
  
  changeState = (event, buttonNum) => {

    //for other dropdowns event.target.value
    let num = (event.target.id) - 1;
    //num--;
    // console.log(event);
    // console.log(event.target);
    // console.log("ID" + event.target.id);
    // console.log("In button 1");
    if (buttonNum === 1) {
      this.setState({
        button1: {
          graphData: {
            labels: ['January', 'February', 'March',
              'April', 'May', 'June', 'July'],
            // datasets needs to be in array for charts.js
            datasets: [
              {
                label: 'RoboData',
                fill: false,
                lineTension: 0.5,
                backgroundColor: 'rgba(0, 0, 0,1)',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 2,
                data: this.state.data[num].graph
              }]
          },
          num1: this.state.data[num].num1, num2: this.state.data[num].num2, num3: this.state.data[num].num3,
          id: this.state.data[num].id
        },
      })
    }

    if (buttonNum == 2) {
      console.log("What?")
      this.setState({

        button2: {
          graphData: {
            labels: ['January', 'February', 'March',
              'April', 'May', 'June', 'July'],
            // datasets needs to be in array for charts.js
            datasets: [
              {
                label: 'RoboData',
                fill: false,
                lineTension: 0.5,
                backgroundColor: 'rgba(0,0,0,1)',
                borderColor: 'rgba(39,204, 47,1)',
                borderWidth: 2,
                data: this.state.data[num].graph
              }]
          },
          num1: this.state.data[num].num1, num2: this.state.data[num].num2, num3: this.state.data[num].num3,
          id: this.state.data[num].id
        },
      });
    }
 
  }

  render() {
    let graphB1 = <p>Fail</p>;
    let graphB2 = <p>Fail</p>
    let otherStatsB1 = <p>Fail</p>;
    let otherStatsB2 = <p>Fail</p>;
    let dropdown1 = <p>Fail</p>;
    let dropdown2 = <p>Fail</p>;
    let finished = <p>Fail</p>;
    if (this.state.data !== null) {
      //make name
      //console.log(this.state.button2.id);
      //Make it a seperate prop so I can pass in num so it's not repetitive into onChange

      
      dropdown1 = 
      <DropdownButton variant = "info" id="dropdown-basic-button" title={"Team " + this.state.button1.id}>
        {this.state.data.map(array => {
          return <Dropdown.Item onClick={event => this.changeState(event, 1)} value={array.id} key={array.id} id={array.id}>{"Team " + array.id}</Dropdown.Item>
            })}
      </DropdownButton>

      dropdown2 =
        <DropdownButton variant = "success" id="dropdown-basic-button" title={"Team " + this.state.button2.id}>
          {this.state.data.map(array => {
            return <Dropdown.Item onClick={event => this.changeState(event, 2)} value={array.id} key={array.id} id={array.id}>{"Team " + array.id}</Dropdown.Item>
          })}
        </DropdownButton>

      let titleOneString = "Team " + this.state.button1.id + "'s Stat";
      let titleTwoString = "Team " + this.state.button2.id + "'s Stat";
      graphB1 = 
        <div>
        <Line
          data={this.state.button1.graphData}
          options={{
            title: {
              display: true,
              text: 'Team ' + this.state.button1.id,
              fontSize: 20
            },
          }}
        />
      </div>
      
      graphB2 = 
        <div>
        <Line
          data={this.state.button2.graphData}
          options={{
            title: {
              display: true,
              text: 'Team ' + this.state.button2.id,
              fontSize: 20
            },
          }}
        />
        </div>
      
      otherStatsB1 =
        <div>
          
        <div className="d-flex flex-row justify-content-around">
          <Card border="info" style={{ width: '13rem' }}>
            <Card.Body>
              <Card.Title className="display-5">{titleOneString}</Card.Title>
              <Card.Text className="display-4">{this.state.button1.num1}</Card.Text>
            </Card.Body>
          </Card>
          <Card border="info" style={{ width: '13rem' }}>
            <Card.Body>
              <Card.Title className="display-5">{titleOneString}</Card.Title>
              <Card.Text className="display-4">{this.state.button1.num2}</Card.Text>
            </Card.Body>
          </Card>
          <Card border="info" style={{ width: '13rem' }}>
            <Card.Body>
              <Card.Title className="display-5">{titleOneString}</Card.Title>
              <Card.Text className="display-4">{this.state.button1.num3}</Card.Text>
            </Card.Body>
          </Card>
        </div>
        
        
      </div>
      

      otherStatsB2 =
        <div>
        {/* Make team name */}
        
        <div className="d-flex flex-row justify-content-around">
          <Card border="success" style={{ width: '13rem' }}>
            <Card.Body>
              <Card.Title className="display-5">{titleTwoString}</Card.Title>
              <Card.Text className="display-4">{this.state.button2.num1}</Card.Text>
            </Card.Body>
          </Card>

          <Card border="success" style={{ width: '13rem' }}>
            <Card.Body>
              <Card.Title className="display-5">{titleTwoString}</Card.Title>
              <Card.Text className="display-4">{this.state.button2.num2}</Card.Text>
            </Card.Body>
          </Card>

          <Card border="success" style={{ width: '13rem' }}>
            <Card.Body>
              <Card.Title className="display-5">{titleTwoString}</Card.Title>
              <Card.Text className="display-4">{this.state.button2.num3}</Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>
      
      finished =
      <section>
        <Jumbotron className="Jumbotron header">
          <h1 className="header">Compare Two Teams!</h1>
          <div className="d-flex flex-row justify-content-around">
            <div></div>
            <div></div>
            {dropdown1}
            {dropdown2}
            <div></div>
            <div></div>
          </div>
        </Jumbotron>
        <Container fluid>
          <Row>
            <Col md={6}>
                <Row>
                  <Col>{graphB1}</Col>
                </Row>
                <Row>
                  <Col>{otherStatsB1}</Col>
                </Row>
            </Col>
            <Col md={6}>
              <Row>
                <Col>{graphB2}</Col>
              </Row>
              <Row>
                <Col>{otherStatsB2}</Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </section>
    }



   
    return (
      <div className="App">
        {finished}
      </div>
      
    );
  }
}

export default App;
