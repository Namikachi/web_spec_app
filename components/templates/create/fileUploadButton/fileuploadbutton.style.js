import { StyleSheet } from 'react-native-web';
import { COLORS, FONT, SIZES } from '../../../../constants';

const styles = StyleSheet.create({
	uploadContainer: {
		justifyContent: 'center',
		flexDirection: 'column',
		alignItems: 'center',
		flex: 1,
	},
	uploadBtn: {
		width: 100,
		height: 50,
		backgroundColor: COLORS.primary,
		borderRadius: SIZES.medium,
		justifyContent: 'center',
		alignItems: 'center',
	},
	uploadImage: {
		width: '50%',
		height: '50%',
	},
	descriptionText: {
		fontFamily: FONT.medium,
		marginTop: 10
	}
})

export default styles;