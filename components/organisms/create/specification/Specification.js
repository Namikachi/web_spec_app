import { View, TextInput } from 'react-native';

import styles from './specification.style';
import { COLORS, SIZES } from '../../../../constants';

const inlineStyle = {
	outline: 'none',
	fontSize: SIZES.xLarge,
	padding: 8,
	border: '1px solid #ddd',
	backgroundColor: '#fff',
	height: 48,
	marginTop: 10
};

const Specification = ({ rectInfo, setRectInfo, index }) => {
	function onChange(name, e) {
		const object = rectInfo.find(item => item.key == index);
		const newObject = {
			...object,
			specification: {
				...object.specification,
				[name]: e.target.value,
			}
		};
		setRectInfo(rectInfo.map(item => {
			if(item.key === index) {
				return newObject
			} else {
				return item
			}
		}))
	}
	return (
		<View style={styles.container}>
			{rectInfo.length !== 0 && (
				<View style={styles.primaryWrapper}>
					<TextInput style={inlineStyle} placeholder='Section name' placeholderTextColor={COLORS.dark600} onChange={e => onChange('section_name', e)} />
					<TextInput style={inlineStyle} placeholder='Section outline' placeholderTextColor={COLORS.dark600} multiline={true} maxLength={50}  onChange={e => onChange('section_outline', e)} />
				</View>
			)}
		</View>
	)
}

export default Specification