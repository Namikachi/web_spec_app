import { StyleSheet } from 'react-native-web';

import { COLORS, FONT, SIZES } from '../../../../constants';

const styles = StyleSheet.create({
	container: {
		flex: 6,
	},
	primaryWrapper: {
		marginTop: 20,
		flexDirection: 'column',
		flex: 1,
		justifyContent: 'space-between',
	},
	index: {
		fontSize: SIZES.xxLarge,
		fontFamily: FONT.bold,
		flex: 1
	},
	button: {
		width: 100,
		height: 50,
		backgroundColor: COLORS.primary,
		borderRadius: SIZES.medium,
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'end',
	},
	buttonText: {
		color: COLORS.white,
		fontSize: SIZES.medium,
		fontFamily: FONT.bold,
	},
	wrap: {
		display: 'flex',
		flexDirection: 'row'
	},
	outline: {
		flex: 11
	},
})

export default styles;