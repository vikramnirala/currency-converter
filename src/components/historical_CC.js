import React from 'react';
import axios from 'axios';
import { Table,  InputGroup, FormControl} from 'react-bootstrap';
import DatePicker from "react-datepicker";
import moment from 'moment';
import "react-datepicker/dist/react-datepicker.css";

const apiEndPoint = 'http://www.apilayer.net/api/historical?access_key=4ffb1ec4a8f6f0ff22f90b1f31a982b1&format=1';

class HistoricalCC extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            currencies: 'AUD,INR,CAD',
            LiveData: []
        };
        this.handlerChangeDate = this.handlerChangeDate.bind(this);
        this.handlerChangeCur = this.handlerChangeCur.bind(this);
    }
    async initialize() {
        let d = this.state.date;
        d = moment(d).format('YYYY-MM-DD');
        const { data: records } = await axios.get(apiEndPoint+'&date='+d+'&currencies='+this.state.currencies);
        this.setState({
            LiveData: records.quotes
        });
    }

    
    
    liveDataList() {
        var datas = this.state.LiveData;
        var listItems = Object.entries(datas).map(([make, type]) =>
            <tr className="item" key={Math.random()}>
                <td className="order_id">{make}</td>
                <td className="order_id">{type}</td>
            </tr>
        );
        return listItems;
    }
    
    componentDidMount() {
        this.initialize();
    }

    handlerChangeCur = (e) => {
        console.log(e.target.value.length);
        if(e.target.value.length >= 3) {
            this.setState({
                currencies: e.target.value
            });
            this.initialize();
        }
    }

    async handlerChangeDate(date) {
        var d = moment(date).format('YYYY-MM-DD');
        this.setState({
            date: date,
        });
        console.log(this.state.date);
        const { data: records } = await axios.get(apiEndPoint+'&date='+d+'&currencies='+this.state.currencies);
        this.setState({
            LiveData: records.quotes
        });
    }

    render() {
        return (
          <div className="live-blocks">
              <h2 className="heading">Historical Conversion Rates</h2>
              <div className="row">
                <InputGroup className="mb-3 col-sm-6">
                    <InputGroup.Prepend>
                    <InputGroup.Text>Currencies </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl placeholder={this.state.currencies} onChange={this.handlerChangeCur} />
                </InputGroup>

                <InputGroup className="mb-3 col-sm-6">
                    <InputGroup.Prepend>
                        <InputGroup.Text>Date </InputGroup.Text>
                    </InputGroup.Prepend>
                    <DatePicker className="form-control"
                        selected={this.state.date}
                        onChange={this.handlerChangeDate}
                        maxDate={new Date()}
                    />
                </InputGroup>
                </div>
              <Table>
                <thead>
                <tr>
                    <th>Conversion</th>
                    <th>Live Rates</th>
                </tr>
                </thead>
                <tbody>
                    {this.liveDataList()}
                </tbody>
            </Table>
              
          </div>
        )
      }
}

export default HistoricalCC;