import { create } from 'zustand'
import type { Speed, VisualizationType } from '@/types'

interface VisualizerState {
  activeType: VisualizationType | null
  speed: Speed
  isPlaying: boolean
  currentStep: number
  totalSteps: number
  setActive: (v: VisualizationType | null) => void
  setSpeed: (v: Speed) => void
  play: () => void
  pause: () => void
  reset: () => void
  setStep: (s: number) => void
  nextStep: () => void
  prevStep: () => void
}

export const useVisualizerStore = create<VisualizerState>((set, get) => ({
  activeType: null,
  speed: 'normal',
  isPlaying: false,
  currentStep: 0,
  totalSteps: 0,
  setActive: (v) => set({ activeType: v, currentStep: 0, isPlaying: false }),
  setSpeed: (v) => set({ speed: v }),
  play: () => set({ isPlaying: true }),
  pause: () => set({ isPlaying: false }),
  reset: () => set({ currentStep: 0, isPlaying: false }),
  setStep: (s) => set({ currentStep: s }),
  nextStep: () => {
    const { currentStep, totalSteps } = get()
    if (currentStep < totalSteps - 1) set({ currentStep: currentStep + 1 })
  },
  prevStep: () => {
    const { currentStep } = get()
    if (currentStep > 0) set({ currentStep: currentStep - 1 })
  },
}))
