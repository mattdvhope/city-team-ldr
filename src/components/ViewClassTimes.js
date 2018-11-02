import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import Link from 'gatsby-link'
import axios from 'axios'
import { navigateTo } from "gatsby-link"
import styled from "styled-components";

import View from "./View"
import { getCurrentUser } from "../utils/auth"

const CTStyler = styled.div`
  font-family: "Neue Frutiger W31 Modern Light", "Athiti";
  font-size: 90%;
`
const HeadEl = styled.div`
  font-size: 150%;
`

const TCell = styled.div`
  font-size: 120%;
`

export default class ViewClassTimes extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      class_times1: [],
      class_times2: [],
      offsite: []
    };
  }

  componentDidMount() {
    axios.get(`${process.env.GATSBY_API_URL}/class_times.json`)
      .then((response) => {
        const class_times1 = this.filterSortPart1(response.data);
        const class_times2 = this.filterSortPart2(response.data);
        const class_times_off = this.filterSortOff(response.data);
        this.setState({ class_times1: class_times1, class_times2: class_times2, offsite: class_times_off });
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

  filterSortOff(class_times) {
    var offsite = class_times.filter( function(item){return (item.part=="off-site");} );
    return offsite.sort(function(a, b) {
      return a.order_no - b.order_no;
    });
  }


  render() {
    return (
      <CTStyler className="container">
        <h3><Link to="/app/dashboard">Back to Dashboard</Link></h3>
        <hr/>
        <h1>View Class Times</h1>

        <h2>Part 1</h2>
        {this.state.class_times1.map((time, timeKey) => {
          return (
            <div key={timeKey+"pt1"}>
              <h3 key={time.period} value={time.period}>{time.period}</h3>
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
                <tbody key={time.period}>
                  {time.users.map((student, stuKey) => {
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

        <br/>
        <h2>Part 2</h2>
        {this.state.class_times2.map((time, timeKey) => {
          return (
            <div key={timeKey+"pt2"}>
              <h3 key={time.period} value={time.period}>{time.period}</h3>
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
                <tbody key={time.period}>
                  {time.users.map((student, stuKey) => {
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

        <br/>
        <h2>Off site</h2>
        {this.state.offsite.map((time, timeKey) => {
          return (
            <div key={timeKey+"off"}>
              <h3 key={time.period} value={time.period}>{time.period}</h3>
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
                <tbody key={time.period}>
                  {time.users.map((student, stuKey) => {
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

      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      </CTStyler>
    )
  }
}