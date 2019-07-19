import React from 'react';
import axios from 'axios';
import { Table,  InputGroup, FormControl} from 'react-bootstrap';

const apiEndPoint = 'http://www.apilayer.net/api/live?access_key=4ffb1ec4a8f6f0ff22f90b1f31a982b1&format=1';

class LiveCC extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currencies: 'AUD',
            LiveData: []
        };
    }

    async initialize() {
        const { data: records } = await axios.get(apiEndPoint+'&currencies='+this.state.currencies);
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
        if(e.target.value.length >= 3) {
            this.state.currencies = e.target.value;
            this.initialize();
        }
    }

    render() {
        return (
          <div className="live-blocks">
              <h2 className="heading">Live Conversion Rates</h2>
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                    <InputGroup.Text>Currency to convert into </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl placeholder={this.state.currencies} onChange={this.handlerChangeCur} />
                </InputGroup>
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

export default LiveCC;