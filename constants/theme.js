const COLORS = {
	primary: '#F09000',
	secondary: '#8EA604',

	dark100: '#212121',
	dark600: '#949494',
	
	gray: '#F0F0F0',

	white: '#F3F4F8',
	lightWhite: '#FAFAFC',

	item: {
		primary100: '#35B335',
		primary600: '#AFDEA6',

		secondary100: '#FF6C48',
		secondary600: '#ffc0ab',

		tertiary100: '#7171FF',
		tertiary600: '#C7BEFF',
	}
};

const FONT = {
	regular: 'DMRegular',
	medium: 'DMMedium',
	bold: 'DMBold',
};

const SIZES = {
	xSmall: 10,
	small: 12,
	medium: 16,
	large: 20,
	xLarge: 24,
	xxLarge: 32,
};

const SHADOWS = {
	small: {
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 2,
	},
	medium: {
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 5.84,
		elevation: 5,
	},
};

export { COLORS, FONT, SIZES, SHADOWS };
