import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { withRouter, useRouteMatch } from 'react-router-dom';
import { TextField, IconButton, Icon } from '@material-ui/core';
import { useForm } from '@fuse/hooks';
import { FuseAnimate } from '@fuse';
// import moment from "moment";
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import * as Actions from '../../../store/actions';
import reducer from '../../../store/reducers';
import { connect } from 'react-redux';
import ReactToPdf from "react-to-pdf"
import withReducer from 'app/store/withReducer';

const defaultFormState = {
	age: "",
	address: "",
	signature: null,
	deceased_full_name: "",
	date_of_death: null,
	year_of_death: null,
	date_of_embalming: null
}

function EmbalmmentForm(props){
  const { /*user,*/ embalmmentCert, deceased } = props
  const dispatch = useDispatch();
  const match = useRouteMatch();
  const ref = React.createRef();
	const { form, setForm, handleChange } = useForm({
		...defaultFormState
	})

  const embal = useSelector(
    ({ deceasedApp }) => deceasedApp.deceased
  );
  console.log(embal, 'embal')



	useEffect(() => {
    dispatch(Actions.printEmbalmmentCertificate(match.params.id))
  }, [dispatch, match.params.id]);

	useEffect(() => {
		if(embalmmentCert){
			setForm(state => ({
				...state,
				...embalmmentCert,
				address: deceased?.address
			}))
		}
	}, [embalmmentCert, deceased, setForm])

  const options = {
    orientation: 'portrait',
    unit: 'in',
    format: [9,14]
  };

  return (
		<div className='flex flex-col bg-white p-24'>
			<FuseAnimate delay={100}>
				<div className='flex flex-col flex-wrap mt-0 mb-24 relative'>
					<div className="absolute right-0 top-0 bg-orange-lighter">
						<ReactToPdf targetRef={ref} filename={`${embalmmentCert?.deceased_full_name}.pdf`} options={options} x={.4} y={.4} scale={0.92}>
							{({toPdf}) => (
								<IconButton disabled={!embalmmentCert} onClick={toPdf}>
									<Icon>cloud_download</Icon>
								</IconButton>
							)}
						</ReactToPdf>
					</div>

					<div className='w-9/12 mx-auto overflow-hidden sm:rounded-lg' ref={ref}>

						<div className="text-center mb-8">
							<h1 className='text-3xl leading-6 uppercase font-bold text-gray-900'>
								Embalming Certificate
							</h1>
							<p className="text-sm text-gray-600">This is to certify that the remain of</p>
						</div>

						<div className=''>
							<div className='bg-gray-100 flex px-1 py-2 sm:px-0'>
								<TextField 
									name="deceased_full_name" 
									value={form.deceased_full_name} 
									inputProps={{min: 0, style: { textAlign: 'center' }}}
									fullWidth 
								/>
							</div>
							<div className='bg-white flex flex-col px-1 py-2 sm:px-0'>
								<span className='text-sm text-center font-bold text-gray-600 mb-8'>
									Of
								</span>
								<TextField 
									name="address" 
									value={form.address} 
									onChnage={handleChange}
									inputProps={{min: 0, style: { textAlign: 'center' }}}
									fullWidth 
								/>
							</div>
							<div className='bg-gray-100 flex flex-col px-1 py-2 sm:px-0'>
								<span className='text-sm text-center font-bold text-gray-600 mb-8'>
									Age
								</span>
								<TextField 
									name="age" 
									value={form.age} 
									inputProps={{min: 0, style: { textAlign: 'center' }}}
									margin="none" 
									fullWidth 
								/>
							</div>	
							<div className='bg-white grid grid-cols-3 gap-x-3 px-1 py-2 sm:px-0 mb-2'>
								<div className="flex flex-col py-16">
									<span className='text-sm text-center font-bold text-gray-600 mb-8'>
										Who died on
									</span>
									<MuiPickersUtilsProvider utils={DateFnsUtils}>
										<KeyboardDatePicker
											format="MMMM"
											id='who-died-on'
											value={form.date_of_death}
											inputProps={{min: 0, style: { textAlign: 'center' }}}
											KeyboardButtonProps={{
												'aria-label': 'change date',
											}}
											keyboardIcon={false}
											fullWidth
										/>
									</MuiPickersUtilsProvider>
								</div>
								<div className="flex flex-col py-16">
									<span className='text-sm text-center font-bold text-gray-600 mb-8'>
										day of
									</span>
									<MuiPickersUtilsProvider utils={DateFnsUtils}>
										<KeyboardDatePicker
											format="dd"
											id='day-of'
											value={form.date_of_death}
											inputProps={{min: 0, style: { textAlign: 'center' }}}
											KeyboardButtonProps={{
												'aria-label': 'change date',
											}}
											keyboardIcon={false}
											fullWidth
										/>
									</MuiPickersUtilsProvider>
								</div>
								<div className="flex flex-col py-16">
									<span className='text-sm text-center font-bold text-gray-600 mb-8'>
										in the year
									</span>
									<MuiPickersUtilsProvider utils={DateFnsUtils}>
										<KeyboardDatePicker
											format="yyyy"
											id='in-the-year'
											value={form.year_of_death}
											inputProps={{min: 0, style: { textAlign: 'center' }}}
											KeyboardButtonProps={{
												'aria-label': 'change date',
											}}
											keyboardIcon={false}
											fullWidth
										/>
									</MuiPickersUtilsProvider>
								</div>
							</div>
							<div className='bg-white flex flex-col px-1 py-8 sm:px-0 my-24'>
								<span className='text-sm text-center font-bold text-gray-600'>
									has been embalmed and in good sanitary condition
								</span>
							</div>
							<div className='bg-white grid grid-cols-3 gap-x-3 px-1 py-16 items-center text-center sm:px-0'>
								<div>
									<TextField 
										name="signature" 
										value={form.signature} 
										inputProps={{min: 0, style: { textAlign: 'center' }}}
										className="mb-8" 
										fullWidth 
									/>
									<span className='text-sm font-bold text-gray-600'>
										Signature
									</span>
								</div>
								<div>
									<img className='h-96' src='/assets/images/profile/omega-homes.svg'alt='' />
								</div>
								<div>
									<MuiPickersUtilsProvider utils={DateFnsUtils}>
										<KeyboardDatePicker
											className="mb-8"
											format="dd/MM/yyyy"
											id='date_of_embalming'
											value={form.date_of_embalming}
											inputProps={{min: 0, style: { textAlign: 'center' }}}
											KeyboardButtonProps={{
												'aria-label': 'change date',
											}}
											keyboardIcon={false}
											fullWidth
										/>
									</MuiPickersUtilsProvider>
									<span className='text-sm font-bold text-gray-600'>
										Date of embalmment
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</FuseAnimate>
		</div>
  );
}

const mapStateToProps = ({deceasedApp, auth}) => {
  const { deceased } = deceasedApp
  return {
    searchText: deceased.searchText,
    embalmmentCert: deceased.embalmmentCert,
    deceased: deceased.deceased,
    user: auth.user.data,
  }
}

export default withReducer("deceasedApp", reducer)(withRouter(connect(mapStateToProps)(EmbalmmentForm)));