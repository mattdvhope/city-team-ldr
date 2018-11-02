import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl, HelpBlock, Button } from 'react-bootstrap';
import Link from 'gatsby-link'
import axios from 'axios'
import { navigateTo } from "gatsby-link"
import styled from "styled-components";

import View from "./View"
import { getCurrentUser } from "../utils/auth"

const CDStyler = styled.div`
  font-family: "Neue Frutiger W31 Modern Light", "Athiti";
  font-size: 90%;
`
function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}

export default class ClassesAtCenter extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      class_times1: [],
      class_times2: [],
      order_no: "",
      period: "",
      period_thai: "",
      part: ""
    };
  }

  componentDidMount() {
    axios.get(`${process.env.GATSBY_API_URL}/class_times.json`)
      .then((response) => {
        const class_times1 = this.filterSortPart1(response.data);
        const class_times2 = this.filterSortPart2(response.data);
        this.setState({ class_times1: class_times1, class_times2: class_times2 });
      });
  }

  filterSortPart1(class_times, part="one") {
    return this.filterSortPart(class_times, part)
  }

  filterSortPart2(class_times, part="two") {
    return this.filterSortPart(class_times, part)
  }

  filterSortPart(class_times, part) {
    var class_times_arr = [];
    class_times.forEach(function(class_time) {
      class_time.part === part ? class_times_arr.push(class_time) : null;
    });

    return class_times_arr.sort(function(a, b) {
      return a.order_no - b.order_no;
    });
  }

  handleChange = e => {
    console.log(e.target.value)
    this.setState({[e.target.name]: e.target.value});
  }

  handleSubmit = e => {
    e.preventDefault();
    const class_time = {
      order_no: this.state.order_no,
      period: this.state.period,
      period_thai: this.state.period_thai,
      part: this.state.part,
    }

    axios.post(`${process.env.GATSBY_API_URL}/class_times`, {
      order_no: this.state.order_no,
      period: this.state.period,
      period_thai: this.state.period_thai,
      part: this.state.part,
      class_time: class_time,
    })
    .then(response => {
      console.log(response)
      navigateTo('/app/dashboard')
    })
    .catch(error => console.log(error))
  }

  handleDelete(e, id) {
    e.preventDefault();
    axios.delete(`${process.env.GATSBY_API_URL}/class_times/${id}`)
    .then(response => {
      console.log(response)
      navigateTo('/app/dashboard')
    })
    .catch(error => console.log(error))
  }

  render() {
    return (
      <CDStyler className="container">
        <h3><Link to="/app/dashboard">Back to Dashboard</Link></h3>
        <hr/>
        <h2>Create or Delete class times on this page...</h2>
        <hr/>
        <h2>Here are the currently scheduled CEP class times with their "Order Number" above each of them (not including off-site classes on this list).</h2>
        <h2>This is the order (usually chronological) in which they will be shown upon various places throughout the website. You'll notice that there are some big gaps between these "Order Numbers." More explanation on that below....</h2>

        <h2>Part 1 Classes</h2>
        <hr/>
        {this.state.class_times1.map((time, timeKey) => {
          return (
          	<div key={timeKey}>
          		<h3>Order Number:  {time.order_no}</h3>
          		<h4>{time.period}</h4>
            </div>
          )
        })}

        <br/>
        <h2>Part 2 Classes</h2>
        {this.state.class_times2.map((time, timeKey) => {
          return (
          	<div key={timeKey}>
          		<h3>Order Number:  {time.order_no}</h3>
          		<h4>{time.period}</h4>
            </div>
          )
        })}

        <hr/>
        <hr/>
        <h2>You can create new class times below....</h2>
        <h4>(please use formats like these)</h4>

        <h2>20-24 June, 6:30-8:00pm</h2>
        <h4>...and...</h4>
        <h2>20-24 มิถุนายน, 18:30-20:00น.</h2>
        <h4>..............or.............</h4>
        <h2>27 Febrary - 3 March, 6:30-8:00pm</h2>
        <h4>...and...</h4>
        <h2>27 กุมภาพันธ์ - 3 มีนาคม, 18:30-20:00น.</h2>
        <h4>..............or.............</h4>
        <h2>18,19,20,25,27 April (5 times), 6:30-8:00pm</h2>
        <h4>...and...</h4>
        <h2>18,19,20,25,27 เมษายน (5 ครัง), 18:30-20:00น.</h2>
        <h4>..............or.............</h4>
        <h2>9-23 May, Tuesdays/Thursdays (5 times), 6:30-8:00pm</h2>
        <h4>...and...</h4>
        <h2>9-23 พฤษภาคม, อังคาร/พฤหัสบดี (5 ครั้ง), 18:30-20:00น.</h2>
        <h4>...etc...(try not make them too long and avoid typos!!)....</h4>

        <hr/>
        <hr/>

        <h2>Below here you can (1) Create a new class time, (2) Delete a class time</h2>
        <hr/>
        <h2>(1) Create a new class time</h2>
        <hr/>
        <h3><u>Order Number</u> (If your new class time here will be later than all those listed above, make sure its "Order Number" is at least 10 greater than the last "Order Number" above. For example, if the last class time has an "Order Number" of 53, your new Class Time here should use 63. If your new class time must be inserted [time-wise] between two Class Times above, then make sure your "Order Number" here is as perfectly between them as possible. For example if the class time before your new class time has an "Order Number" of 80 and the one after that is 90, then your new Class Time should have an order number of 85.)...</h3>

        <form onSubmit={this.handleSubmit} noValidate="noValidate" encType="multipart/form-data" action="/class_times" acceptCharset="UTF-8">
	        <FieldGroup
	          id="formControlsText1"
	          name="order_no"
	          type="text"
	          onChange={this.handleChange}
	          placeholder="Order Number"
	          style={{width: `20em`}}
	        />
	        <FieldGroup
	          id="formControlsText2"
	          label="Class Time, in English:"
	          name="period"
	          type="text"
	          onChange={this.handleChange}
	          placeholder="Class Time, in English:"
	        />
	        <FieldGroup
	          id="formControlsText3"
	          label="Class Time, in English:"
	          name="period_thai"
	          type="text"
	          onChange={this.handleChange}
	          placeholder="Class Time, in Thai:"
	        />
	        <FormGroup controlId="formControlsSelect">
	          <ControlLabel>Select whether this a "Part 1" class or a "Part 2" class (Default "Part 1"):</ControlLabel>
	          <FormControl
	            componentClass="select"
	            onChange={this.handleChange}
		          style={{width: `10em`}}
		          type="select"
	            name="part">
	            <option value="one">--Select Part--</option>
	            <option value="one">Part 1</option>
	            <option value="two">Part 2</option>
	          </FormControl>
	        </FormGroup>
	        <Button className="btn btn-success" type="submit">Create</Button>
	      </form>
      
	      <hr/>
	      <h2>(2) Delete a class time</h2>
	      <hr/>

        <h2>Part 1 Classes</h2>
        <hr/>
        {this.state.class_times1.map((time, timeKey) => {
          return (
          	<div key={timeKey}>
    		      <h3>{time.period}<a href="" onClick={e => this.handleDelete(e, time.id)}> Delete</a></h3>
            </div>
          )
        })}

        <br/>
        <h2>Part 2 Classes</h2>
        {this.state.class_times2.map((time, timeKey) => {
          return (
            <div key={timeKey}>
    		      <h3>{time.period}<a href="" onClick={e => this.handleDelete(e, time.id)}> Delete</a></h3>
            </div>
          )
        })}
	      <br/>
	      <br/>
	      <br/>
	      <br/>
	      <br/>
      </CDStyler>
    )
  }
}