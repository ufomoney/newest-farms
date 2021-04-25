import { useContext } from 'react'
import { Context } from '../contexts/PandaProvider'
import { Panda } from '../panda'

const usePanda = (): Panda => {
  const { panda } = useContext(Context)
  return panda
}

export default usePanda
