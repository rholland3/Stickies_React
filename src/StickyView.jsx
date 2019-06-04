import React, { Component, Fragment } from 'react';
import Cookies from 'js-cookie';
import {Link }from 'react-router-dom';
import './sticky.css';

class StickyView extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            showStickies: false,
            stickyList: [],
            stickiesToDelete: []
        };
        this.fetchStickies = this.fetchStickies.bind(this);
        this.onDeleteStickies = this.onDeleteStickies.bind(this);
        this.onChangeStickyChecked = this.onChangeStickyChecked.bind(this);
    }

    componentDidMount() {
        this.fetchStickies();
    }

    fetchStickies() {
        //get the relevant stickies from the DB and map them to a list item
        fetch("/userStickies", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response) => {
            if(response.status===200) {
                response.json().then((data)=> { 
                    for(var key in data) {
                        var title;
                        var body;
                        var stickyID;
                        if (data.hasOwnProperty(key)) {
                            var value = data[key];
                            for (var k in value) {
                                if (value.hasOwnProperty(k)) {
                                    if(k === "Title") {
                                        title = value[k];
                                    }else if(k ==="Body"){
                                        body = value[k];
                                    }else if(k ==="StickyId") {
                                        stickyID = value[k];
                                    }
                                }
                            }
                        this.state.stickyList.push( <a  id= 'stickydisplay' href='#' ><input type = 'checkbox' onChange={event=>this.onChangeStickyChecked(event)} name={stickyID}/><h5>{title}</h5> <p>{body}</p></a>);
                        }
                    }
                    this.setState({showStickies: true });
                })
            }
            else if(response.status===204) {
                //user has no stickies to show
                this.state.stickyList.push('You have no saved stickies');
                this.setState({showStickies: true });
            }
            else {
                this.setState({showStickies: false});
            }
        })
    
    }

    onChangeStickyChecked(event) {
        let isChecked =event.target.checked;
        let item =event.target.name;
        console.log("Name: "+item);
        console.log("IsChecked: "+isChecked);
        if(isChecked)
        {
           this.state.stickiesToDelete.push(item);     
        }       
    }

    onDeleteStickies() {
       console.log(this.state.stickiesToDelete);
         //confirm with the user first.
       let confirmed = window.confirm("Are you sure you want to delete the selected stickies? ");
        //send the checked sticky ID's to the DB to delete if confirmed
        if(confirmed){
            fetch("/deleteStickies", {
                method: "POST",
                body: JSON.stringify(this.state.stickiesToDelete),
                headers: {
                    "Content-Type": "application/json"
                }
            }).then((response) => {
                if(response.status === 200) {
                    alert("delete successful.");
                }
                else if(response.status === 401) {
                   alert("delete unsuccessful.");
                }

            })
        } else {
            //uncheck the checkboxes
            this.setState({stickiesToDelete: []});
s
        }
        
    }


    render() {
        if(this.state.showStickies) {
            this.list2 = this.state.stickyList.map(s=> <li >{s}</li>);
            return(
                <Fragment>
                    <link  href="http://fonts.googleapis.com/css?family=Reenie+Beanie:regular" rel="stylesheet" type="text/css"/> 
                    <h3>Stickies for {Cookies.get('userName')}</h3><br/>
                    <Link to='/addSticky' class='buttons'>Add New Sticky</Link>
                    <br/>
                    <button onClick={this.onDeleteStickies} class='buttons'>Delete Selected Stickies</button>
                    <br/>
                    <ul>
                        {this.list2} 
                   </ul>
                  
                </Fragment>
            )
        }
        else {
            //cudnt load user stickies "an error has occurred"
            return(
                <Fragment> 
                <h2>An error has occurred. <br/>Unable to load your stickies.</h2>
                </Fragment>
            )
        }
        
    }
}
export default StickyView
