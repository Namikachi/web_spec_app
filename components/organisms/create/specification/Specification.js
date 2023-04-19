import { View, Text, TextInput } from 'react-native';
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
	marginTop: 5
};

const Specification = ({ rectInfo, setRectInfo, index }) => {
	const parentIndex = index.includes('-') ? index.slice(0, index.indexOf('-')) : index;
	const [data, setData] = useState({
		index: index,
		parentIndex: parentIndex,
		specification: {
			section_name: rectInfo.find(item => item.index === index)?.specification?.section_name,
			section_outline: rectInfo.find(item => item.index === index)?.specification?.section_outline,
		}
	});

	useEffect(() => {
		const object = rectInfo.find(item => item.index === data.index);
		const updatedObject = {
			...object,
			specification: data.specification
		};
		const selectedObject = rectInfo.find(item => item.index === index);

		setRectInfo(rectInfo.map(item => {
			if(item.index === data.index) {
				return updatedObject
			} else {
				return item
			}
		}));
		setData({
			index: index,
			parentIndex: parentIndex,
			specification: {
				section_name: selectedObject?.specification?.section_name === undefined ? '' : selectedObject.specification.section_name,
				section_outline: selectedObject?.specification?.section_outline === undefined ? '' : selectedObject.specification.section_outline,
			}
		});
	}, [index]);

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
		<View style={styles.container}>
			{rectInfo.length !== 0 && (
				<View style={styles.primaryWrapper}>
					{/* <Text>{data.parentIndex}</Text> */}
					<Text style={styles.index}>{data.index}</Text>
					<Text style={styles.label}>Section name</Text>
					<TextInput style={inlineStyle} placeholder='Section name' placeholderTextColor={COLORS.dark600} onChangeText={text => onChange('section_name', text)} value={data.specification?.section_name === undefined ? '' : data.specification.section_name} />
					<Text style={styles.label}>Section outline</Text>
					<TextInput style={inlineStyle} placeholder='Section outline' placeholderTextColor={COLORS.dark600} multiline={true} maxLength={50}  onChangeText={text => onChange('section_outline', text)} value={data.specification?.section_outline === undefined ? '' : data.specification.section_outline} />
				</View>
			)}
		</View>
	)
}

export default Specification