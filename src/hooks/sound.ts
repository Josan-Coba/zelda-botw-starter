import useSound from 'use-sound'
import { PlayFunction } from 'use-sound/dist/types'
// @ts-ignore
import actionSound from '../assets/sounds/action.mp3'
// @ts-ignore
import selectSound from '../assets/sounds/select.mp3'

export function usePlaySelect(): PlayFunction {
  const [playSelect] = useSound(selectSound)

  return playSelect
}

export function usePlayAction(): PlayFunction {
  const [playAction] = useSound(actionSound, { volume: 0.5 })
  return playAction
}
