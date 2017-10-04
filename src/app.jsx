import React from 'react';
import PropTypes from 'prop-types';
import Clipboard from 'clipboard';
import moment from 'moment';
import FaGithub from 'react-icons/lib/fa/github';

import pkg from '../package.json';
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
  static childContextTypes = {
    reactIconBase: PropTypes.object
  };

  getChildContext() {
    return {
      reactIconBase: {
        size: 40,
      }
    }
  }
  render() {
    const date = moment(pkg.lastUpdated).format("ddd, MMM Do YYYY, h:mm:ss a");
    return (
      <div className="">

        <div className="grid grid-pad">
          <div className="cell text-center grid-pad">
            <h2>Object Literal to JSON</h2>
            <p>Last Updated <span className="pill">{date.toString()}</span> </p>
            <p>
              <a className="view-source" href="https://github.com/lwhiteley/literal-to-json">
                  <FaGithub />
              </a>
            </p>
            
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
                } catch (err) {
                  let message = '';
                  if (e.target.value){
                    message = err.message;
                  }
                  console.log(message)
                  this.setState({
                    disabled: 'disabled',
                  });
                  $('#json-container').html(`<span>${message}</span>`);
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
