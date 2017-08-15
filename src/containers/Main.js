import React from 'react';
import Header from "../components/Header";
import LeftCard from "../components/LeftCard";
import fb from '../components/firebase';
import axios from 'axios'
import moment from 'moment'

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            focusedKey: "",
            mpiData: []
        }
    }

    componentWillMount() {
        let mpiRef = fb.database().ref('mpi').orderByKey();
        let check = false;
        let tempThis = this;
        mpiRef.on('value', snapshot => {
            /* Update React state when message is added at Firebase Database */

            let mpiData = Object.keys(snapshot.val()).map(function (key) {
                let tempObj = snapshot.val()[key];
                tempObj.key = key;
                if (!check) {
                    tempThis.setState({focusedKey: tempObj.key});
                    check = true;
                }

                return tempObj;
            });

            this.setState({mpiData: mpiData});
        })

    }

    onCardClick(key) {
        this.setState({focusedKey: key});
    }

    setLeftCardListData() {

        if (this.state.mpiData.length === 0) {
            return <div></div>
        }

        return (
            this.state.mpiData.map((man) =>

                <LeftCard
                    onCardClick={this.onCardClick.bind(this)}
                    key={man.key}
                    keyIndex={man.key}
                    isActive={man.key === this.state.focusedKey}

                    accepted={man.accepted}
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
                    beforeUrl={man.beforeUrl}
                />
            )
        )
    }

    renderLeftCardList() {
        return (
            <div className="collection">
                {this.setLeftCardListData()}
            </div>

        )
    }

    testPredict(focusMan){
        let manRef = fb.database().ref('mpi').child(focusMan.key);
        // firebase update
        manRef.update({"afterUrl": "http://blog.ebaykorea.com/wp-content/uploads/2016/01/0129_G%EB%A7%88%EC%BC%93_%EC%84%A4%ED%98%84_10.jpg"})
    }

    testCancel(focusMan){
        let manRef = fb.database().ref('mpi').child(focusMan.key).child("afterUrl");
        // firebase delete
        manRef.remove();

    }

    onAccept(focusMan, isThisAccept) {
        let confirmMessage = "정말 승인하시겠습니까?";
        if (!isThisAccept) {
            confirmMessage = "정말 취소하시겠습니까?";
        }

        if (confirm(confirmMessage) === true) {
            let manRef = fb.database().ref('mpi').child(focusMan.key);
            // firebase update
            manRef.update({"accepted": isThisAccept})
        }

        if(isThisAccept){

            if(focusMan.gender==="남"){
                focusMan.gender = "male"
            } else {
                focusMan.gender = "female"
            }

            let missingTime = moment.unix(focusMan.timeOfMissing/1000);
            let currentTime = moment();

            let diff = currentTime.diff(missingTime, 'years');
            let currentAge = focusMan.age + diff;

            axios.post('http://163.180.117.38:2525/predict', {
                user_key: focusMan.key,
                orig_image_url: focusMan.beforeUrl,
                current_age: currentAge,
                gender: focusMan.gender,
                age: focusMan.age
            }).then((response) => {
                console.log(response);
                let manRef = fb.database().ref('mpi').child(focusMan.key);
                // firebase update
                manRef.update({"afterUrl": response.data.afterUrl});

            })
        } else {
            this.testCancel(focusMan)
        }

    }

    renderRightContents() {

        if (this.state.mpiData.length == 0) {
            return <div></div>
        }

        let focusMan;
        for (let i = 0; i < this.state.mpiData.length; i++) {
            let man = this.state.mpiData[i];
            if (man.key === this.state.focusedKey) {
                focusMan = man;
            }
        }

        return (
            <div>
                {focusMan.accepted ?
                    <div style={{position: "fixed", bottom: 10}}>
                        <a onClick={this.onAccept.bind(this, focusMan, false)}
                           className="waves-effect waves-light red lighten-1 btn">취소하기</a>
                    </div>
                    :
                    <div style={{position: "fixed", bottom: 10}}>
                        <a onClick={this.onAccept.bind(this, focusMan, true)}
                           className="waves-effect waves-light green darken-1 btn">승인하기</a>
                    </div>}


                <div className="rightContentsTitle">등록 사진</div>
                <img src={focusMan.beforeUrl} style={{
                    width: "auto", height: "auto",
                    maxWidth: 160,
                    maxHeight: 160
                }}/>
                <div className="rightContentsTitle">이름</div>
                <div>{focusMan.name}</div>

                <div className="rightContentsTitle">실종 장소</div>
                <div>{focusMan.address}</div>

                <div className="rightContentsTitle">나이</div>
                <div>{focusMan.age} 세</div>

                <div className="rightContentsTitle">발생 상황</div>
                <div>{focusMan.circumstanceOfOccurance}</div>

                <div className="rightContentsTitle">기타 사항</div>
                <div>{focusMan.etc}</div>

                <div className="rightContentsTitle">성별</div>
                <div>{focusMan.gender}</div>

                <div className="rightContentsTitle">신체 특징</div>
                <div>{focusMan.physicalCharacteristics}</div>

                <div className="rightContentsTitle">실종시각</div>
                <div>{focusMan.timeOfMissing}</div>

                <div className="rightContentsTitle">작성자</div>
                <div>{focusMan.writerKey}</div>
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