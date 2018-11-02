import React from "react"
import Link from 'gatsby-link'
import { navigateTo } from "gatsby-link"
import View from "./View"

import { getCurrentUser } from "../utils/auth"
import styled from "styled-components";

export default () => {
  return (
    <div className="container">
      <h1>Former Students</h1>
      <h2><Link to="/app/dashboard">Dashboard</Link></h2>
    </div>
  )
}
