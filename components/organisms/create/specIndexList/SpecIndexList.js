import { View, FlatList, TouchableOpacity, Text } from 'react-native';
import { compareIndex } from '../../../../utils';

import styles from './specindexlist.style';

const regex = /[-]/g;

const SpecIndexList = ({ rectInfo, setIndex }) => {
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