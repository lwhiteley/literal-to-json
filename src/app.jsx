import React from 'react';
import Clipboard from 'clipboard';
import moment from 'moment';

import 'grid-css/grid.min.css';
import './lib/overtrue-json-viewer/json-viewer.exec.js';
import './lib/overtrue-json-viewer/json-viewer.css';
import '../styles/index.less';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      literalText: null,
      json: '',
      jsonFormatted: '',
      disabled: 'disabled',
    }
  }
  componentDidMount() {
    new Clipboard('.btn-clip');
  }
  render() {
    const today = moment().format("ddd, MMM Do YYYY, h:mm:ss a");
    return (
      <div className="">

        <div className="grid grid-pad">
          <div className="cell text-center grid-pad">
            <h1>Object Literal to JSON</h1>
            <p>Last Updated <span className="pill">{today.toString()}</span> </p>
            <p>Enjoy!</p>
          </div>
        </div>

        <div className="grid">
          <div className="cell cell-width-50 grid-pad">
            <p>Paste an Object literal below!</p>
          </div>

          <div className="cell cell-width-50 grid-pad">

            <div className="grid">
              <div className="cell">
                <div className={`btn-clip btn ${this.state.disabled}`} data-clipboard-target="#json-clip">
                  Copy
                </div>
              </div>

              <div className="cell">
                <div className={`btn-clip btn ${this.state.disabled}`} data-clipboard-target="#json-clip-formatted">
                  Copy Formatted
                </div>
              </div>
            </div>

          </div>
        </div>

        <div className="grid">
          <div className="cell cell-width-50 grid-pad">
            <textarea
              ref="literal"
              className="form-control full-width"
              rows="30"
              onChange={e => {
                let jsLiteral;

                try {
                  eval(`jsLiteral=${e.target.value}`)
                  const json = JSON.stringify(jsLiteral);
                  this.setState({
                    disabled: !jsLiteral ? 'disabled' : '',
                    json,
                    jsonFormatted: JSON.stringify(jsLiteral, null, 2),
                  });
                  $('#json-container').jsonview(json);
                } catch (e) {
                  this.setState({
                    disabled: 'disabled',
                  });
                  $('#json-container').html('');
                }

              }} />
          </div>

          <div className="cell cell-width-50 grid-pad">



            <div id="json-container"></div>
          </div>

        </div>

        <form className="form-horizontal">

          <textarea
            id="json-clip-formatted"
            className="full-width vs-hidden "
            value={this.state.jsonFormatted} />
          <div id="json-clip" className="vs-hidden">{this.state.json}</div>

        </form>
      </div>
    )
  }
}
