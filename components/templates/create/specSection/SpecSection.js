import { useState } from 'react';
import { View } from 'react-native';
import { 
	HierarchyPalette,
	VisualDesign,
	SpecIndexList,
	Specification, } from '../../../../components';

import styles from './specsection.style';

const SpecSection = ({ fileShow, dimension }) => {
	const [selectedHrchy, setSelectedHrchy] = useState('primary');
	const [isDisable, setIsDisable] = useState(['secondary', 'tertiary'])
	const [rectInfo, setRectInfo] = useState([]);

	return (
		<View style={styles.container}>
			<HierarchyPalette selectedHrchy={selectedHrchy} onPress={setSelectedHrchy} isDisable={isDisable} />
			<VisualDesign
				selectedHrchy={selectedHrchy}
				setIsDisable={setIsDisable}
				dimension={dimension}
				fileShow={fileShow}
				rectInfo={rectInfo}
				setRectInfo={setRectInfo} />
			<SpecIndexList rectInfo={rectInfo} />
			<Specification />
		</View>
	)
}

export default SpecSection