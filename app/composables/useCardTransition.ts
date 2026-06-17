import { computed, unref, type ComputedRef, type CSSProperties, type Ref } from 'vue'
import { usePageStack } from '~/composables/usePageStack'

interface Move { x?: number; y?: number }

interface CardTransitionOpts {
  pageIndex: number
  index: number
  count: number
  enter: Move
  exit: Move
  stagger?: number

  arrive?: Ref<number> | (() => number)
}

// Wider than the page-opacity HANDOFF (0.5 in usePageStack): the card slide spans more of the
// transition than the fade, so cards are still visibly gliding into place while the page is
// already (becoming) visible — instead of finishing their move while it's still hidden.
const HANDOFF = 0.85

export function useCardTransition(opts: CardTransitionOpts): ComputedRef<CSSProperties> {
  const { scrollProgress } = usePageStack()
  const stagger = opts.stagger ?? 0.4

  return computed<CSSProperties>(() => {
    const d = scrollProgress.value - opts.pageIndex

    const leaving = d > 0

    let mag: number
    let move: Move
    if (leaving) {

      mag = Math.min(1, d / HANDOFF)
      move = opts.exit
    } else {

      const a = opts.arrive != null ? clamp01(toVal(opts.arrive)) : 1 - Math.min(1, -d / HANDOFF)
      mag = 1 - a
      move = opts.enter
    }

    const step = opts.count > 1 ? (opts.index / (opts.count - 1)) * stagger : 0
    const span = 1 - stagger
    const local = Math.min(1, Math.max(0, (mag - step) / span))

    const k = easeInOutCubic(local)

    const tx = (move.x ?? 0) * k
    const ty = (move.y ?? 0) * k

    return {
      transform: `translate3d(${tx}px, ${ty}px, 0)`,
      opacity: 1 - k,
      willChange: 'transform, opacity',
    }
  })
}

function easeInOutCubic(x: number): number {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2
}
function clamp01(x: number): number {
  return Math.min(1, Math.max(0, x))
}
function toVal(v: Ref<number> | (() => number)): number {
  return typeof v === 'function' ? v() : unref(v)
}
