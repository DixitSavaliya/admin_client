import React, { Fragment } from 'react';
import { AsyncTypeahead, Typeahead } from 'react-bootstrap-typeahead';
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
            selected: [],
            tId: []
        }
        this.searchTaskDataKeyUp = this.searchTaskDataKeyUp.bind(this);
        this.handleChangeSelect = this.handleChangeSelect.bind(this);

        EventEmitter.subscribe('tname', (data) => {
            this.setState({
                tId: this.state.tId = data
            })
            console.log("tid", this.state.tId);
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
        EventEmitter.dispatch('tgarray', event);
    }

    searchTaskDataKeyUp(e) {
        this.setState({ isLoading: this.state.isLoading = true });
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
        console.log("tId", this.state.tId);
        return (
            <div>
                {
                    this.state.tId.length ? (
                        <AsyncTypeahead
                            id="my-typeahead-id"
                            labelKey="name"
                            selected={this.state.tId}
                            onSearch={this.searchTaskDataKeyUp}
                            placeholder="Search for a technologies..."
                            onChange={this.handleChangeSelect}
                            options={this.state.options}
                            multiple={true}
                        />
                    ) : (
                            <AsyncTypeahead
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