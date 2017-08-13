import React from 'react';

class LeftCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isActive: false,
            cardClassName: "collection-item grey-text text-darken-3"
        }
    }

    onClick() {
        this.props.onCardClick(this.props.index);
    }

    render() {
        var cardClassName = "collection-item grey-text text-darken-3";

        if (this.props.isActive === true) {
            cardClassName = "collection-item grey-text text-darken-3 green lighten-4 active";

        }
        return (
            <div>
                <div>
                    <a href="#!" className={cardClassName}
                       onClick={this.onClick.bind(this)}>
                        <div>{this.props.address}</div>
                        <div>{this.props.age}</div>
                        <div>{this.props.circumstanceOfOccurance}</div>
                        <div>{this.props.etc}</div>
                        <div>{this.props.gender}</div>
                        <div>{this.props.name}</div>
                        <div>{this.props.physicalCharacteristics}</div>
                        <div>{this.props.timeOfMissing}</div>
                        <div>{this.props.writerKey}</div>
                    </a>
                </div>
            </div>
        );
    }
}

export default LeftCard;