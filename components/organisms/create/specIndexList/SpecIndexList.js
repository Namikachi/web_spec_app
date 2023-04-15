import { View, FlatList, TouchableOpacity, Text } from 'react-native';

import styles from './specindexlist.style';

const regex = /[-]/g;

const SpecIndexList = ({ rectInfo }) => {
	function compareIndex(a, b) {
		if (a.key < b.key) {
			return -1;
		}
		if (a.key > b.key) {
			return 1;
		}

		return 0;
	}

	return (
		<View style={styles.container}>
			<FlatList
				data={rectInfo.sort(compareIndex)}
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