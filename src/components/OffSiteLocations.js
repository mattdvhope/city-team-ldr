import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl, HelpBlock, Button, Table, Collapse } from 'react-bootstrap';
import Link from 'gatsby-link'
import axios from 'axios'
import { navigateTo } from "gatsby-link"
import styled from "styled-components";

import View from "./View"
import { getCurrentUser } from "../utils/auth"

const OsStyler = styled.div`
  font-family: "Neue Frutiger W31 Modern Light", "Athiti";
  font-size: 90%;
`

const HeadEl = styled.div`
  font-size: 150%;
`

const TCell = styled.div`
  font-size: 120%;
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

export default class OffsiteLocations extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      completed_locs: [],
      not_completed_locs: [],
      location_english: "",
      location_thai: "",
      detailed: false
    };
    this.toggle = this.toggle.bind(this)
  }

  componentDidMount() {
    axios.get(`${process.env.GATSBY_API_URL}/off_site_locations.json`)
      .then((response) => {
        const completed_locs = this.completedLocs(response.data);
        const not_completed_locs = this.notCompletedLocs(response.data);
        this.setState({ completed_locs: completed_locs, not_completed_locs: not_completed_locs });
      });
  }

  completedLocs(locs) {
    var off_site_locations_arr = [];
    locs.forEach(function(loc) {
      loc.completed ? off_site_locations_arr.push(loc) : null;
    });
    return off_site_locations_arr;
  }

  notCompletedLocs(locs) {
    var off_site_locations_arr = [];
    locs.forEach(function(loc) {
      loc.completed ? null : off_site_locations_arr.push(loc);
    });
    return off_site_locations_arr;
  }

  handleChange = e => {
    console.log(e.target.value)
    this.setState({[e.target.name]: e.target.value});
  }

  handleSubmit = e => {
    e.preventDefault();
    const off_site_location = {
      location_english: this.state.location_english,
      location_thai: this.state.location_thai,
      completed: false
    }

    axios.post(`${process.env.GATSBY_API_URL}/off_site_locations`, {
      location_english: this.state.location_english,
      location_thai: this.state.location_thai,
      completed: false,
      off_site_location: off_site_location,
    })
    .then(response => {
      console.log(response)
      navigateTo('/app/dashboard')
    })
    .catch(error => console.log(error))
  }

  handleArchive(e, id) {
    e.preventDefault();
    axios.patch(`${process.env.GATSBY_API_URL}/off_site_locations/${id}`)
    .then(response => {
      console.log(response)
      navigateTo('/app/dashboard')
    })
    .catch(error => console.log(error))
  }

  toggle() {
    console.log(this.state.detailed)
    this.setState({detailed: !this.state.detailed})
  }

  render() {
    return (
      <OsStyler className="container">
        <h3><Link to="/app/dashboard">Back to Dashboard</Link></h3>
        <hr/>
        <h2>Create or Archive off-site locations on this page...</h2>
        <hr/>
        <h2>Here are the currently scheduled CEP off-site (not at the CEP center) class locations....</h2>
        <hr/>
        {this.state.not_completed_locs.map((loc, key) => {
          console.log(loc);
          return (
            <div key={key}>
              <h3>{loc.location_english}</h3>
              <Table striped bordered condensed hover>
                <thead>
                  <tr>
                    <th><HeadEl>Nickname</HeadEl></th>
                    <th><HeadEl>First Name</HeadEl></th>
                    <th><HeadEl>Last Name</HeadEl></th>
                    <th><HeadEl>Gender</HeadEl></th>
                    <th><HeadEl>Phone Number</HeadEl></th>
                    <th><HeadEl>Email</HeadEl></th>
                    <th><HeadEl>Date Registered</HeadEl></th>
                  </tr>
                </thead>
                <tbody key={key}>
                  {loc.users.map((student, stuKey) => {
                    return (
                      <tr key={stuKey}>
                        <td key={student.nickname+"nick"}><TCell>{student.nickname}</TCell></td>
                        <td key={student.first_name+"first"}><TCell>{student.first_name}</TCell></td>
                        <td key={student.last_name+"last"}><TCell>{student.last_name}</TCell></td>
                        <td key={student.gender}><TCell>{student.gender}</TCell></td>
                        <td key={student.phone_number}><TCell>{student.phone_number}</TCell></td>
                        <td key={student.email}><TCell>{student.email}</TCell></td>
                        <td key={student.date_format}><TCell>{student.date_format}</TCell></td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
          )
        })}
        <hr/>
        <hr/>
        <h2>You can create new off-site locations below....</h2>
        <h4>Use differing characteristics [like floor numbers, etc] and a chronologically ordered number [#3, etc] for classes taught in succession at the same location. Also write in the time period (plus days if not a M-F class). <u>The bottom line is that you want to distinguish every class from every other class</u>!</h4>
        <h3>Wat Tam Sua (3rd floor, #1), 10:00am-12:00pm</h3>
        <h4>...and...</h4>
        <h3>วัดถ้ำเสือ (ชั้น 3, #1), 10:30-12:00น.</h3>
        <h4>..............or.............</h4>
        <h3>Fusion Sales team (#2), 6:00-7:30pm</h3>
        <h4>...and...</h4>
        <h3>ทีมขาย Fusion (#2), 18:00-19:30น.</h3>
        <h4>..............or.............</h4>
        <h3>Fusion Sales team (#3), T-Th, 6:00-7:30pm</h3>
        <h4>...and...</h4>
        <h3>ทีมขาย Fusion (#3), อังคาร-พฤหัส, 18:00-19:30น.</h3>
        <h4>...etc...(try not make them too long and avoid typos!!)....</h4>

        <hr/>
        <hr/>
        <h2>Below here you can (1) Create a new off-site location, (2) Archive an off-site location</h2>
        <hr/>
        <h2>(1) Create a new off-site locations</h2>
        <hr/>

        <form onSubmit={this.handleSubmit} noValidate="noValidate" encType="multipart/form-data" action="/off_site_locations" acceptCharset="UTF-8">
          <FieldGroup
            id="formControlsText1"
            label="Location in English:"
            name="location_english"
            type="text"
            onChange={this.handleChange}
            placeholder="Location in English"
          />
          <FieldGroup
            id="formControlsText2"
            label="Location in Thai:"
            name="location_thai"
            type="text"
            onChange={this.handleChange}
            placeholder="Location in Thai"
          />
          <Button className="btn btn-success" type="submit">Create</Button>
        </form>

        <hr/>
        <h2>(2) Mark/Archive off-site location as 'complete'</h2>
        <hr/>
        <ul>
          {this.state.not_completed_locs.map((loc, key) => {
            return (
              <li key={key}><h3>{loc.location_english} <a href="" onClick={e => this.handleArchive(e, loc.id)}>Archive</a></h3></li>
            )
          })}
        </ul>
        <hr/>

        <h2><span onClick={this.toggle} style={{color: `#337ab7`, cursor: `pointer`}}>Click here to see an Archived List of 'completed' off-site locations.</span></h2>
        <Collapse in={this.state.detailed}>
          <ul>
            {this.state.completed_locs.map((loc, key) => {
              return (
                <li key={key}><h3>{loc.location_english}</h3></li>
              )
            })}
          </ul>
        </Collapse>
        <br/>
        <br/>
      </OsStyler>
    )
  }
}