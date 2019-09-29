import React from 'react';
import { changeSettings } from '../js/redux/actions';
import { connect } from 'react-redux';

class Settings extends React.Component {
  generateSettingLabel (settingName) {
    let array = settingName.split("");
    if (array.length > 0) {
      array[0] = array[0].toUpperCase();
    }
    let label = [];
    array.map(char => {
      if (char === char.toUpperCase()) {
        label.push(" ");
      }
      label.push(char);
    });
    return label.join("");
  }

  render () {
    let saveSettings = e => {
      let updateFunc = this.props.initializeSettings;
      let xhr = new XMLHttpRequest();
      xhr.open('POST', 'https' + window.location.hostname + '/saveSettings');
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      xhr.onreadystatechange = function() {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
          let xhr2 = new XMLHttpRequest();
          xhr2.open('POST', 'https' + window.location.hostname + '/getSettings');
          xhr2.onreadystatechange = function() {
            if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
              updateFunc(xhr2.responseText);
            }
          }
          xhr2.send();
        }
      }
      xhr.send('settings=' + JSON.stringify(this.props.settings.settingValues));
    };
    return (
      <div className="setting wrapper">
        <h2>Settings</h2>
        {
        <div className="choices">
          <div>
          {
            this.props.settings.initialized ?
            Object.keys(this.props.settings.settingValues).map(key => 
              <div className="checkbox option" key={key}>
                <input id={key + "-setting"} type="checkbox" checked={this.props.settings.settingValues[key]} 
                  onChange={() => this.props.changeSettings({ setting: key, value: !this.props.settings.settingValues[key]})}/>
                <label htmlFor={key + "-setting"}>{this.generateSettingLabel(key)}</label>
              </div>
            ) :
            null
          }
          </div>
          <div>
            <button className="action" onClick={() => saveSettings()}>Save</button>
          </div>
        </div>
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  settings: state.settings
});

const mapDispatchToProps = dispatch => ({
  changeSettings: newSetting => dispatch(changeSettings(newSetting))
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);