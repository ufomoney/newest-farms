import { useContext } from 'react'
import { Context } from '../contexts/PandaProvider'

const usePanda = () => {
  const { pnda } = useContext(Context)
  return pnda
}

export default usePanda
