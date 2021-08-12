import React from 'react';
import queryString from 'query-string';
import AllCharacters from './AllCharacters.js';

const AllCharactersRoute = ({ match, location, history }) => {
    const params = queryString.parse(location.search)
    return (
        <div>
            <AllCharacters
                page={parseInt(params.page, 10) || 1}
                term={params.query || undefined}
                match={match}
                history={history}
                location={location}
            />
        </div>
    );
}

export default AllCharactersRoute;
