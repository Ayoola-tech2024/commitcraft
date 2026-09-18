// Lightweight Web Audio API synthesizer for zero-asset tactile sound feedback
class SoundSynthesizer {
  private ctx: AudioContext | null = null
  public enabled: boolean = true

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (AudioCtx) {
        this.ctx = new AudioCtx()
      }
    }
  }

  playClick() {
    if (!this.enabled) return
    try {
      this.initCtx()
      if (!this.ctx) return
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(800, this.ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(400, this.ctx.currentTime + 0.04)
      gain.gain.setValueAtTime(0.08, this.ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04)
      osc.connect(gain)
      gain.connect(this.ctx.destination)
      osc.start()
      osc.stop(this.ctx.currentTime + 0.04)
    } catch {
      // ignore audio context restrictions before first user gesture
    }
  }

  playSuccess() {
    if (!this.enabled) return
    try {
      this.initCtx()
      if (!this.ctx) return
      const now = this.ctx.currentTime
      const notes = [523.25, 659.25, 783.99, 1046.50] // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator()
        const gain = this.ctx!.createGain()
        osc.type = 'triangle'
        osc.frequency.setValueAtTime(freq, now + idx * 0.08)
        gain.gain.setValueAtTime(0.12, now + idx * 0.08)
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.25)
        osc.connect(gain)
        gain.connect(this.ctx!.destination)
        osc.start(now + idx * 0.08)
        osc.stop(now + idx * 0.08 + 0.25)
      })
    } catch {
      // ignore
    }
  }
}

export const sound = new SoundSynthesizer()