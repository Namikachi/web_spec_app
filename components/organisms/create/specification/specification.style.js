import { StyleSheet } from 'react-native-web';

import { COLORS, FONT, SIZES } from '../../../../constants';

const styles = StyleSheet.create({
	container: {
		flex: 6,
	},
	primaryWrapper: {
		marginTop: 100
	},
	index: {
		fontSize: SIZES.xxLarge,
		fontFamily: FONT.bold
	},
	label: {
		marginTop: 10,
	}
})

export default styles;