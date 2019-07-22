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
    return (
      <div className="setting wrapper">
        <h2>Settings</h2>
        <div className="choices">
          {
            Object.keys(this.props.settings).map(key => 
              <div className="checkbox option" key={key}>
                <input id={key + "-setting"} type="checkbox" checked={this.props.settings[key]} 
                  onChange={() => this.props.changeSettings({ setting: key, value: !this.props.settings[key]})}/>
                <label htmlFor={key + "-setting"}>{this.generateSettingLabel(key)}</label>
              </div>
            )
          }
        </div>
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