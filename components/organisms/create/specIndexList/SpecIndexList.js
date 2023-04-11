import { View, FlatList, TouchableOpacity, Text } from 'react-native';

import styles from './specindexlist.style';

const regex = /[-]/g;

const SpecIndexList = () => {
	return (
		<View style={styles.container}>
			<FlatList
				data={[
					{key: '1'},
					{key: '1-1'},
					{key: '1-2'},
					{key: '1-3'},
					{key: '1-4'},
					{key: '2'},
					{key: '2-1'},
					{key: '2-2'},
					{key: '3'},
					{key: '3-1'},
				]}
				renderItem={({item}) => 
					<TouchableOpacity>
						{!item.key.match(regex) ? 
							<Text style={styles.textPrimary} >{item.key}</Text> :
						 item.key.match(regex).length === 1 ?
							<Text style={styles.textSecondary} >{item.key}</Text> :
						 item.key.match(regex).length === 2 ?
							<Text style={styles.textTertiary} >{item.key}</Text> :
						 ''
						}
					</TouchableOpacity>
				}
				style={styles.list}
			/>
		</View>
	)
}

export default SpecIndexList