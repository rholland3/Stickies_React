import React, { Component, Fragment } from 'react';
import Cookies from 'js-cookie';
import { Redirect } from 'react-router';
import {Link }from 'react-router-dom';

class Home extends Component 
{
	
render()
 {

    if(Cookies.get('sessionId')!=null)
    {
        return (

			<Fragment>
                <h1>Home page: {Cookies.get('userName')} </h1>
                <ul>
                    <li><Link to='/addSticky'>Add Stickies</Link></li> 
                    <li><Link to='/viewStickies'>View Stickies Here</Link></li>
                </ul>
            </Fragment>
             );
            
    }
    else{
        return <Redirect to='/LoginPage'/>;
    }
	
	
	}
	

}
export default Home;