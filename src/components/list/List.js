import React from  'react';
import { handleResponse } from '../../helpers';
import {API_URL } from '../../config';
import Loading from '../common/Loading';
import Table from '../list/Table';
import './Table.css';
class List extends React.Component{
    constructor() {
        super();

        this.state = {
            loading: false,
            currencies: [],
            error: null,
        };
    }

    componentDidMount() {
        this.setState({ loading: true});
        fetch(`${API_URL}/cryptocurrencies?page=1&perPage=20`)
            .then(handleResponse)
            .then((data) => {
                console.log('Success', data);
                this.setState({ 
                    currencies: data.currencies, 
                    loading: false
                });
            })
            .catch((error) => {
                this.setState({
                    error: error.message, 
                    loading: false
                });
            });
    }

    renderChangePercent(percent) {
        if (percent > 0) {
            return <span className="percent-raised">{percent}% &uarr;</span>
        } else if(percent < 0){
            return <span className="percent-fallen">{percent}% &darr;</span>
        }else {
            return <span>{percent}</span>
        }
    }

    render() {

        const { loading, error, currencies } = this.state;
        /* above is the same as below:
            const loading = this.state.loading;
            const error = this.state.error;
            const currencies = this.state.currencies;
        */
        //render only lading component, if loading state is set to true
        if(loading){
            return <div className="loading-container"><Loading /></div>
        }
        //render only error message, if error occured white fetching data
        if(error){
            return <div className="error">{this.state.error}</div>
        }

        return (
            <Table currencies={currencies}
                renderChangePercent={this.renderChangePercent}
            />
        );
    }
}

export default List;