import { TextInput, Text } from 'react-native';
import { useState } from 'react';

import styles from './textinputarea.style';
import { COLORS, SIZES } from '../../../constants';

const inlineStyle = (state) => ({
	outline: 'none',
	fontSize: SIZES.xLarge,
	padding: 5,
	border: state === 'focus' ? '1px solid #ddd' : 'none',
	backgroundColor: state === 'focus' ? '#f6f6f6' : COLORS.lightWhite,
	height: 32,
	marginTop: 2
});

const TextInputArea = ({ title, data, setData }) => {
	const propertyName = title.charAt(0).toLowerCase() + title.slice(1).replace(' ', '_');
	const [ state, setState] = useState('');

	function onChange(name, text) {
		const parent = data.index.includes('-') ? data.index.slice(0, data.index.indexOf('-')) : data.index;
		setData({
			index: data.index,
			parentIndex: parent, 
			specification: {
				...data.specification,
				[name]: text,
			}
		})
	};

	return (
		<>
			<Text style={styles.label}>{title}</Text>
			<TextInput onFocus={() => setState('focus')} onBlur={() => setState('blur')} style={inlineStyle(state)} placeholder={title} placeholderTextColor={COLORS.dark600} onChangeText={text => onChange(propertyName, text)} value={data?.specification[propertyName] === undefined ? '' : data.specification[propertyName]} />
		</>
	)
}

export default TextInputArea