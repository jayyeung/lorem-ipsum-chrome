import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

@inject('routeStore')
@observer
export default class MainPage extends Component {
	state = {
		selectedCopy: false,
		copyOutput: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maiores officia rem nisi alias! Rerum expedita, dicta exercitationem iure soluta veniam esse praesentium corporis! Minima ipsam quasi eum commodi autem maiores nulla quo ex, numquam distinctio saepe quod dignissimos culpa quas. Fuga, fugit. Facere voluptatibus molestiae excepturi laudantium quis? Aliquam consectetur quam cumque iste cupiditate consequatur iure, aspernatur, numquam facilis nisi voluptatibus sed eveniet perferendis quae quibusdam deleniti repudiandae ab possimus. Aliquid eligendi omnis, consequatur veniam iste sequi similique nesciunt adipisci earum maxime cupiditate animi sapiente qui amet minima rerum. Quaerat ad, culpa quasi assumenda molestias explicabo recusandae officia esse nostrum facilis, saepe deserunt sunt animi expedita quam similique labore repellendus itaque eum? Consectetur quos molestias numquam nesciunt animi obcaecati, accusantium nulla asperiores! Sunt minima sint nulla suscipit. Minima veniam sed ea in dolor est maxime, blanditiis repudiandae sequi a odio, explicabo eos, quo illo aliquam animi eaque sit neque repellendus voluptatem. Optio nemo tempora cum blanditiis tempore dignissimos corrupti modi, reprehenderit deleniti consequuntur dolorem fuga ratione reiciendis pariatur nisi temporibus eaque quas nam soluta velit quis similique tenetur. Amet sapiente nesciunt, et atque blanditiis qui nihil perferendis temporibus, tempora, debitis iure deleniti similique modi labore. Numquam quidem itaque sint laudantium?'
	};

	textArea = React.createRef();
	componentDidMount() {
		// onSelect doesn't work with ShadowDOM due to
		// event bubbling issues — Manually adding event
		(this.textArea).current.addEventListener('select', this.onSelectCopy);
	}

	selectAllCopy = () => { (this.textArea).current.select(); }
	onUnselectCopy = () => { this.setState({selectedCopy: false}); }

	onSelectCopy = ({target}) => {
		const copyLen = (this.state.copyOutput).length;
		const selStart = target.selectionStart;
		const selEnd = target.selectionEnd;

		if ((selStart === 0 && selEnd === copyLen) || (selStart === selEnd))
			this.setState({selectedCopy: false});
		else this.setState({selectedCopy: true});
	}

	copyText = () => {
		if (!this.state.selectedCopy)
			(this.textArea).current.select();
		document.execCommand('copy');
	}

	render() {
		const { routeStore } = this.props;
		const { selectedCopy } = this.state;

		return (
			<div className='c-modal-main'>
				<div className='c-modal__panel u-pr-16'>
					<div className='o-media__fluid'>
						<input id='pgraphs' type='number' min='1' max='15'/>
						<label htmlFor='pgraphs' className='u-mr-20'>Paragraphs</label>

						<input id='words' type='number' min='1' max='500' step='50'/>
						<label htmlFor='words'>Words</label>
					</div>

					<button className={`c-modal-main__copy
					${(selectedCopy) ? 'c-modal-main__copy--selected' : ''}`}
					onClick={this.copyText}>
						{(selectedCopy) ? 'Copy select' : 'Copy all'}
					</button>
				</div>

				<div className='c-modal__panel u-pv-12'>
					<div className='o-media__fluid'>
						<input id='include-p' type='checkbox'/>
						<label htmlFor='include-p'>include &lt;p&gt; tags</label>
					</div>

					<button className='c-modal-main__settings u-ph-12'
					onClick={() => routeStore.setRoute('/settings')}>
						Settings
					</button>
				</div>

				<div className={`c-modal-main__textarea
					${(selectedCopy) ? 'c-modal-main__textarea--selected' : ''}`}>

					<textarea readOnly spellCheck='false'
					ref={this.textArea}
					onFocus={this.selectAllCopy}
					onBlur={() => setTimeout(this.onUnselectCopy, 125)}
					onMouseUp={this.onUnselectCopy}
					value={this.state.copyOutput}>
					</textarea>
				</div>
			</div>
		);
	}
}
