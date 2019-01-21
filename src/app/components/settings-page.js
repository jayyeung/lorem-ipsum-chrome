import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

@inject('routeStore', 'settingsStore')
@observer
export default class SettingsPage extends Component {
	state = {
		...this.props.settingsStore.settings
	};

	componentWillMount() {
		this.props.settingsStore.resetChanges();
	}

	handleChange = ({target}, value) => {
		const key = target.name;

		if (target.min) target.value = Math.max(target.min, target.value);
		if (target.max) target.value = Math.min(target.max, target.value);

		// we (value !== false) b/c we
		// don't want booleans to pass
		if (!value && value !== false)
			value = target.value;
		this.props.settingsStore.commitChange(key, value);
		this.setState({...this.props.settingsStore.changes});
	}

	inputSelect = ({target}) => {target.select();}

	saveChange = () => {
		if (this.props.settingsStore.hasChanges)
			this.props.settingsStore.saveChanges();
	}

	render() {
		const { routeStore, settingsStore } = this.props;
		const settings = settingsStore.settings || {};

		return (
			<div className='c-modal-settings'>
				<div className='c-modal__panel'>
					<div className='o-media__fluid'>
						<div className='c-modal__title'>Settings</div>
					</div>

					<button className='u-mr-24'
					disabled={!settingsStore.hasChanges}
					onClick={this.saveChange}>
						Save
					</button>

					<button className='c-label c-label--link'
					onClick={() => routeStore.setRoute('')}>
						Return
					</button>
				</div>

				<div className='c-modal__container'>
					<div id='default-settings'>
						<div className='c-modal-settings__label'>
							Default Settings
						</div>

						<div className='u-mt-20'>
							{/* Paragraphs */}
							<input id='pgraphs' name='paragraphs'
							type='number' min='1' max='15'
							value={this.state['paragraphs']}
							onChange={this.handleChange} onFocus={this.inputSelect}/>
							<label htmlFor='pgraphs'>Paragraphs</label>

							{/* Words */}
							<input id='words' name='words'
							type='number' min='1' max='500' step='50'
							value={this.state['words']}
							onChange={this.handleChange} onFocus={this.inputSelect}/>
							<label htmlFor='words'>Words</label>
						</div>

						<div className='u-mv-20'>
							{/* Include <p> tags */}
							<input id='include-p' name='include-ptags' type='checkbox'
							defaultChecked={settings['include-ptags']}
							onChange={(e) => this.handleChange(e, e.target.checked)}/>
							<label htmlFor='include-p'>include &lt;p&gt; tags</label>
						</div>

						<div className='u-mb-40'>
							{/* Close on copy */}
							<input id='auto-close' name='auto-close' type='checkbox'
							defaultChecked={settings['auto-close']}
							onChange={(e) => this.handleChange(e, e.target.checked)}/>
							<label htmlFor='auto-close'>close extension on copy</label>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
