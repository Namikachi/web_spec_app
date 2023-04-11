import { View, Text, TextInput } from 'react-native';
import React from 'react';

import styles from './specification.style';
import { COLORS, FONT, SIZES } from '../../../../constants';

const inlineStyle = {
	outline: 'none',
	fontSize: SIZES.xLarge,
	padding: 8,
	border: '1px solid #ddd',
	backgroundColor: '#fff',
	height: 48,
	marginTop: 10
};

const Specification = () => {
	return (
		<View style={styles.container}>
			<View style={styles.primaryWrapper}>
				<TextInput style={inlineStyle} placeholder='Section name' placeholderTextColor={COLORS.dark600} />
				<TextInput style={inlineStyle} placeholder='Section outline' placeholderTextColor={COLORS.dark600} multiline={true} maxLength={50} />
			</View>
		</View>
	)
}

export default Specification