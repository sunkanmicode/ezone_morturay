import React, { useEffect } from "react"
import { useDispatch, connect } from "react-redux"
import { withRouter } from "react-router-dom"
import moment from "moment"
import _ from "lodash"
import * as Actions from "./../../store/actions"
import PlotDetailsSkeleton from "./PlotSkeleton"

function PlotDetails(props) {
	const { match, plot, branches } = props
	const dispatch = useDispatch()

	console.log(plot, "plot")

	useEffect(() => {
		dispatch(Actions.getPlotById(match.params.id))
	}, [dispatch, match.params.id])

  return (
    <div className="bg-white overflow-hidden sm:rounded-lg px-24">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-bold text-gray-900">Plot Details</h3>
      </div>
      {plot 
        ? (
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-100 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-600">Plot name</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{plot?.plotName}</dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-600">Plot number</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{plot?.plotNumber}</dd>
              </div>
              <div className="bg-gray-100 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-600">Date created</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{moment(plot?.created_at).format("Do MMM, YYYY")}</dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-600">Branch</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{_.find(branches, {id: plot?.branchId})?.name}</dd>
              </div>
              <div className="bg-gray-100 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-600">Address</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {plot?.address}
                </dd>
              </div>
            </dl>
          </div>
        ) 
        : <PlotDetailsSkeleton /> 
      }
    </div>
  )
}

const mapStateToProps = ({plotsApp}) => {
	const { plots, branches } = plotsApp
	return {
		plot: plots.plot,
		branches: branches.branches,
	}
}

export default withRouter(connect(mapStateToProps)(PlotDetails))