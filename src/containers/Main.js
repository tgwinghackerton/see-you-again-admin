import React from 'react';
import Header from "../components/Header";
import LeftCard from "../components/LeftCard";

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            focusedIndex: 0,
            tempData: [
                {
                    index: 0,
                    name: "김", image: "http://i.imgur.com/iwMqYoA.jpg",
                    missingPlace: "수원시 영통구 영통동 1018-6 303호", character: "키 180, 눈 작음",
                    comment: "꼭 찾아주세요!"
                },
                {
                    index: 1,
                    name: "성", image: "http://i.imgur.com/iwMqYoA.jpg",
                    missingPlace: "수원시 영통구 영통동 1018-6 303호", character: "키 180, 눈 작음",
                    comment: "꼭 찾아주세요!"
                },
                {
                    index: 2,
                    name: "최", image: "http://i.imgur.com/iwMqYoA.jpg",
                    missingPlace: "수원시 영통구 영통동 1018-6 303호", character: "키 180, 눈 작음",
                    comment: "꼭 찾아주세요!"
                },
                {
                    index: 3,
                    name: "조", image: "http://i.imgur.com/iwMqYoA.jpg",
                    missingPlace: "수원시 영통구 영통동 1018-6 303호", character: "키 180, 눈 작음",
                    comment: "꼭 찾아주세요!"
                },
                {
                    index: 4,
                    name: "만", image: "http://i.imgur.com/iwMqYoA.jpg",
                    missingPlace: "수원시 영통구 영통동 1018-6 303호", character: "키 180, 눈 작음",
                    comment: "꼭 찾아주세요!"
                }
            ]
        }
    }

    onCardClick(index){
        // console.log(index);
        this.setState({focusedIndex: index});
        this.forceUpdate();
    }

    setLeftCardListData() {
        // console.log(this.state.focusedIndex);
        return (
            this.state.tempData.map((man) =>
                <LeftCard
                    onCardClick={this.onCardClick.bind(this)}
                    key={man.index}
                    index={man.index}
                    isActive={man.index === this.state.focusedIndex}
                    name={man.name}
                    image={man.image}
                    missingPlace={man.missingPlace}
                    character={man.character}
                    comment={man.comment}/>)
        )
    }

    renderLeftCardList() {
        return (
            <div className="collection">
                {this.setLeftCardListData()}
            </div>

        )
    }

    renderRightContents() {
        return (
            <div>
                <div>{this.state.tempData[this.state.focusedIndex].name}</div>
                <div>{this.state.tempData[this.state.focusedIndex].image}</div>
                <div>{this.state.tempData[this.state.focusedIndex].missingPlace}</div>
                <div>{this.state.tempData[this.state.focusedIndex].character}</div>
                <div>{this.state.tempData[this.state.focusedIndex].comment}</div>
            </div>
        )
    }

    render() {
        return (
            <div>
                <Header/>

                <div className="leftCardList">
                    {this.renderLeftCardList()}
                </div>

                <div className="rightContents">
                    {this.renderRightContents()}
                </div>
            </div>
        );
    }
}

export default Main;