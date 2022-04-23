import React from "react"
import { Skeleton } from "@material-ui/lab"

function VaultDetailsSkeleton() {
  return (
    <div className="border-t border-gray-200">
      <dl>
        <div className="bg-gray-100 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt className="text-sm font-medium text-gray-600"><Skeleton variant="text" width={100} /></dt>
          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"><Skeleton variant="text" width={200} /></dd>
        </div>
        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt className="text-sm font-medium text-gray-600"><Skeleton variant="text" width={100} /></dt>
          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"><Skeleton variant="text" width={200} /></dd>
        </div>
        <div className="bg-gray-100 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt className="text-sm font-medium text-gray-600"><Skeleton variant="text" width={100} /></dt>
          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"><Skeleton variant="text" width={200} /></dd>
        </div>
        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt className="text-sm font-medium text-gray-600"><Skeleton variant="text" width={100} /></dt>
          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"><Skeleton variant="text" width={200} /></dd>
        </div>
        <div className="bg-gray-100 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt className="text-sm font-medium text-gray-600"><Skeleton variant="text" width={100} /></dt>
          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            <Skeleton variant="text" width={200} />
          </dd>
        </div>
      </dl>
    </div>
  )
}

export default VaultDetailsSkeleton