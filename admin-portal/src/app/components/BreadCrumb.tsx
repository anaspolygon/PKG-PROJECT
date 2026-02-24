"use client"

import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
// import { useEffect } from 'react'

interface Crumb {
  label: string
  href?: string // if not provided, it's the current page
}

interface BreadcrumbProps {
  items: Crumb[]
}

export default function Breadcrumb({ items }: BreadcrumbProps) {

  return (
    <nav className="text-sm text-gray-600 mb-4" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index !== 0 && <ChevronRight className="w-4 h-4 mx-1 text-gray-400" />}
            {item.href ? (
              <Link href={item.href} className="hover:text-blue-600">
                {item.label}
              </Link>
            ) : (
              <span className="font-medium text-gray-800">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
