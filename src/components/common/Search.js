import React from 'react';
import { withRouter } from 'react-router-dom';
import { API_URL } from '../../config';
import { handleResponse }  from '../../helpers';
import './Search.css';
import Loading from './Loading';


class Search extends React.Component {

    constructor(){
        super();

        this.state = {
            searchResults: [],
            searchQuery: '',
            loading: false,
        }
        // this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDirect = this.handleDirect.bind(this);

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
            this.setState({
                loading: false,
                searchResults: result,
            });
        });

        // if(inputName === 'searchQuery') {
        //     this.setState({searchQuery: inputValue});
        // }else if (inputName === 'firstName') {
        //     this.setState({firstname: inputValue});
        // }
    }

    handleDirect(currencyId) {
        //Clear input value and close autocomplete container
        //By clearing searchQuery state;
        this.setState({
            searchQuery: '',
            searchResults: []
        });

        this.props.history.push(`/currency/${currencyId}`)
    }

    renderSearchResults() {
        const { searchResults, searchQuery, loading } = this.state;

        if(!searchQuery){
            return '';
        }

        if(searchResults.length > 0) {
            return (
                <div className="search-result-container">
                    {searchResults.map(result => (
                        <div 
                            key={result.id}
                            className="Search-result"
                            onClick={()=>this.handleDirect(result.id)}
                        >
                            {result.name} ({result.symbol})
                        
                        </div>
                    ))}

                </div>
            )
        }

        if(!loading) {
            return(
                <div className="Search-result-container">
                    <div className="Search-no-result">
                        No results found.
                    </div>
                </div>
            )
        }
    }
    render(){
        const { loading, searchQuery } = this.state;
        return (
            <div className="Search">
                <span className="Search-icon"/>
                <input 
                className="Search-input"
                placeholder="Currency name"
                type="text"
                onChange={this.handleChange}
                value={searchQuery}
            />
            {loading && 
                <div className="Search-loading">
                    <Loading 
                        width='12px'
                        height='12px'
                    />
                </div>}

                {this.renderSearchResults()}
            </div>
        )
    }
}

export default withRouter (Search);