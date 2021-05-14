import React from 'react'
import styled from 'styled-components'
import Card from '../../../components/Card'
import CardContent from '../../../components/CardContent'
import Value from '../../../components/Value'
import ValueSmall from '../../../components/ValueSmall'
import useValues from '../../../hooks/useValues'
import useSubValues from '../../../hooks/useSubValues'
import { decimate } from '../../../utils/formatBalance'
import { BigNumber } from 'bignumber.js'
import Spacer from '../../../components/Spacer'
import usePanda from '../../../hooks/usePanda'
import useFees from '../../../hooks/useFees'
import pandaIcon from '../../../assets/img/pnda.png'
import useEarnings from '../../../hooks/useEarnings'
import useFirstDepositBlock from '../../../hooks/useFirstDepositBlock'
import useLastWithdrawBlock from '../../../hooks/useLastWithdrawBlock'
import useLastDepositBlock from '../../../hooks/useLastDepositBlock'
import useBlock from '../../../hooks/useBlock'
import useBlockDiff from '../../../hooks/useBlockDiff'

const FeeWarning: React.FC = () => {
    return (
            <StyledDocsWarning>
            <p>First Deposit Block:</p>
            <p>Last Withdraw Block:</p>
            <p>Current Block:</p>
            <p>Withdraw Fee:</p>
            </StyledDocsWarning>
		)
	}

export default FeeWarning

const StyledDocsWarning = styled.span`
	background-color: ${(props) => props.theme.color.grey[300]};
	font-size: 16px;
	margin: 1rem;
	padding: 0.5rem;
	text-align: start;
	border-left: 3px solid ${(props) => props.theme.color.green};
	width: 90%;
`