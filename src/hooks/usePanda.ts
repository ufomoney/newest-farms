import { useContext } from 'react'
import { Context } from '../contexts/PandaProvider'

const usePanda = () => {
  const { panda } = useContext(Context)
  return panda
}

export default usePanda
