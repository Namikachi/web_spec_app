import { StyleSheet } from 'react-native-web';
import { COLORS, FONT, SIZES } from '../../../constants';

const styles = StyleSheet.create({
	container: {
		padding: 10,
		flexDirection: 'row',
		flex: 1,
		columnGap: 10
	},
	imgContainer: {
		width: '100%',
		height: '100%',
		flex: 1,
	},
	imgScrollView: {
		flex: 1,
		backgroundColor: COLORS.gray2,
	},
	imgViewContainer: (width, height) => ({
		width: width,
		height: height,
		marginHorizontal: 'auto',
		marginVertical: 10
	}),
	img: (width, height) => ({
		width: width,
		height: height,
		marginHorizontal: 'auto',
		marginVertical: 10
	}),
	specContainer: {
		height: '100%',
		flex: 1,
	},
	specOutline: {
		flex: 1,
	},
	specBoard: {
		backgroundColor: COLORS.lightWhite,
		borderRadius: SIZES.medium,
		flex: 4,
	},
})

export default styles;