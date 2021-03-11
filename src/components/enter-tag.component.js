import React, {Component} from 'react';
import axios from 'axios';
import Collapsible from 'react-collapsible';
import reactDom from 'react-dom';
const ReactDOM = require('react-dom');

const URL = "https://api.stackexchange.com/2.2/questions";

export default class SearchTags extends Component{
    constructor(props){
        super(props);

        //here we bind the methods we wrote down there to use the correct this
        this.onChangeTags = this.onChangeTags.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeQuery = this.onChangeQuery.bind(this);
        //you don't declare variables in react like you do in javascript, instead, you make a state and 
        //declare and manipulate variables in a state. This way, whenever a state is updated, react updates the webpage.
        this.state = {
            tags: '',
            query: 'Newest'
        }
    }

    onChangeTags(e) {
        this.setState({
            tags: e.target.value
        })
    }

    onChangeQuery(e) {
        this.setState({
            query: e.target.options[e.target.options.selectedIndex].value
        })
    }


    async onSubmit(e) {
        e.preventDefault();

        var ts = Math.floor((Date.now()/1000) - 604800)

        var query = URL

        var both = false

        if(this.state.tags===''){
            reactDom.render(<h3 style={{color:"red"}}><b>Please Enter Tags To Search</b></h3>, document.getElementById("question_display"));
            return
        }

        if(this.state.query==='Newest'){
            query = URL + "?order=desc&sort=creation&site=stackoverflow&filter=!)rTkraPYPefwELKox66q&tagged=" + this.state.tags + "&fromdate=" + ts;
        }
        else if (this.state.query==='Most Voted'){
            query = URL + "?order=desc&sort=votes&site=stackoverflow&filter=!)rTkraPYPefwELKox66q&tagged=" + this.state.tags + "&fromdate=" + ts; 
        }
        else if (this.state.query==='Both'){
            query = URL + "?order=desc&sort=creation&site=stackoverflow&filter=!)rTkraPYPefwELKox66q&tagged=" + this.state.tags + "&fromdate=" + ts;
            both = true;
        }



            
        axios.get(query)
                .then(
                    async (res) => {
                            function compareByDate(a,b){
                                if (a.creation_date > b.creation_date){
                                    return -1
                                }
                                else if (a.creation_date < b.creation_date){
                                    return 1
                                }
                                else{
                                    return 0
                                }
                            }

                            var resItems = []

                            var str = "this is supposed to happen first";
                            console.log(str)
                            if (both){
                                var res2 = await axios.get(URL + "?order=desc&sort=votes&site=stackoverflow&filter=!)rTkraPYPefwELKox66q&tagged=" + this.state.tags + "&fromdate=" + ts)
                                for(var i = 0; i < Math.min(10, res2.data.items.length); i++){
                                    resItems.push(res2.data.items[i])
                                }
                            }
                            
                            for(var i = 0; i < Math.min(10, res.data.items.length); i++){
                                resItems.push(res.data.items[i])
                            }

                            resItems.sort(compareByDate);

                            return resItems
                        }
                    )
                .then(
                    resItems => {
                        console.log("This is supposed to happen second");
                        var i;
                        var quesList = []


                        if(resItems.length>0){

                            for(i=0; i< resItems.length; i++){
                                var comments = [];
                                comments.push(<div style={{alignItems: "center"}}><b>No Comments yet!</b></div>);

                                //question comments
                                if(resItems[i].comments != undefined){
                                    comments.pop();
                                    for(var j = resItems[i].comments.length-1; j >= 0; j--){
                                        comments.push(
                                            <div>
                                                <div style={{border: "2px solid grey", color: 'grey'}}> <i>Created: {getDateFromTimestamp( resItems[i].comments[j].creation_date)} | Votes: {resItems[i].comments[j].score}</i></div>
                                                <div
                                                    style = {{borderBottom: "2px solid grey", backgroundColor: '#F4F4F4'}}
                                                    dangerouslySetInnerHTML={{__html: resItems[i].comments[j].body}}></div>
                                            </div>
                                        )
                                    }
                                }

                                //answers
                                var answers = [];
                                answers.push(<div style={{alignItems: "center"}}><b>No Answers yet!</b></div>);
                                if(resItems[i].answers != undefined){
                                    answers.pop();
                                    for(var j = resItems[i].answers.length-1; j >= 0; j--){
                                        var answerComments = [];
                                        answerComments.push(<div style={{alignItems: "center"}}><b>No Comments for this answer yet!</b></div>)
                                        if(resItems[i].answers[j].comments != undefined){
                                            answerComments.pop();
                                            for(var k = resItems[i].answers[j].comments.length-1; k >= 0; k--){
                                                answerComments.push(
                                                <div>
                                                    <div style={{border: "2px solid grey", color: 'grey'}}> <i>Created: {getDateFromTimestamp( resItems[i].answers[j].comments[k].creation_date)} | Votes: {resItems[i].answers[j].comments[k].score}</i></div>
                                                    <div
                                                        style = {{borderBottom: "2px solid grey", backgroundColor: '#F4F4F4'}}
                                                        dangerouslySetInnerHTML={{__html: resItems[i].answers[j].comments[k].body}}></div>
                                                </div>
                                                )
                                            }
                                        }
                                        answers.push(
                                            <div>
                                                <div style={{border: "2px solid grey", color: 'grey'}}> <i>Created: {getDateFromTimestamp( resItems[i].answers[j].creation_date)} | Votes: {resItems[i].answers[j].score}</i></div>
                                                <div
                                                    style = {{borderBottom: "2px solid grey", backgroundColor: '#F4F4F4'}}
                                                    dangerouslySetInnerHTML={{__html: resItems[i].answers[j].body}}></div>
                                                <Collapsible style={{borderBottom: '4px solid grey'}} trigger="• Collapsible: Answer Comments" triggerStyle={{display: 'flex', justifyContent: 'center', textAlign: 'center', alignSelf: 'center', alignItems: 'center', fontWeight: 'bold', cursor: 'pointer', backgroundColor: '#FA8072', width:'100%'}}>
                                                    {answerComments}
                                                </Collapsible>
                                                <br/>
                                            </div>
                                        );

                                    }
                                }

                                function getDateFromTimestamp(unixTimestamp){
                                    var date = new Date(unixTimestamp * 1000);
                                    
                                    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
                                    var year = date.getFullYear();
                                    var month = months[date.getMonth()];
                                    var date = date.getDate();
                                    var result = date + ' ' + month + ' ' + year;
                                    return result;
                                }

                                var Trigger = <div><b>•Collapsible: {resItems[i].title}</b> <i>Created: {getDateFromTimestamp(resItems[i].creation_date)} | votes: {resItems[i].score}</i></div>

                                //questions
                                quesList.push(
                                    <div>
                                        <Collapsible style={{marginBottom: "5px"}} trigger={Trigger} triggerStyle={{display: 'flex', cursor: 'pointer', backgroundColor: '#CDCDCD', width:'100%'}}>
                                            <div style={{backgroundColor: '#F4F4F4'}}
                                                dangerouslySetInnerHTML={{
                                                    __html: resItems[i].body
                                                }}></div>
                                                <Collapsible trigger="• Collapsible: Comments" triggerStyle={{display: 'flex', justifyContent: 'center', textAlign: 'center', alignSelf: 'center', alignItems: 'center', fontWeight: 'bold', cursor: 'pointer', backgroundColor: '#00CDCD', width:'100%'}}>
                                                    {comments}
                                                </Collapsible>

                                                <Collapsible trigger="• Collapsible: Answers" triggerStyle={{display: 'flex', justifyContent: 'center', textAlign: 'center', alignSelf: 'center', alignItems: 'center', fontWeight: 'bold', cursor: 'pointer', backgroundColor: '#DC143C', width:'100%'}}>
                                                    {answers}
                                                </Collapsible>
                                                <br/>
                                        </Collapsible>
                                        <br/>
                                    </div>
                                )
                            }
                            
                            var el = (<div style= {{textAlign: "left"}}>{quesList}</div>)
                            ReactDOM.render(el, document.getElementById('question_display'));
                        }
                        else{
                            var el = (<div><h3>No Results Found!</h3></div>)
                            ReactDOM.render(el, document.getElementById('question_display'));
                        }
                })
    }
    
    render() {
        return(
            <div style={{textAlign: "center"}}>
                <br/><br/>
                <h3>
                    Search Tags
                </h3>
                <form onSubmit={this.onSubmit}>
                    <div className='form-group'>
                        <label><b>Tags:</b> <br /><span>(enter  colon (';'') separated values for multiple tags)</span></label>
                        <input type="text"
                            className="form-control"
                            value={this.state.tags}
                            onChange={this.onChangeTags}
                            style={{margin: "auto", width: "30%", border: "1px solid grey", padding: "2px"}}/>
                    </div>
                    <div className='form-group'>
                        <label><b>Select query type:</b> </label> <br />
                        <select id="query_select" name="query_select" className="form-control" onChange={this.onChangeQuery} style={{margin: "auto", width: "30%", border: "1px solid grey", padding: "2px"}}>
                            <option value="Newest">Newest</option>
                            <option value="Most Voted">Most Voted</option>
                            <option value="Both">Both</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Search Tag" className="btn btn-primary" />
                    </div>
                </form>
                <br />
                <br />
                <div id='question_display' style={{margin: "auto", width: "90%", padding: "1px"}}>
                </div>
            </div>
        )
    }
}