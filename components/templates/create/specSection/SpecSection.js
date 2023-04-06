import { useRef, useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { SpecOutline } from '../../../../components';

import styles from './specsection.style';

let rectWidth, rectHeight;

const SpecSection = ({ fileShow, dimension }) => {
	const refEdit = useRef(null);
	const refShow = useRef(null);
	const contextRef = useRef(null);
	const startX = useRef(null);
	const startY = useRef(null);

	const [isTrimming, setIsTrimming] = useState(false);
	const [isTrimmed, setIsTrimmed] = useState(false);
	const [rect, setRect] = useState([]);

	useEffect(() => {
		if (refEdit.current) {
			const ctx = refEdit.current.getContext('2d');
			ctx.lineCap = "round";
			ctx.lineWidth = 3;

			contextRef.current = ctx;
		}
	}, [fileShow]);
	
	// trimming or rescale or drag & drop
	function handleStartTrimming(e) {
		const pointerX =  e.nativeEvent.offsetX;
		const pointerY =  e.nativeEvent.offsetY;

		for(let item of rect) {
			if(
				(item.x + 10 < pointerX && item.y + 10 < pointerY) &&
				(item.x + item.w - 10 > pointerX && item.y + item.h - 10 > pointerY)
			) {
				// start grab
				// return
			} else if(
				// left top
				((item.x + 5 > pointerX) && (item.x <= pointerX) &&
				 (item.y + 5 > pointerY) && (item.y <= pointerY)) ||
				// right top
				((item.x + item.w - 5 < pointerX) && (item.x + item.w >= pointerX) &&
				(item.y + 5 > pointerY) && (item.y <= pointerY))
				// right bottom
				((item.x + item.w - 5 < pointerX) && (item.x + item.w >= pointerX) &&
				(item.y + item.h - 5 < pointerY) && (item.y + item.h >= pointerY))
				// left bottom
				((item.x + 5 > pointerX) && (item.x <= pointerX) &&
				(item.y + item.h - 5 < pointerY) && (item.y + item.h >= pointerY))
			) {
				// resize
				// return
			} else {
				// create rectangle
			}
		}
		startX.current = pointerX;
		startY.current = pointerY;
		setIsTrimming(true);
	}

	function handleTrimming(e) {
		if(!isTrimming) return
		const x = e.nativeEvent.offsetX;
		const y = e.nativeEvent.offsetY;

		rectWidth = x - startX.current;
		rectHeight = y - startY.current;


		contextRef.current.clearRect(0, 0, refEdit.current.width, refEdit.current.height);
		contextRef.current.strokeRect(startX.current, startY.current, rectWidth, rectHeight);

		contextRef.current.fillRect(startX.current, startY.current, rectWidth, rectHeight);
		contextRef.current.fillStyle = 'rgba(100,100,100,0.2)';
		contextRef.current.strokeStyle = 'rgba(223,75,38,0.4)';

		setIsTrimmed(true);
	}

	function handleStopTrimming() {
		setIsTrimming(false)
	}

	function handleSetRect() {
		const ctx = refShow.current.getContext('2d');
		ctx.fillStyle = 'rgba(100, 100, 100, 0.2)';
		ctx.strokeStyle = 'rgba(223,75,38,0.4)';

		ctx.strokeRect(startX.current, startY.current, rectWidth, rectHeight);
		ctx.fillRect(startX.current, startY.current, rectWidth, rectHeight);

		contextRef.current.clearRect(0, 0, refEdit.current.width, refEdit.current.height);
		setIsTrimmed(false);
		setRect(rect.concat({
			x: startX.current,
			y: startY.current,
			w: rectWidth,
			h: rectHeight
		}));
	}

	return (
		<View style={styles.container}>
			<View>
				<TouchableOpacity style={styles.setBtn(isTrimmed)} disabled={!isTrimmed} onPress={handleSetRect}>
					<Text style={styles.setBtnTxt}>Set</Text>
				</TouchableOpacity>
			</View>
			<View style={styles.imgContainer}>
				<ScrollView style={styles.imgScrollView}>
					<View style={styles.imgViewContainer(dimension.width, dimension.height)}>
						<Image
							source={fileShow.uri}
							style={styles.img(dimension.width, dimension.height)}
						/>
						{/* set → select → delete, edit, create smaller parts
										→ next
						*/}
						{/* for Show */}
						<canvas
							ref={refShow}
							style={{position: 'absolute'}}
							viewBox={`0 0 ${dimension.width} ${dimension.height}`}
							height={dimension.height}
							width={dimension.width}
							onMouseDown={handleStartTrimming}
							onMouseMove={handleTrimming}
							onMouseUp={handleStopTrimming}
							onMouseLeave={handleStopTrimming}
						/>
						{/* for Edit */}
						<canvas
							ref={refEdit}
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
				<SpecOutline />
				<View style={styles.specBoard}>
				</View>
			</View>
		</View>
	)
}

export default SpecSection