import React from 'react';
import { Link } from 'react-router-dom';

const Error = () => {
    return (
        <div>
            <h3>Pages Not Found.. <Link className='text-primary font-bold text-2xl' to='/'>Back To Home</Link></h3>
        </div>
    );
};

export default Error;