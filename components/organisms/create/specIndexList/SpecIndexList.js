import { View, FlatList, TouchableOpacity, Text } from 'react-native';

import styles from './specindexlist.style';

const regex = /[-]/g;

const SpecIndexList = ({ rectInfo, setIndex }) => {
	function compareIndex(a, b) {
		if (a.index < b.index) {
			return -1;
		}
		if (a.index > b.index) {
			return 1;
		}

		return 0;
	}
	return (
		<View style={styles.container}>
			<FlatList
				data={rectInfo.sort(compareIndex)}
				renderItem={({item}) => 
					<TouchableOpacity onPress={() => setIndex(item.index)}>
						{!item.index.match(regex) ? 
							<Text style={styles.textPrimary} >{item.index}</Text> :
						 item.index.match(regex).length === 1 ?
							<Text style={styles.textSecondary} >{item.index}</Text> :
						 item.index.match(regex).length === 2 ?
							<Text style={styles.textTertiary} >{item.index}</Text> :
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