import { useCallback } from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native'
import * as ImagePicker from 'expo-image-picker';

import styles from './fileuploadbutton.style';
import { icons } from '../../../../constants';

const FileSelectButton = ({ setFileShow, setDimension }) => {
	const handleDocumentSelection = useCallback(async () => {
		try {
			const response = await ImagePicker.launchImageLibraryAsync({
			})
			setFileShow(response.assets[0]);
			Image.getSize(response.assets[0].uri, (width, height) => {
				setDimension({width: width/2, height: height/2})
			})
		} catch (error) {
			console.warn(error);
		}
	}, []);

	return (
		<View style={styles.uploadContainer}>
			<TouchableOpacity style={styles.uploadBtn} onPress={handleDocumentSelection}>
				<Image
					source={icons.upload}
					resizeMode='contain'
					style={styles.uploadImage}
				/>
			</TouchableOpacity>
			<Text style={styles.descriptionText}>Upload design files</Text>
		</View>
	)
}

export default FileSelectButton