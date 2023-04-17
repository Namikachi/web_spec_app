import { View, TextInput } from 'react-native';
import { useState, useEffect } from 'react';

import styles from './specification.style';
import { COLORS, SIZES } from '../../../../constants';

const inlineStyle = {
	outline: 'none',
	fontSize: SIZES.xLarge,
	padding: 8,
	border: '1px solid #ddd',
	backgroundColor: '#fff',
	height: 48,
	marginTop: 10
};

const Specification = ({ rectInfo, setRectInfo, index }) => {
	const [data, setData] = useState({
		key: index,
		specification: {
			section_name: rectInfo.find(item => item.key === index)?.specification?.section_name,
			section_outline: rectInfo.find(item => item.key === index)?.specification?.section_outline,
		}
	});

	useEffect(() => {
		const object = rectInfo.find(item => item.key === data.key);
		const updatedObject = {
			...object,
			specification: data.specification
		};
		const selectedObject = rectInfo.find(item => item.key === index);

		setRectInfo(rectInfo.map(item => {
			if(item.key === data.key) {
				return updatedObject
			} else {
				return item
			}
		}));
		setData({
			key: index,
			specification: {
				section_name: selectedObject?.specification?.section_name === undefined ? '' : selectedObject.specification.section_name,
				section_outline: selectedObject?.specification?.section_outline === undefined ? '' : selectedObject.specification.section_outline,
			}
		});
	}, [index]);

	function onChange(name, text) {
		setData({
			key: data.key,
			specification: {
			...data.specification,
			[name]: text,
		}})
	};

	return (
		<View style={styles.container}>
			{rectInfo.length !== 0 && (
				<View style={styles.primaryWrapper}>
					<TextInput style={inlineStyle} placeholder='Section name' placeholderTextColor={COLORS.dark600} onChangeText={text => onChange('section_name', text)} value={data.specification?.section_name === undefined ? '' : data.specification.section_name} />
					<TextInput style={inlineStyle} placeholder='Section outline' placeholderTextColor={COLORS.dark600} multiline={true} maxLength={50}  onChangeText={text => onChange('section_outline', text)} value={data.specification?.section_outline === undefined ? '' : data.specification.section_outline} />
				</View>
			)}
		</View>
	)
}

export default Specification