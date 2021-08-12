import React from 'react';
import Character from './Character.js';

const CharacterRoute = ({ match }) => (
    <div>
        <Character charID={match.params.id} />
    </div>
)

export default CharacterRoute;