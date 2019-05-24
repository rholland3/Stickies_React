import React from 'react';
import { Switch, Route } from 'react-router-dom'
import LoginPage from './LoginPage';
import SignUp from './SignUp';
import Home from './Home';
import Logout from './Logout';
import AddSticky from './addSticky';
import StickyView from './StickyView';

const Main=(props)=>(
   
   <main>
      <Switch>
        <Route path='/LoginPage'  
               render={() => <LoginPage logInUser={props.logInUser} setUserID = {props.setUserID}/>} />
        <Route path='/addSticky'
               render={() => <AddSticky userID={props.userID}/>}/>
        <Route path='/SignUp' component={SignUp}/>
        <Route path='/Home' component={Home}/>
        <Route path='/Logout' render={()=><Logout logoutUser={props.logoutUser}/>}/>
        <Route path='/viewStickies' render={() => <StickyView userID={props.userID}/>}/> 
      </Switch>
    </main>
) 
export default Main