import { useState } from 'react';
import { View } from 'react-native';
import { TextInput } from 'react-native-paper';

import styles from './specoutline.style';

const SpecOutline = () => {
	const [specTitle, setSpecTitle] = useState('');
	const [specOutline, setOutline] = useState('');

	return (
		<View style={styles.container}>
			<TextInput
				label='Spec Title'
				mode='outlined'
				activeOutlineColor='#000'
				style={styles.titleInput}
				placeholderTextColor={'#d9d9d9'}
				onChangeText={setOutline}
				value={specOutline}
			/>
			<TextInput
				label='Outline'
				mode='outlined'
				activeOutlineColor='#000'
				style={styles.outlineInput}
				placeholderTextColor={'#d9d9d9'}
			/>
		</View>
	)
}

export default SpecOutline