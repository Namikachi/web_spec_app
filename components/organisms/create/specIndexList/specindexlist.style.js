import { StyleSheet } from 'react-native-web';

import { COLORS, FONT, SIZES } from '../../../../constants';


const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.gray,
		padding: 0,
	},
	list: {
		marginHorizontal: 10,
		marginVertical: 10,
	},
	textPrimary: {
		fontSize: SIZES.large,
		fontFamily: FONT.bold,
		backgroundColor: COLORS.item.primary100,
		paddingLeft: 10,
		marginTop: 5,
		marginBottom: 5,
		color: COLORS.lightWhite,
		borderRadius: 4,
	},
	textSecondary: {
		fontSize: SIZES.medium,
		fontFamily: FONT.bold,
		backgroundColor: COLORS.item.secondary100,
		paddingLeft: 10,
		marginTop: 5,
		marginBottom: 5,
		marginLeft: 10,
		color: COLORS.lightWhite,
		borderRadius: 4,
	},
	textTertiary: {
		fontSize: SIZES.small,
		fontFamily: FONT.bold,
		backgroundColor: COLORS.item.tertiary100,
		paddingLeft: 6,
		marginTop: 2,
		marginBottom: 5,
		marginLeft: 15,
		color: COLORS.lightWhite,
		borderRadius: 4,
	},
})

export default styles;