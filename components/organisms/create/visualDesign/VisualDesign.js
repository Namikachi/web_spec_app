import { View, ScrollView, Image } from 'react-native';
import { useRef, useState, useEffect } from 'react';

import styles from './visualdesign.style';
import { COLORS } from '../../../../constants';

/**
* @type {number}
* four corners size
*/
const range = 5;

const VisualDesign = ({ selectedHrchy, setIsDisable, dimension, fileShow, rectInfo, setRectInfo }) => {
	const refEdit = useRef(null);
	const refShow = useRef(null);
	const contextRef = useRef(null);

	const [editState, setEditState] = useState('disable');
	const [startPosition, setStartPosition] = useState({x: 0, y: 0});
	const [index, setIndex] = useState(0);

	let rectSize = {w: 0, h: 0};

	useEffect(() => {
		if (refEdit.current) {
			const ctx = refEdit.current.getContext('2d');
			ctx.lineCap = "round";
			ctx.lineWidth = 3;

			contextRef.current = ctx;
		}
	}, [fileShow]);

	useEffect(() => {
		if(editState === 'move') {
			const newRectsArray = rectInfo.filter(item => item.key !== index);
			const ctx = refShow.current.getContext('2d');
		
			for(let item of rectInfo) {
				ctx.clearRect(item.rectangle.x - 1, item.rectangle.y - 1, item.rectangle.w + 2, item.rectangle.h + 2);
			}
	
			for(let item of newRectsArray) {
				ctx.strokeRect(item.rectangle.x, item.rectangle.y, item.rectangle.w, item.rectangle.h);
				ctx.fillRect(item.rectangle.x, item.rectangle.y, item.rectangle.w, item.rectangle.h);
				ctx.fillStyle = 'rgba(100, 100, 100, 0.2)';
				ctx.strokeStyle = COLORS.item[item.hierarchy + 100];
			}
		}
	}, [editState])

	function handleStartTrimming(e) {
		const pointerX = e.nativeEvent.offsetX;
		const pointerY = e.nativeEvent.offsetY;

		if(rectInfo.length === 0) {
			setIndex(1);
			setEditState('new');
			setStartPosition({x: pointerX, y: pointerY});
			return
		}

		for(let item of rectInfo) {
			const x = item.rectangle.x;
			const y = item.rectangle.y;
			const w = item.rectangle.w;
			const h = item.rectangle.h;
			// move
			if(
				((x + range <= pointerX && y + range <= pointerY) &&
				(x + w - range >= pointerX && y + h - range >= pointerY)) ||
				((x < pointerX && x + range > pointerX) &&
				 (y + range <= pointerY && y + h - range >= pointerY)) ||
				((x + range <= pointerX && x + w - range >= pointerX) &&
				 (y < pointerY && y + range > pointerY)) ||
				((x + w - range < pointerX && x + w > pointerX) &&
				 (y + range <= pointerY && y + h - range >= pointerY)) ||
				((x + range <= pointerX && x + w - range >= pointerX) &&
				 (y + h - range < pointerY && y + h > pointerY)) 
			) {
				setIndex(item.key);
				setStartPosition({x: pointerX, y: pointerY});
				setEditState('move');
				break

			// resize
			} else if(
				// left top
				((x + range > pointerX) && (x <= pointerX) &&
				 (y + range > pointerY) && (y <= pointerY)) ||
				// right top
				((x + w - range < pointerX) && (x + w >= pointerX) &&
				(y + range > pointerY) && (y <= pointerY)) || 
				// right bottom
				((x + w - range < pointerX) && (x + w >= pointerX) &&
				(y + h - range < pointerY) && (y + h >= pointerY)) ||
				// left bottom
				((x + range > pointerX) && (x <= pointerX) &&
				(y + h - range < pointerY) && (y + h >= pointerY))
			) {
				setEditState('resize');
				break

			// new
			} else {
				// secondary, tertiary → find primary
				const exitIndex = rectInfo.filter(item => item.hierarchy === selectedHrchy).map(item => {return item.key}).pop();
				const newIndex = selectedHrchy === 'primary' ? exitIndex + 1 : '';
				setIndex(newIndex);
				setStartPosition({x: pointerX, y: pointerY});
				setEditState('new');
			}
		}
	}

	function handleTrimming(e) {
		if(editState === 'disable') return 
		const x = e.nativeEvent.offsetX;
		const y = e.nativeEvent.offsetY;
		rectSize.w = x - startPosition.x;
		rectSize.h = y - startPosition.y;

		// if minus
		contextRef.current.clearRect(0, 0, refEdit.current.width, refEdit.current.height);
		drawRectangle(contextRef.current, editState);
	}

	function handleStopTrimming() {
		if(selectedHrchy === 'primary') setIsDisable(['tertiary']);
		if(selectedHrchy === 'secondary') setIsDisable(['']);

		const ctx = refShow.current.getContext('2d');
		drawRectangle(ctx, editState);
		contextRef.current.clearRect(0, 0, refEdit.current.width, refEdit.current.height);

		if(editState === 'new') {
			setRectInfo(
				rectInfo => [...rectInfo, {
					key: index,
					hierarchy: selectedHrchy,
					rectangle: {
						x: startPosition.x,
						y: startPosition.y,
						w: rectSize.w,
						h: rectSize.h,
					}
				}]
			)
		}
		
		if(editState === 'move') {
			const array = rectInfo.map(item => {
				if(item.key === index) {
					item.rectangle.x += rectSize.w;
					item.rectangle.y += rectSize.h;
				}
				return item
			})
			setRectInfo(array);
		}
		setEditState('disable');
	}

	function drawRectangle(canvas, state) {
		const rect = state === 'move' ? rectInfo.filter(item => item.key === index)[0].rectangle : '';
		const x = state === 'new' ? startPosition.x : state === 'move' ? rect.x + rectSize.w : '';
		const y = state === 'new' ? startPosition.y : state === 'move' ? rect.y + rectSize.h : '';
		const w = state === 'new' ? rectSize.w : state === 'move' ? rect.w : '';
		const h = state === 'new' ? rectSize.h : state === 'move' ? rect.h : '';
		canvas.fillStyle = 'rgba(100, 100, 100, 0.2)';
		canvas.strokeStyle = COLORS.item[selectedHrchy + '100'];
		canvas.strokeRect(x, y, w, h);
		canvas.fillRect(x, y, w, h);
	}

	return (
		<View style={styles.container}>
			<ScrollView>
				<View style={styles.wrapper(dimension.width, dimension.height)}>
					<Image
						source={fileShow.uri}
						style={styles.img(dimension.width, dimension.height)}
					/>
					{/* for Show */}
					<canvas
						ref={refShow}
						style={styles.canvas}
						viewBox={`0 0 ${dimension.width} ${dimension.height}`}
						height={dimension.height}
						width={dimension.width}
					/>
					{/* for Edit */}
					<canvas
						ref={refEdit}
						style={styles.canvas}
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
	)
}

export default VisualDesign