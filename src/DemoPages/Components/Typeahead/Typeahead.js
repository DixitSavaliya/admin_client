import React, { Fragment } from 'react';
import { AsyncTypeahead, Typeahead } from 'react-bootstrap-typeahead';
import axios from 'axios';
import { EventEmitter } from '../../../event';
import API from '../../../service';



class TypeAhead extends React.Component {
    constructor(props) {
        console.log("props", props)
        super(props);
        this.state = {
            allowNew: false,
            isLoading: false,
            multiple: false,
            options: [],
            serachAPI: '',
            selected: [],
            tId: []
        }
        this.searchTaskDataKeyUp = this.searchTaskDataKeyUp.bind(this);
        this.handleChangeSelect = this.handleChangeSelect.bind(this);
        this.handleChangeSelectId = this.handleChangeSelectId.bind(this);

        EventEmitter.subscribe('tname', (data) => {
            this.setState({
                tId: this.state.tId = data
            })
            console.log("tid", this.state.tId);
        });

        // EventEmitter.subscribe('vtechnologies', (data) => {
           
        //     console.log("vtechnologies",data);
        //     API.getTechnologyById({ technology_id: data })
        //     .then((findresponse) => {
        //         if (findresponse) {
        //             console.log("technologyName response===", findresponse);
        //             this.setState({
        //                 tId: this.state.tId =  findresponse.data.data
        //             })
        //             console.log("technologyName response===", this.state.tId);
        
                 
        //         } else {
        //             console.log("err", err);
        //             // Swal.fire("Something went wrong!", "", "warning");
        //         }
        //     }).catch((err) => {
        //         Swal.fire("Something went wrong!", "", "warning");
        //     });
        //     console.log("techdata",this.state.techdata);
        // });
    }

    componentDidMount() {
        console.log("props", this.props);
        this.setState({
            multiple: this.state.multiple = this.props.data,
            serachAPI: this.state.serachAPI = this.props.api
        })
    }

    handleChangeSelect(event) {
        console.log("event", event,event.target);
        EventEmitter.dispatch('tgarray', event);
    }

    handleChangeSelectId(event) {
        console.log("eventid",event);
        var array = [];
        ;
        for (var i = 0; i < event.length; i++) {
            array.push(event[i].id)
        }
        console.log("projectid",localStorage.getItem('projectid'));
        const obj = {
            project_id:localStorage.getItem('projectid'),
            technology_id:array
        }
        API.deleteTechnologyById(obj)
        .then((findresponse) => {
            if (findresponse) {
                console.log("deleteTechnologyById response===", findresponse); 
                Swal.fire("Technologie Deleted Successfully!", "", "success");            
            } else {
                console.log("err", err);
                // Swal.fire("Something went wrong!", "", "warning");
            }
        }).catch((err) => {
            Swal.fire("Something went wrong!", "", "warning");
        });
        // EventEmitter.dispatch('tgarray', event);
    }

    searchTaskDataKeyUp(e) {
        this.setState({ isLoading: this.state.isLoading = true });
        if (this.state.serachAPI) {
            axios.post('http://localhost:3505/' + this.state.serachAPI, { searchkey: e })
                .then(response => {
                    console.log("response", response)
                    if (response.data.status == 1) {
                        this.setState({
                            options: this.state.options = response.data.data,
                            isLoading: this.state.isLoading = true,
                        })
                        console.log("response", this.state.options)
                    } else {
                        this.setState({
                            isLoading: this.state.isLoading = false,
                            options,
                        });
                    }
                }).catch(error => {
                    console.log("error", error)
                    let options = [];
                    this.setState({
                        isLoading: this.state.isLoading = false,
                        options,
                    });
                });
        } else {
            let options = [];
            this.setState({
                isLoading: this.state.isLoading = false,
                options,
            });
        }
    }


    render() {
        // console.log("tId", this.state.tId);
        return (
            <div>
                {
                    this.state.tId.length ? (
                        <AsyncTypeahead
                            isLoading={this.state.isLoading}
                            id="my-typeahead-id"
                            labelKey="name"
                            selected={this.state.tId}
                            onSearch={this.searchTaskDataKeyUp}
                            placeholder="Search for a technologies..."
                            onChange={this.handleChangeSelectId}
                            options={this.state.options}
                            multiple={true}
                        />
                    ) : (
                            <AsyncTypeahead
                                isLoading={this.state.isLoading}
                                id="my-typeahead-id"
                                labelKey="name"
                                onSearch={this.searchTaskDataKeyUp}
                                placeholder="Search for a technologies..."
                                onChange={this.handleChangeSelect}
                                options={this.state.options}
                                multiple={true}
                            />
                        )
                }
            </div>
        );
    }
}

export default TypeAhead;