import React, { Component } from 'react';
import { fetchCharacter } from './API';
import PropTypes from 'prop-types';

const propTypes = {
    charID: PropTypes.string
}

class Character extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loading: undefined,
            characters: {},
            img: {},
            comics: {},
            series: {},
            urls: [],
        }
    }

    componentWillMount() {
        window.scrollTo(0),
            this.handleFetch()
    }

    handleFetch() {
        this.setState({ loading: true })
        fetchCharacter('characters', this.props.charID)
            .then(function (response) {
                this.setState({
                    character: response.data.results[0],
                    img: response.data.results[0].thumbnail,
                    comics: response.data.results[0].comics,
                    series: response.data.results[0].series,
                    urls: response.data.results[0].urls,
                    loading: false
                })
            })
    }

    render() {
        const {character, img, series, comics, urls, loading} = this.state

        const Loader = () => (
            <div className='loader'>
                <ReactLoader type='ball-scale-multiple' active={true} />
            </div>
        )

        return (
            <div>
                {loading && <Loader/>}
                
            </div>
        );
    }

}

Character.propTypes = propTypes
export default Character