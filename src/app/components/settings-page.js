import React, { Component } from 'react';
import { computed } from 'mobx';
import { inject, observer } from 'mobx-react';

@inject('routeStore', 'settingsStore')
@observer
export default class SettingsPage extends Component {
	handleChange = ({target}, value) => {
		const key = target.name;
		if (!value) value = target.value;
		this.props.settingsStore.commitChange(key, value);
	}

	saveChange = () => {
		if (!this.props.settingsStore.hasChanges) return;
		this.props.settingsStore.saveChanges();
	}

	render() {
		const { routeStore, settingsStore } = this.props;
		const { settings } = settingsStore;

		return (
			<div className='c-modal-settings'>
				<div className='c-modal__panel'>
					<div className='o-media__fluid'>
						<div className='c-modal__title'>Settings</div>
					</div>

					<button className='u-mr-24' disabled={!settingsStore.hasChanges}
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
							<input id='pgraphs' name='paragraphs'
							type='number' min='1' max='15'
							onChange={this.handleChange}/>
							<label htmlFor='pgraphs' className='u-mr-20'>Paragraphs</label>

							<input id='words' name='words'
							type='number' min='1' max='500' step='50'
							onChange={this.handleChange}/>
							<label htmlFor='words'>Words</label>
						</div>

						<div className='u-mv-20'>
							<input id='include-p' name='include-ptags' type='checkbox'
							onChange={(e) => this.handleChange(e, e.target.checked)}/>
							<label htmlFor='include-p'>include &lt;p&gt; tags</label>
						</div>

						<div className='u-mb-40'>
							<input id='auto-close' type='checkbox'/>
							<label htmlFor='auto-close'>close extension on copy</label>
						</div>
					</div>

					<div id='context-settings'>
						<div className='c-modal-settings__label'>
							Quick Paste Settings
						</div>

					</div>
				</div>
			</div>
		);
	}
}
