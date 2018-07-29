import React, { Component } from 'react';

export default class MainPage extends Component {
	render() {
		return (
			<div class='c-modal-main'>
				<div className='c-modal__panel u-pr-16'>
					<div className='o-media__fluid'>
						<input id='pgraphs' type='number' min='1' max='30'/>
						<label for='pgraphs' class='u-mr-28'>Paragraphs</label>

						<input id='words' type='number' min='1' max='30'/>
						<label for='words'>Words each</label>
					</div>

					<button clasaName='c-modal-main__copy'>Copy Text</button>
				</div>

				<div className='c-modal__panel'>
					<div className='o-media__fluid'>
						<input id='include-p' type='checkbox'/>
						<label for='include-p'>include &lt;p&gt; tags</label>
					</div>

					<button className='c-label c-label--link'>
						Settings
					</button>
				</div>

				<div className='c-modal-main__textarea'>
					<textarea spellCheck='false'>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, debitis! Eligendi neque quisquam dignissimos est sit rerum soluta dolore ullam repellat vitae incidunt tenetur ex, aliquid delectus aliquam sed. Nisi, rerum deleniti. Beatae autem error atque accusantium quae, harum explicabo doloremque recusandae doloribus aliquam nisi sint quisquam maiores corporis voluptatem?
					</textarea>
				</div>
			</div>
		);
	}
}
