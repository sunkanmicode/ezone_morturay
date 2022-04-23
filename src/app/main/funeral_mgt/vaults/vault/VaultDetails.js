import React, { useEffect } from 'react';
import { useDispatch, connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import * as Actions from '../../store/actions';
import VaultDetailsSkeleton from './VaultSkeleton';
import VaultDialog from '../VaultDialog';

function VaultDetails(props) {
  const { match, branches, vault } = props;
  const dispatch = useDispatch();

  console.log(vault, 'vault');

  useEffect(() => {
    dispatch(Actions.getVaultById(match.params.id));
  }, [dispatch, match.params.id]);

  return (
    <div className="bg-white overflow-hidden sm:rounded-lg px-24">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-bold text-gray-900">
          Vault Details
        </h3>
      </div>
      {vault ? (
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-gray-100 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-600">
                Vault Number
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {vault?.vault_number}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-600">Vault type</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {vault?.vault_type}
              </dd>
            </div>
            <div className="bg-gray-100 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-600">
                Deceased ({vault.deceased?.length})
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-16 py-8 text-left font-bold text-gray-800 uppercase tracking-wide"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-16 py-8 text-left font-bold text-gray-800 uppercase tracking-wide"
                      >
                        Date Buried
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {vault.deceased.map((deceased, i) => (
                      <tr
                        key={i}
                        className="cursor-pointer hover:bg-grey-lighter"
                      >
                        <td className="px-16 py-8 whitespace-nowrap text-sm text-gray-900">
                          {deceased.name_of_deceased}
                        </td>
                        <td className="px-16 py-8 whitespace-nowrap text-sm text-gray-900">
                          {moment(deceased.date_buried).format("Do MMM, YYYY")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </dd>
            </div>
            {/* <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-600">Date Buried</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {moment(vault?.date_buried).format("Do MMM, YYYY")}
              </dd>
            </div> */}
            <div className="bg-gray-100 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-600">
                Purchaser one
              </dt>
              <div className="flex space-x-24">
                <dd className="mt-1 flex flex-col justify-center text-sm text-gray-900 text-left sm:mt-0 sm:col-span-2">
                  <span className="text-xs font-bold">Name</span>
                  <span className="whitespace-no-wrap">
                    {vault?.purchaser_one?.name || "—"}
                  </span>
                </dd>
                <dd className="mt-1 flex flex-col justify-center text-sm text-left text-gray-900 sm:mt-0 sm:col-span-2">
                  <span className="text-xs font-bold">Email</span>
                  {vault?.purchaser_one?.email || "—"}
                </dd>
                <dd className="mt-1 flex flex-col justify-center text-sm text-left text-gray-900 sm:mt-0 sm:col-span-2">
                  <span className="text-xs font-bold">Phone number</span>
                  {vault?.purchaser_one?.phone_number || "—"}
                </dd>
              </div>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-600">
                Purchaser two
              </dt>
              <div className="flex space-x-24">
                <dd className="mt-1 flex flex-col justify-center text-sm text-gray-900 text-left sm:mt-0 sm:col-span-2">
                  <span className="text-xs font-bold">Name</span>
                  <span className="whitespace-no-wrap">
                    {vault?.purchaser_two?.name || "—"}
                  </span>
                </dd>
                <dd className="mt-1 flex flex-col justify-center text-sm text-left text-gray-900 sm:mt-0 sm:col-span-2">
                  <span className="text-xs font-bold">Email</span>
                  {vault?.purchaser_two?.email || "—"}
                </dd>
                <dd className="mt-1 flex flex-col justify-center text-sm text-left text-gray-900 sm:mt-0 sm:col-span-2">
                  <span className="text-xs font-bold">Phone number</span>
                  {vault?.purchaser_two?.phone_number || "—"}
                </dd>
              </div>
            </div>
            <div className="bg-gray-100 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-600">Branch</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {vault?.branch_id
                  ? branches.find((b) => b.id === vault.branch_id)?.name
                  : "—"}
              </dd>
            </div>
            <div className="bg-gray-100 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-600">Address</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {vault?.address}
              </dd>
            </div>
          </dl>
        </div>
      ) : (
        <VaultDetailsSkeleton />
      )}

      <VaultDialog />
    </div>
  );
}

const mapStateToProps = ({ vaultsApp, ezone }) => {
  const { vaults } = vaultsApp;
  return {
    vault: vaults.vault,
    branches: ezone.branches.branches,
  };
};

export default withRouter(connect(mapStateToProps)(VaultDetails));
