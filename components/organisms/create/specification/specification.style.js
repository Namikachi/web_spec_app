import { StyleSheet } from 'react-native-web';

import { COLORS, FONT, SIZES } from '../../../../constants';

const styles = StyleSheet.create({
	container: {
		flex: 6,
	},
	primaryWrapper: {
		marginTop: 10,
		flexDirection: 'column',
		flex: 1,
		display: 'flex',
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
		flex: 1,
		marginTop: 10,
	},
	buttonText: {
		color: COLORS.white,
		fontSize: SIZES.medium,
		fontFamily: FONT.bold,
	},
	wrap: {
		display: 'flex',
		flexDirection: 'row',
		flex: 2,
	},
	outline: {
		flex: 11
	},
	main: {
		marginTop: 15,
		backgroundColor: COLORS.white,
		flex: 9,
		padding: 10
	}
})

export default styles;