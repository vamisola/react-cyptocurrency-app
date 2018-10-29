import React from 'react';
import { API_URL } from '../../config';
import { handleResponse }  from '../../helpers';
import './Search.css';
import Loading from './Loading';


class Search extends React.Component {

    constructor(){
        super();

        this.state = {
            searchQuery: '',
            loading: false,
        }
        // this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }
    // handleSubmit(event){
    //     event.preventDefault();

    // }

    handleChange(event){
        const searchQuery = event.target.value;

        this.setState({ searchQuery });

        //If searchQuery is not present dont send request to the server
        if(!searchQuery){
            return '';
        }

        this.setState ({ loading: true });

        fetch(`${API_URL}/autocomplete?searchQuery=${searchQuery}`)
        .then(handleResponse)
        .then((result) => {
            console.log(result);
            this.setState({
                loading: false
            });
        });

        // if(inputName === 'searchQuery') {
        //     this.setState({searchQuery: inputValue});
        // }else if (inputName === 'firstName') {
        //     this.setState({firstname: inputValue});
        // }
    }
    render(){
        const { loading } = this.state;
        return (
            <div className="Search">
                <span className="Search-icon"/>
                <input 
                className="Search-input"
                placeholder="Currency name"
                type="text"
                onChange={this.handleChange}/>
                {loading && 
                <div className="Search-loading">
                    <Loading 
                        width='12px'
                        height='12px'
                    />
                </div>}
            </div>
        )
    }
}

export default Search;