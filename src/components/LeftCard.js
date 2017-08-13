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
        this.props.onCardClick(this.props.keyIndex);
    }

    render() {
        var cardClassName = "collection-item grey-text text-darken-3";

        if (this.props.isActive === true) {
            cardClassName = "collection-item grey-text text-darken-3 green lighten-4 active";

        }

        let acceptText = "미승인";
        let acceptColor = "#d61b1b";
        if (this.props.accepted) {
            acceptText = "승인됨";
            acceptColor = "#4286f4";
        }

        return (
            <div>
                <div>
                    <a href="#!" className={cardClassName}
                       onClick={this.onClick.bind(this)}>
                        <div className="leftCardContents">
                            <img className="leftCardImage" src={this.props.imageUrl}/>
                        </div>
                        <div className="leftCardContents">

                            <div style={{fontSize: 20, marginBottom: 10}}>{this.props.name} (<span>{this.props.age}
                                세</span>, <span>{this.props.gender}</span>)
                            </div>
                            <div style={{color: "#515151", marginBottom: -4}}>{this.props.address}</div>
                            <div style={{color: "#717171", fontSize: 10}}>{this.props.writerKey}님이 등록</div>
                        </div>

                        <div style={{color: acceptColor, textAlign: 'right', fontWeight:'bold'}}>
                            {acceptText}
                        </div>
                    </a>
                </div>
            </div>
        );
    }
}

export default LeftCard;