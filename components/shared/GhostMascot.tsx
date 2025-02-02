import { Ghost } from 'lucide-react'

export const GhostMascot = () => (
  <div className="relative">
    <Ghost className="w-20 h-20 text-purple-600" />
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold text-xl">GL</div>
  </div>
)
