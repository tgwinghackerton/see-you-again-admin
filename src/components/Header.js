import React from 'react';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            toggle : false
        }
    }

    onLeftClick(toggle){
        this.props.onHeaderLeftClick(toggle);
        this.setState({toggle: !toggle})
    }

    render() {
        return (
            <nav>
                <div className="nav-wrapper green darken-3">
                    <ul className="left" id="headerLeft">
                        <li><a href="#" onClick={this.onLeftClick.bind(this, this.state.toggle)}><i className="material-icons">view_list</i></a></li>
                    </ul>
                    <a className="brand-logo center">SeeYouAgain 관리자</a>
                </div>
            </nav>
        );
    }
}

export default Header;