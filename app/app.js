import React,{Component} from 'react';
import Bar from './component/Bar/Bar.js'
import './app.less'
class App extends Component{
    constructor(){
        super();
        this.state={
            r:110,
            g:20,
            b:130
        }
        this.setColor=(this.setColor).bind(this);
        //三个Bar的实例
        this.bars=["r","g","b"].map((item,index)=>{
            return <Bar key={index} v={this.state[item]} color={item} setColor={this.setColor} />
        })
    }
    setColor(color,value){
        this.setState({[color]: value});

        console.log(this.state);
    }
    render(){
        return(<div>
            <div className="box" style={{"backgroundColor": `rgb(${this.state.r},${this.state.g},${this.state.b})`}}></div>
            {this.bars}
            </div>);

        }
}
export default App;