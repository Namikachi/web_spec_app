import { StyleSheet } from 'react-native-web';

import { COLORS } from '../../../../constants';

const styles = StyleSheet.create({
	container: {
		flex: 4,
		backgroundColor: COLORS.gray,
	},
	wrapper: (width, height) => ({
		width: width,
		height: height,
		marginHorizontal: 'auto',
		marginVertical: 20
	}),
	img:(width, height) => ({
		width: width,
		height: height,
	}),
	canvas: {
		position: 'absolute',
	},
})

export default styles;