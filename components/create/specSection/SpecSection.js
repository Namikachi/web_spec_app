import { useRef, useState, useEffect } from 'react';
import { View, Text, ScrollView, Image } from 'react-native';

import styles from './specsection.style';

const SpecSection = ({ fileShow, dimension }) => {
	const ref = useRef(null);
	const contextRef = useRef(null);
	const startX = useRef(null);
	const startY = useRef(null);

	const [isTrimming, setIsTrimming] = useState(false);

	useEffect(() => {
		if (ref.current) {
			const ctx = ref.current.getContext('2d');
			ctx.lineCap = "round";
			ctx.lineWidth = 3;

			contextRef.current = ctx;
		}
	}, [fileShow]);
	
	function handleStartTrimming(e) {
		startX.current = e.nativeEvent.offsetX;
		startY.current = e.nativeEvent.offsetY;
		setIsTrimming(true);
	}

	function handleTrimming(e) {
		if(!isTrimming) return
		const x = e.nativeEvent.offsetX;
		const y = e.nativeEvent.offsetY;

		const rectWidth = x - startX.current;
		const rectHeight = y - startY.current;

		contextRef.current.clearRect(0, 0, ref.current.width, ref.current.height);
		contextRef.current.strokeRect(startX.current, startY.current, rectWidth, rectHeight);

		contextRef.current.fillRect(startX.current, startY.current, rectWidth, rectHeight);
		contextRef.current.fillStyle = 'rgba(100,100,100,0.3)';
		contextRef.current.strokeStyle = 'rgba(223,75,38,0.5)';
	}

	function handleStopTrimming() {
		setIsTrimming(false)
	}

	return (
		<View style={styles.container}>
			<View style={styles.imgContainer}>
				<ScrollView style={styles.imgScrollView}>
					<View style={styles.imgViewContainer(dimension.width, dimension.height)}>
						<Image
							source={fileShow.uri}
							style={styles.img(dimension.width, dimension.height)}
						/>
						<canvas
							ref={ref}
							style={{position: 'absolute'}}
							viewBox={`0 0 ${dimension.width} ${dimension.height}`}
							height={dimension.height}
							width={dimension.width}
							onMouseDown={handleStartTrimming}
							onMouseMove={handleTrimming}
							onMouseUp={handleStopTrimming}
							onMouseLeave={handleStopTrimming}
						/>
					</View>
				</ScrollView>
			</View>
			<View style={styles.specContainer}>
				<View style={styles.specOutline}>
					<Text>abcdefg</Text>
				</View>
				<View style={styles.specBoard}>
				</View>
			</View>
		</View>
	)
}

export default SpecSection