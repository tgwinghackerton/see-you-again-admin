import React from 'react';
import Header from "../components/Header";
import LeftCard from "../components/LeftCard";
import fb from '../components/firebase';


class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            focusedIndex: 0,
            mpiData: []
        }
    }

    componentWillMount() {
        let messagesRef = fb.database().ref('mpi').orderByKey().limitToLast(100);
        let i = 0;
        messagesRef.on('value', snapshot => {
            /* Update React state when message is added at Firebase Database */

            let mpiData = Object.keys(snapshot.val()).map(function (key) {
                let tempObj = snapshot.val()[key];
                tempObj.key = key;
                tempObj.index = i;
                i++;
                return tempObj;
            });

            this.setState({mpiData: mpiData});
        })

    }

    onCardClick(index) {
        // console.log(index);
        this.setState({focusedIndex: index});
        // this.forceUpdate();
    }

    setLeftCardListData() {
        console.log(this.state.mpiData);

        if(this.state.mpiData.length === 0){
            return <div></div>
        }

        return (
            this.state.mpiData.map((man) =>
                <LeftCard
                    onCardClick={this.onCardClick.bind(this)}
                    key={man.key}
                    index={man.index}
                    isActive={man.index === this.state.focusedIndex}

                    address={man.address}
                    age={man.age}
                    circumstanceOfOccurance={man.circumstanceOfOccurance}
                    dressMarks={man.dressMarks}
                    etc={man.etc}
                    gender={man.gender}
                    name={man.name}
                    physicalCharacteristics={man.physicalCharacteristics}
                    timeOfMissing={man.timeOfMissing}
                    writerKey={man.writerKey}
                />)
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
        if(this.state.mpiData.length === 0){
            return <div></div>
        }

        return (
            <div>
                <div>{this.state.mpiData[this.state.focusedIndex].address}</div>
                <div>{this.state.mpiData[this.state.focusedIndex].age}</div>
                <div>{this.state.mpiData[this.state.focusedIndex].circumstanceOfOccurance}</div>
                <div>{this.state.mpiData[this.state.focusedIndex].etc}</div>
                <div>{this.state.mpiData[this.state.focusedIndex].gender}</div>
                <div>{this.state.mpiData[this.state.focusedIndex].name}</div>
                <div>{this.state.mpiData[this.state.focusedIndex].physicalCharacteristics}</div>
                <div>{this.state.mpiData[this.state.focusedIndex].timeOfMissing}</div>
                <div>{this.state.mpiData[this.state.focusedIndex].writerKey}</div>
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