import { StyleSheet } from 'react-native-web';
import { COLORS, FONT, SIZES } from '../../../../constants';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center',
		gap: 20,
		paddingTop: 30
	},
	hrchyBtn: (hrchy, selected, disable) => ({
		backgroundColor: disable ? COLORS.dark600 : hrchy === selected ? COLORS.item[hrchy + '100'] : COLORS.item[hrchy + '600'],
		width: 45,
		height: 45,
		borderRadius: 4,
	}),
	text: {
		color: COLORS.lightWhite,
		fontSize: SIZES.xLarge,
		fontFamily: FONT.bold,
		textAlign: 'center',
		lineHeight: 45
	}
})

export default styles;