import React from 'react'
import pandaBanner from '../../assets/img/pnda.png'

interface PandaIconProps {
	size?: number
	v1?: boolean
	v2?: boolean
	v3?: boolean
}

const PandaIcon: React.FC<PandaIconProps> = ({ size = 36, v1, v2, v3 }) => (
	<span
		role="img"
		style={{
			fontSize: size,
			filter: v1 ? 'saturate(0.5)' : undefined,
		}}
	>
		<img src={pandaBanner} width={50} height={50} />
	</span>
)

export default PandaIcon
