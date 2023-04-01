import { useState } from 'react';
import { SafeAreaView } from 'react-native';

import { FileSelectButton, SpecSection } from '../../components/';

const index = () => {
	const [fileShow, setFileShow] = useState();
	const [dimension, setDimension] = useState({width: 0, height: 0});
	
	return (
		<SafeAreaView style={{ flex: 1 }}>
			{fileShow !== undefined ? (
				<SpecSection fileShow={fileShow} dimension={dimension} />
			) : (
				<FileSelectButton setFileShow={setFileShow} setDimension={setDimension} />
			)}
		</SafeAreaView>
	)
}

export default index