import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';

import styles from './specification.style';
import { TextInputArea } from '../../../../components';

const Specification = ({ rectInfo, setRectInfo, index, setEditState }) => {
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

	return (
		<View style={styles.container}>
			{rectInfo.length !== 0 && (
				<View style={styles.primaryWrapper}>
					<View style={styles.wrap}>
						{/* <Text>{data.parentIndex}</Text> */}
						<Text style={styles.index}>{data.index}</Text>
						<View style={styles.outline}>
							<TextInputArea title='Section name' data={data} setData={setData} />
							<TextInputArea title='Section outline' data={data} setData={setData} />
						</View>
					</View>
					<View style={styles.main}>
						{data.index.includes('-') && (
							<>
								<Text style={styles.text}>
									Description
								</Text>
								<TextInput style={styles.textinput} />
								<Text style={styles.text}>
									toggle
								</Text>
								<TextInput style={styles.textinput} />
								<Text style={styles.text}>
									tag
								</Text>
								<TextInput style={styles.textinput} />
								<Text style={styles.text}>
									API
								</Text>
								<TextInput style={styles.textinput} />
								<Text style={styles.text}>
									Text
								</Text>
								<TextInput style={styles.textinput} />
							</>
						)}
					</View>
					<TouchableOpacity style={styles.button} onPress={() => setEditState('delete')} >
						<Text style={styles.buttonText}>Delete</Text>
					</TouchableOpacity>
				</View>
			)}
		</View>
	)
}

export default Specification