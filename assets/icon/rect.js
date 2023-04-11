import Svg from 'react-native-svg';

import { COLORS } from '../../constants';

const RectIcon = ({ selectedHrchy }) => {
  return (
    <Svg width="48" height="34" viewBox="0 0 48 34" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M36.2437 20.2023L46.7072 26.6199L42.6832 28.2084L40.269 31.7983L36.2437 20.2023Z" fill={COLORS.item[selectedHrchy + '100']}/>
      <rect x="1.5" y="1.5" width="34" height="18" stroke={COLORS.item[selectedHrchy + '100']} strokeWidth="3"/>
      <path d="M43.6844 27.8129L47.6313 32.629L45.9497 33.9821L42.0382 29.1668L42.6844 28.2078L43.6844 27.8129Z" fill={COLORS.item[selectedHrchy + '100']} />
    </Svg>
  )
}

export default RectIcon