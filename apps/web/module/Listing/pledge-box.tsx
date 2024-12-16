import { Typography } from '@/common/components/ui/Typography'
import formatCurrency from '@/common/helpers/format-currency'
import { LucideHeartHandshake } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const PledgeBox = () => {
  const current = 450000
  const goal = 1000000
  const percentage = Math.min((current / goal) * 100, 100).toFixed(2)
  return (
    <div className="border border-gray-300 rounded-xl p-4 mb-2 flex gap-4">
      <div className="mt-1">
        <LucideHeartHandshake />
      </div>
      <div>
        <h3 className="font-semibold">
          Pledged to LokalLab by ExploreSiargao
        </h3>
        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
          <div
            className="bg-primary-500 h-2 rounded-full"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        <Typography
          variant="h6"
          className="text-justify mt-1 text-text-400"
        >
          {formatCurrency(current)} of {formatCurrency(goal)}
        </Typography>

        <Typography variant="h5" className="mt-1">
          Your stay contributes to Siargao's community growth.{" "}
          <Link
            href="/read-more"
            className="underline text-primary-600"
          >
            Find out more here
          </Link>
        </Typography>
      </div>
    </div>
  )
}

export default PledgeBox