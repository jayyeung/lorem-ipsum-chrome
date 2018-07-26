import React from 'react';
import { observer, inject } from 'mobx-react';

export const LoremInput = inject('ConfigStore')(
	observer((props) => {
		const { onParams } = props;
		const { paramTypes } = props.ConfigStore;

		return (
			<div>
				{paramTypes.map((type, i) => (
					<input type='number' name={type}
					onInput={(e) => onParams(e.target.value, type)}
					key={`param-${i}`}/>
				))}
			</div>
		);
	})
);

