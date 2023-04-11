import { View, Text, TouchableOpacity } from 'react-native';
import RectIcon from '../../../../assets/icon/rect';

import styles from './hierarchypalette.style';

const hrchyArray = ['primary', 'secondary', 'tertiary'];

const HierarchyPalette = ({ selectedItem, onPress, isDisable }) => {
	return (
		<View style={styles.container}>
			<RectIcon selectedHrchy={selectedItem}/>
			{hrchyArray.map((item) => (
				<TouchableOpacity
					key={item}
					style={styles.hrchyBtn(item, selectedItem, isDisable.includes(item))}
					onPress={() => onPress(item)}
					disabled={isDisable.includes(item)}>
					<Text style={styles.text}>{item.charAt().toUpperCase()}</Text>
				</TouchableOpacity>
			))}
		</View>
	)
}

export default HierarchyPalette