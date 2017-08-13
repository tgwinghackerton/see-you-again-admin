import React from 'react';

class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <nav>
                <div className="nav-wrapper green darken-3">
                    <a className="brand-logo center">SeeYouAgain 관리자</a>
                </div>
            </nav>
        );
    }
}

export default Header;