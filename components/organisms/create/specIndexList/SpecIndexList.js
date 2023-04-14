import { View, FlatList, TouchableOpacity, Text } from 'react-native';

import styles from './specindexlist.style';

const regex = /[-]/g;

const SpecIndexList = ({ rectInfo }) => {
	return (
		<View style={styles.container}>
			<FlatList
				data={rectInfo}
				renderItem={({item}) => 
					<TouchableOpacity>
						{!item.key.toString().match(regex) ? 
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