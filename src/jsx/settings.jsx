import React from 'react';
import { updateSettings, saveSettings } from '../js/redux/actions';
import { connect } from 'react-redux';

class Settings extends React.Component {
  constructor (props) {
    super(props);
    this.state = { savedSuccessful: false };
  }

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
        {
        <div className="choices">
          <div>
          {
            this.props.settings.initialized ?
            Object.keys(this.props.settings.settingValues).map(key => 
              <div className="checkbox option" key={key}>
                <input id={key + "-setting"} type="checkbox" checked={this.props.settings.settingValues[key]} 
                  onChange={() => this.props.updateSettings({ [key]: !this.props.settings.settingValues[key]})}/>
                <label htmlFor={key + "-setting"}>{this.generateSettingLabel(key)}</label>
              </div>
            ) :
            null
          }
          </div>
          <div>
            <button className="action" onClick={this.props.saveSettings}>Save</button>
          </div>
          {this.state.savedSuccessful ? <span>Save successful!</span> : null}
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
  updateSettings: newSetting => dispatch(updateSettings(newSetting)),
  saveSettings: () => dispatch(saveSettings())
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);