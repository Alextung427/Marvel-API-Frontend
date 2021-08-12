import React, { Component } from 'react';
import { fetchAllCharacters } from './API';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Pagination from 'react-paginate';
import { Loader as ReactLoader } from 'react-loader-spinner';
import './AllCharacters.scss';

const propTypes = {
    className: PropTypes.string,
    id: PropTypes.number,
    name: PropTypes.string,
    img: PropTypes.object,
    description: PropTypes.string,
    page: PropTypes.number,
    term: PropTypes.string
}

const defaultProps = {
    className: '',
    page: 1
}

class AllCharacters extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loading: undefined,
            characters: [],
            limit: 10,
            inputTerm: undefined
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handlePageChange = this.handlePageChange.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        window.scrollTo(0)
        this.handleFetch(nextProps.page, nextProps.term)
    }

    componentWillMount() {
        this.handleFetch(this.props.page, this.props.term)
    }

    handlePageChange(pageNum) {
        this.props.history.push(`?page=${pageNum}`)
    }

    handleChange(event) {
        this.setState({ inputTerm: event.target.value })
    }

    handleSubmit(event) {
        event.preventDefault()
        this.props.history.push(`?query=${this.state.inputTerm}`)
    }

    handleFetch(page, term) {
        const LIMIT = 10
        const defaultOp = { offset: (LIMIT * (page - 1)) }
        const searchOp = term ? { nameStartsWith: term } : null
        let mergedOp = Object.assign(defaultOp, searchOp)
        this.setState({ loading: true })
        fetchAllCharacters('characters', mergedOp)
            .then(function (response) {
                this.setState({
                    characters: response.data.results,
                    offset: response.data.offset,
                    limit: response.data.limit,
                    total: response.data.total,
                    count: response.data.count,
                    laoding: false
                })
            })
    }

    render() {
        // const {characters, loading} = this.state
        // if (this.state.total === 0){
        //     return (
        //         <div>
        //             <head tag = {h2}>Sorry No Results Found</head>
        //         </div>
        //         )
        // }
        const Container = ({ children, classNames }) => (
            <div className={`container-fluid ${classNames}`}>
                {children}
            </div>
        )

        const Loader = () => (
            <div className='loader'>
                <ReactLoader type='ball-scale-multiple' active={true} />
            </div>
        )

        const DataCard = ({ id, name, img, description, baseLink }) => (
            <div className='col-lg-2 col-md-3 col-sm-4 col-xs-6 card-wrapper'>
                <div className='card-inner'>
                    <Link to={`${baseLink}/${id}`}>
                        <div className='card-img' style={{ backgroundImage: `url(${img.path}.${img.extension})` }} />
                        <div className='card-title'>{name}</div>
                    </Link>
                    <div className='card-description'>
                        {description ?
                            description
                            :
                            'No description provided'
                        }
                    </div>
                </div>
            </div>
        )

        const SearchForm = ({ handleSubmit, handleChange, placeholder }) => {
            return (
                <form className='form-horizontal' onSubmit={handleSubmit}>
                    <div className='form-group'>
                        <div className='row mlr-0'>
                            <div className='col-sm-10'>
                                <input
                                    type='text'
                                    className='form-control'
                                    placeholder={placeholder}
                                    onChange={handleChange}
                                    style={{ marginBottom: '5px' }}
                                />
                            </div>
                            <div className='col-sm-2'>
                                <button className='btn btn-block btn-warning' type='submit'>SEARCH</button>
                            </div>
                        </div>
                    </div>
                </form>
            )
        }

        return (
            <Container>
                <div className="AllCharacters">
                    <h1 className='Title'>
                        MARVEL CHARACTERS
                    </h1>
                    <SearchForm
                        handleChange={this.handleChange}
                        handleSubmit={this.handleSubmit}
                        placeholder={'Enter Character Name'}
                    />
                    <p>
                        {this.state.loading && <Loader />}
                        {this.state.characters.map(({ id, name, thumbnail, description }, i) => (
                            <DataCard
                                key={i}
                                id={id}
                                name={name}
                                img={thumbnail}
                                description={description}
                                baseLink={'/characters'}
                            />
                        ))}
                    </p>
                    <p className='Center Text'>
                        <Pagination
                            onChange={this.handlePageChange}
                            activePage={this.props.page}
                            itemsCountPerPage={this.state.limit}
                            totalItemsCount={this.state.total || 0}
                            pageRangeDisplayed={5}
                            hideDisabled={true}
                        />
                    </p>
                </div>
            </Container>

        );
    }



}

AllCharacters.propTypes = propTypes
AllCharacters.defaultProps = defaultProps
export default AllCharacters