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
	const [isDisable, setIsDisable] = useState(['secondary', 'tertiary']);
	const [rectInfo, setRectInfo] = useState([]);
	const [index, setIndex] = useState('');
	const [editState, setEditState] = useState('disable');

	return (
		<View style={styles.container}>
			<HierarchyPalette selectedHrchy={selectedHrchy} onPress={setSelectedHrchy} isDisable={isDisable} />
			<VisualDesign
				selectedHrchy={selectedHrchy}
				setIsDisable={setIsDisable}
				dimension={dimension}
				fileShow={fileShow}
				rectInfo={rectInfo}
				setRectInfo={setRectInfo}
				index={index}
				setIndex={setIndex}
				editState={editState}
				setEditState={setEditState} />
			<SpecIndexList rectInfo={rectInfo} setIndex={setIndex} />
			<Specification rectInfo={rectInfo} setRectInfo={setRectInfo} index={index} setEditState={setEditState} />
		</View>
	)
}

export default SpecSection