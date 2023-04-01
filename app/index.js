import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

import { COLORS, FONT, SIZES } from '../constants';

export default function Page() {
	const router = useRouter();
	const handleCreatePress = () => {
		router.push(`/create/`);
	};
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View style={styles.container}>
				<View style={styles.main}>
					<Text style={styles.title}>Hello World</Text>
					<Text style={styles.subtitle}>Create your web specification</Text>
					<TouchableOpacity
						onPress={() => handleCreatePress()}
						style={styles.startCreateBtn}
					>
						<Text style={styles.startCreateBtnTxt}>create</Text>
					</TouchableOpacity>
				</View>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		padding: 24,
	},
	main: {
		flex: 1,
		justifyContent: "center",
		maxWidth: 960,
		marginHorizontal: "auto",
	},
	title: {
		fontSize: 64,
		fontWeight: "bold",
	},
	subtitle: {
		fontSize: 36,
		color: "#38434D",
	},
	startCreateBtn: {
		width: 100,
		height: 50,
		backgroundColor: COLORS.tertiary,
		borderRadius: SIZES.medium,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 20,
	},
	startCreateBtnTxt: {
		fontSize: SIZES.large,
		fontFamily: FONT.bold,
		color: COLORS.white,
	},
});
