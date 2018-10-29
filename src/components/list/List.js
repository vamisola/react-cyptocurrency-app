import React from  'react';
import { handleResponse } from '../../helpers';
import {API_URL } from '../../config';
import Loading from '../common/Loading';
import Table from '../list/Table';
import '../list/Table.css';
import Pagination from './Pagination';

class List extends React.Component{
    constructor() {
        super();

        this.state = {
            loading: false,
            currencies: [],
            error: null,
            totalPage: 0,
            page: 1,
        };

        this.handlePaginationClick = this.handlePaginationClick.bind(this);
    }

    componentDidMount() {
        this.fetchCurrencies();
    }

    fetchCurrencies() {
        this.setState({
            loading: true
        });
        const {
            page
        } = this.state;

        fetch(`${API_URL}/cryptocurrencies?page=${page}&perPage=20`)
            .then(handleResponse)
            .then((data) => {
                console.log('Success', data);
                const {
                    currencies,
                    totalPages
                } = data;
                this.setState({
                    currencies,
                    totalPages,
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



    handlePaginationClick(direction) {
        let nextPage = this.state.page;
        //Increment nextPage if direction variable is next, otherwise decerement
        nextPage = direction === 'next' ? nextPage + 1 : nextPage - 1;
        /* 
        above code is the same as below:
            if (direction === 'next) {
                nextPage ++;
            }else{ nextPage --;}
        */
        this.setState({page: nextPage}, () => {
            //call fetchCurrencies function inside setState's callback
            //because we have to make sure first page state is updated
            this.fetchCurrencies();
        });
        
    }

    render() {

        const { loading, error, currencies, page, totalPages } = this.state;
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
            <div>
                <Table currencies={currencies}
                    renderChangePercent={this.renderChangePercent}
                />
                <Pagination 
                    page = {page}
                    totalPages = {totalPages}
                    handlePaginationClick={this.handlePaginationClick}
                />
            </div>
        );
    }
}

export default List;