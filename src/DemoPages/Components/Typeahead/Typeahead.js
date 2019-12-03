import React, { Fragment } from 'react';
import { AsyncTypeahead, Typeahead } from 'react-bootstrap-typeahead';

import SearchResultMenuItem from './SearchResultMenuItem';
import Select from 'react-select';
import axios from 'axios';
import { EventEmitter } from '../../../event';



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
            selected: []
        }
        this.searchTaskDataKeyUp = this.searchTaskDataKeyUp.bind(this);
        this.handleChangeSelect = this.handleChangeSelect.bind(this);
        EventEmitter.subscribe('technologies', (data) => {
            this.setState({
                optionsUser: this.state.optionsUser = data
            })
        });


    }


    componentDidMount() {
        console.log("props", this.props);
        this.setState({
            multiple: this.state.multiple = this.props.data,
            serachAPI: this.state.serachAPI = this.props.api
        })
    }

    handleChangeSelect(event) {
        console.log("event", event);
    }

    searchTaskDataKeyUp(e) {
        console.log("event", e);
        console.log("msg")
        this.setState({ isLoading: true });
        // makeAndHandleRequest(query)
        // .then(({options}) => {
        //   this.setState({
        //     isLoading: false,
        //     options,
        //   });
        // }); 
        if (this.state.serachAPI) {
            axios.post('http://localhost:3505/' + this.state.serachAPI, { searchkey: e })
                .then(response => {
                    console.log("response", response)
                    if (response.data.status == 1) {
                        this.setState({
                            options: this.state.options = response.data.data
                        })
                        console.log("response", this.state.options)
                    } else {
                        this.setState({
                            isLoading: false,
                            options,
                        });
                    }
                }).catch(error => {
                    console.log("error", error)
                    let options = [];
                    this.setState({
                        isLoading: false,
                        options,
                    });
                });
        } else {
            let options = [];
            this.setState({
                isLoading: false,
                options,
            });
        }
    }


    render() {
        return (
            <AsyncTypeahead
               
                id="my-typeahead-id"
                labelKey="name"
                minLength={1}
                onSearch={this.searchTaskDataKeyUp}
                placeholder="Search for a technologies..."
                onChange={this.handleChangeSelect}
                options={this.state.options}
                multiple={true}
            // renderMenuItemChildren={(option, props) => (
            //     <GithubMenuItem key={option.id} user={option} />
            // )}
            />
        );
    }
}

export default TypeAhead;