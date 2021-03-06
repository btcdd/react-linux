import React, { useState, useEffect } from "react"

import styles from '../css/CodeTreeErrorPage.css';
import axios from 'axios';
import queryString from 'query-string';



const API_URL = 'http://192.168.1.141:8080/compiletest/api/codetree';
const API_HEADERS={
   'Content-Type' : 'application/json'
}

function CodeTreeErrorPage({authenticated,pathAccess,location}){
   
   useEffect( () => {
      
      console.log("ErrorPage this.props authenticated>>>",authenticated)
    
      let query = queryString.parse(location.search); 
      if(query.userEmail == ""){
         query.userEmail = "=";
      }
      console.log("ErrorPage query>>",query.userEmail);
      axios.post(`${API_URL}/auth/${query.userEmail}.`,{
         headers: API_HEADERS
      })
      .then(resp => resp.data.data)
      .then(resp => pathAccess(resp))
      .catch(err => console.error(err));
      
   });
   return(
      
      <div className={styles['ErrorPage']}>
         {authenticated === true ? <p>조금만 기다려주세요...</p> : <p>오류 페이지</p>  }
      </div>
   );
      
}
export default CodeTreeErrorPage

