import { useRef, useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { SpecOutline } from '../../../../components';

import styles from './specsection.style';

const range = 5;
let rectWidth, rectHeight, rectX, rectY, savedRectIndex;

const SpecSection = ({ fileShow, dimension }) => {
	const refEdit = useRef(null);
	const refShow = useRef(null);
	const contextRef = useRef(null);
	const startX = useRef(null);
	const startY = useRef(null);

	const [editStatus, setEditStatus] = useState('disable');
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

	useEffect(() => {
		if(editStatus === 'move') {
			const newRectsArray = rect.filter((item, i) => i !== Number(savedRectIndex));
			const ctx = refShow.current.getContext('2d');
		
			for(let item of rect) {
				ctx.clearRect(item.x - 1, item.y - 1, item.w + 2, item.h + 2);
			}
	
			for(let item of newRectsArray) {
				ctx.strokeRect(item.x, item.y, item.w, item.h);
				ctx.fillRect(item.x, item.y, item.w, item.h);
				ctx.fillStyle = 'rgba(100, 100, 100, 0.2)';
				ctx.strokeStyle = 'rgba(223,75,38,0.4)';
			}
			setRect(newRectsArray);
		}
	}, [editStatus])

	function currentPoint(x, y) {
		startX.current = x;
		startY.current = y;
	}
	
	// trimming or rescale or drag & drop
	function handleStartTrimming(e) {
		const pointerX =  e.nativeEvent.offsetX;
		const pointerY =  e.nativeEvent.offsetY;
		let status = 'disable';

		if(!rect.length) {
			currentPoint(pointerX, pointerY);
			setEditStatus('new');
			return
		};

		for(let index in rect) {
			const item = rect[index];
			// move
			if(
				((item.x + range <= pointerX && item.y + range <= pointerY) &&
				(item.x + item.w - range >= pointerX && item.y + item.h - range >= pointerY)) ||
				((item.x < pointerX && item.x + range > pointerX) &&
				 (item.y + range <= pointerY && item.y + item.h - range >= pointerY)) ||
				((item.x + range <= pointerX && item.x + item.w - range >= pointerX) &&
				 (item.y < pointerY && item.y + range > pointerY)) ||
				((item.x + item.w - range < pointerX && item.x + item.w > pointerX) &&
				 (item.y + range <= pointerY && item.y + item.h - range >= pointerY)) ||
				((item.x + range <= pointerX && item.x + item.w - range >= pointerX) &&
				 (item.y + item.h - range < pointerY && item.y + item.h > pointerY)) 
			) {
				currentPoint(pointerX, pointerY);
				savedRectIndex = index;
				rectX = item.x;
				rectY = item.y;
				rectWidth = item.w;
				rectHeight = item.h;
				status = 'move';
				setEditStatus(status);
				break

			// resize
			} else if(
				// left top
				((item.x + range > pointerX) && (item.x <= pointerX) &&
				 (item.y + range > pointerY) && (item.y <= pointerY)) ||
				// right top
				((item.x + item.w - range < pointerX) && (item.x + item.w >= pointerX) &&
				(item.y + range > pointerY) && (item.y <= pointerY)) || 
				// right bottom
				((item.x + item.w - range < pointerX) && (item.x + item.w >= pointerX) &&
				(item.y + item.h - range < pointerY) && (item.y + item.h >= pointerY)) ||
				// left bottom
				((item.x + range > pointerX) && (item.x <= pointerX) &&
				(item.y + item.h - range < pointerY) && (item.y + item.h >= pointerY))
			) {
				status = 'resize';
				setEditStatus(status);
				break
			}
		}

		// create rectangle
		if(status === 'disable') {
			currentPoint(pointerX, pointerY);
			setEditStatus('new');
		}
	}

	function handleTrimming(e) {
		if(editStatus === 'new') {
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

		if(editStatus === 'move') {
			const gapX = e.nativeEvent.offsetX - startX.current;
			const gapY = e.nativeEvent.offsetY - startY.current;
			contextRef.current.clearRect(0, 0, refEdit.current.width, refEdit.current.height);
			contextRef.current.strokeRect(rectX + gapX, rectY + gapY, rectWidth, rectHeight);
			contextRef.current.fillRect(rectX + gapX, rectY + gapY, rectWidth, rectHeight);
			contextRef.current.fillStyle = 'rgba(100,100,100,0.2)';
			contextRef.current.strokeStyle = 'rgba(223,75,38,0.4)';
		}
	}

	function handleStopTrimming() {
		setEditStatus('disable')
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