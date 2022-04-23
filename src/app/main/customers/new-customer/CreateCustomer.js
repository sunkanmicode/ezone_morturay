import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import qs from 'qs';
import _ from '@lodash';
import moment from 'moment';
import { FusePageCarded, FuseUtils, FuseAnimate } from '@fuse';
import { Typography } from '@material-ui/core';
import { useForm } from '@fuse/hooks';
import withReducer from 'app/store/withReducer';
import reducer from '../store/reducers';
import * as Actions from '../store/actions';
import CreateCustomerHeader from './CreateCustomerHeader';
import CustomerInfo from './tabs/CustomerInfo';
import RelativesInfo from './tabs/RelativesInfo';
import SelectServices from './tabs/SelectServices';
import CustomerImages from './tabs/CustomerImages';
import DeceasedImages from './tabs/DeceasedImages';
import DeceasedInfo from './tabs/DeceasedInfo';
import { useSelector } from 'react-redux';


const camelCaseTOsnake = (string) => {
  return string.split('').map(str => {
    if(str === str.toUpperCase()){
      return `_${str.toLowerCase()}`;
    }
    return str
  }).join('');
}

const deceasedScaffold = {
  first_name: '',
  last_name: '',
  other_name: '',
  gender: '',
  age: '',
  address: '',
  place_of_death: '',
  dateof_assertion: null,
  time_of_death: null,
  cause_of_death: '',
  how_was_death_assertained: '',
  name_of_hospital: '',
  medical_attendant_name: '',
  hospital_address: '',
  status: 'ADMIT',
  deceased_image: '',
  record_of_death_from_hospital: '',
  supporting_document: '',
};



function CreateCustomer(props) {
  const [deceased, setDeceased] = useState(deceasedScaffold)
  const { services, branches } = props;
  const [tabValue, setTabValue] = useState(0);
  const [errors, setErrors] = useState({});
  const [selectedDeceased, setSelectedDeceased] = useState({});
  const deceasedByCustomer = useSelector(({customerApp}) => customerApp.customer.deceasedByCustomer);
  const allCustomers = useSelector(state => state.customerApp.customer.customers.customers);
  const dispatch = useDispatch();
  const location = useLocation();
  const type = qs.parse(location.search, { ignoreQueryPrefix: true }).type;
  const customerId = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  }).customerId;

  const defaultReturningform = {
    service: [{ service_id: '', rate: '', qty: '', discount: null }],
    relative: [],
    deceased: { ...deceased },
  };


  

  const { form, handleChange, setForm } = useForm({
    first_name: '',
    last_name: '',
    other_name: '',
    address: '',
    email: '',
    branch_id: '',
    phone_number: '',
    relationship_with_deceased: '',
    customer_image: '',
    signature: '',
    service: [{ service_id: '', rate: '', qty: 1, discount: null }],
    relative: [],
    deceased: { ...deceased },
  });

  const serviceIds = form.service.map((s) => s.service_id);
  const selectedServices = _.findByValues(services, 'id', serviceIds);

  const slides = [
    'Customer Info',
    'Select Services',
    'Customer Images',
    'Deceasesd Info',
    'Deceased Document',
    'Relatives info',
  ];

  const validate = () => {
    let temp = { relative: [] };
    temp.phone_number = FuseUtils.validatePhone(form.phone_number)
      ? ''
      : 'Phone is not valid';
    temp.email = FuseUtils.validateEmail(form.email)
      ? ''
      : 'Email is not valid';
    setErrors({ ...temp });

    return _.every(temp, _.isEmpty);
  };

  const validateField = (field) => (e) => {
    let temp = { relative: [] };
    if (_.get(form, field)) {
      if (field === 'email') {
        temp[field] = FuseUtils.validateEmail(form[field])
          ? ''
          : 'Email is not valid';
      }
      if (field === 'phone_number') {
        temp[field] = FuseUtils.validatePhone(form[field])
          ? ''
          : 'Phone is not valid';
      }
      if (field === 'relative') {
        form.relative.forEach((r, i) => {
          if (!FuseUtils.validateEmail(r.email)) {
            temp.relative[i] = {
              ...temp.relative[i],
              email: 'Relative email is not valid',
            };
          }
          if (!FuseUtils.validatePhone(r.phone_number)) {
            temp.relative[i] = {
              ...temp.relative[i],
              phone_number: 'Relative phone number is not valid',
            };
          }
          if (
            FuseUtils.validateEmail(r.email) ||
            FuseUtils.validatePhone(r.phone_number)
          ) {
            temp.relative = temp.relative.filter((d, k) => d !== i);
          }
        });
      }
    }
    setErrors((state) => ({ ...state, ...temp }));
  };

  console.log(errors, 'errors validate');

  useEffect(() => {
    if (type === 'returning') {
      setTabValue(1);
      setForm({ ...defaultReturningform });
    }
  }, [type, setForm]);

  useEffect(() => {
    if (_.some(selectedServices, { is_admisson: true })) {
      if (!form.deceased) {
        form.deceased = { ...deceased };
        setForm(form);
      }
    } else {
      form.deceased = null;
      setForm(form);
    }
  }, [form, setForm, selectedServices]);
    console.log(form, "555890");


  useEffect(() => {
    dispatch(Actions.getServices());
    dispatch(Actions.getDiscounts());
    dispatch(Actions.getDeceasedByCustomer(customerId));
  }, [dispatch, customerId]);

  function handleChipChange(value, name, i) {
    if (name === 'discount') {
      setForm(_.set({ ...form }, name, value));
    } else {
      setForm(_.set({ ...form }, name, value.value));
    }
  }

  function handleSelectChange(value, name, i) {
    const newService = [...form.service];
    if (name === 'service_id') {
      newService[i][name] = value ? value.id : null;
      newService[i].rate = value ? value.amount : '';
      // if (value?.service_type === '1' || value?.service_type === '2') {
      //   newService[i].qty = 1;
      // }
      newService[i].qty = 1;
    } else {
      newService[i][name] = value;
    }

    setForm({ ...form, service: newService });
    
  }

  function addServiceRow() {
    const newRole = { service_id: '', rate: '', qty: '', discount: null };
    setForm({ ...form, service: [...form.service, newRole] });
  }

  const removeServiceRow = (i) => () => {
    setForm({ ...form, service: form.service.filter((s, k) => k !== i) });
  };

  function addRelativeRow() {
    const newRole = {
      first_name: '',
      last_name: '',
      other_name: '',
      address: '',
      email: '',
      phone_number: '',
      age: '',
      relationship_with_deceased: '',
    };
    setForm({ ...form, relative: [...form.relative, newRole] });
  }

  const removeRelativeRow = (i) => () => {
    setForm({ ...form, relative: form.relative.filter((s, k) => k !== i) });
  };

  const handleImageUpload = (name, files) => {
    FuseUtils.toBase64(files[0]).then((data) => {
      setForm(_.set({ ...form }, name, data));
    });
    console.log(...form, '555');

  };

  const deleteImage = (name) => (e) => {
    setForm(_.set({ ...form }, name, ''));
  };

  const handleMultiChange = (i) => (event) => {
    const { name, value } = event.target;
    const { service } = form;
    if (name === 'service_id') {
      const serv = services.find((s) => s.id === value);
      service[i][name] = serv.id;
      service[i].rate = serv.amount || '';
      if (
        _.find(services, { id: service[i].service_id })?.service_type === '2'
      ) {
        service[i].qty = 1;
      }
    } else {
      service[i][name] = value;
    }
    setForm({ ...form, service });
  };

  const handleRowChange = (i) => (event) => {
    const { name, value } = event.target;
    const { relative } = form;
    if (name === 'phone_number') {
      relative[i][name] = value.replace(/^[^0-9]+$/, '');
    } else {
      relative[i][name] = value;
    }
    setForm({ ...form, relative });
  };

  const handleDateChange = (name) => (date) => {
    setForm(_.set({ ...form }, name, moment(date).format('YYYY-MM-DD')));
  };

  const handleTimeChange = (name) => (date) => {
    setForm(_.set({ ...form }, name, moment(date).format('YYYY HH:mm:ss')));
  };

  const handleNext = () => {
    if (tabValue < 5 && tabValue >= 0 ) setTabValue((state) => state + 1);
  };

  const handlePrev = () => {
    if (tabValue <= 5 && tabValue > 0) setTabValue((state) => state - 1);
  };

  const handleSubmit = () => {
    if (type === 'returning' && customerId) {
      const selectCustomer = allCustomers.find(item => item.id === parseInt(customerId));
      // console.log(selectCustomer, allCustomers, customerId, 'all');
      const newObj = {
        customerId,
        branchId: selectCustomer.branch_id,
        org_key: selectCustomer.org_key,
        service:  form.service,
        relative: form.relative,
        deceased: deceasedByCustomer[0].id
      }
      dispatch(Actions.createReturningCustomer(newObj, customerId));
    } else {
      if (validate()) {
        dispatch(Actions.createCustomer(form));
      }
    }
  };

  const handleDeceasedSelect = (event) => {
    const selectedDec = deceasedByCustomer.find(dec => `${dec.firstName} ${dec.lastName}` === event.target.value);
    const deceasedState = {...deceased};
    const deceasedKeys = Object.keys(deceasedState);

    Object.entries(selectedDec ?? {}).forEach(([key, value]) => {
      
      if(deceasedKeys.some(item => item === camelCaseTOsnake(key))){
        deceasedState[camelCaseTOsnake(key)] = value;
      }

      setDeceased(deceasedState);
      
    })

    // console.log('selectedDec',deceasedState, selectedDec );
    
    setSelectedDeceased(event.target.value);
  }

  const clearSelectedDeceased = () => {
    setSelectedDeceased({})
  }



  return (
    <FusePageCarded
      classes={{
        content: 'flex',
        header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
      }}
      header={<CreateCustomerHeader form={form} handleSubmit={handleSubmit} />}
      contentToolbar={
        <div className='flex flex-1 items-center justify-between overflow-hidden sm:px-20 px-24'>
          <FuseAnimate animation='transition.slideRightIn' delay={300}>
            <Typography variant='subtitle1' className='font-600'>
              {slides[tabValue]}
            </Typography>
          </FuseAnimate>
        </div>
      }
      content={
        <form onSubmit={handleSubmit} className='p-16 sm:p-24 w-full'>
          {tabValue === 0 && (
            <CustomerInfo
              form={form}
              errors={errors}
              validate={validate}
              handleNext={handleNext}
              handlePrev={handlePrev}
              tabValue={tabValue}
              validateField={validateField}
              type={type}
              branches={branches}
              handleChange={handleChange}
              handleRowChange={handleRowChange}
              handleChipChange={handleChipChange}
            />
          )}
          {tabValue === 1 && (
            <SelectServices
              form={form}
              handleChange={handleChange}
              handleNext={handleNext}
              handlePrev={handlePrev}
              tabValue={tabValue}
              handleMultiChange={handleMultiChange}
              handleSelectChange={handleSelectChange}
              addServiceRow={addServiceRow}
              removeServiceRow={removeServiceRow}
            />
          )}
          {tabValue === 2 && (
            <CustomerImages
              form={form}
              deleteImage={deleteImage}
              handleImageUpload={handleImageUpload}
              type={type}
              handleNext={handleNext}
              handlePrev={handlePrev}
              tabValue={tabValue}
            />
          )}
          {tabValue === 3 && (
            <DeceasedInfo
              form={form}
              type={type}
              handleNext={handleNext}
              handlePrev={handlePrev}
              tabValue={tabValue}
              handleChange={handleChange}
              handleDateChange={handleDateChange}
              handleTimeChange={handleTimeChange}
              deceasedByCustomer={deceasedByCustomer}
              handleDeceasedSelect={handleDeceasedSelect}
              selectedDeceased={selectedDeceased}
              clearSelectedDeceased={clearSelectedDeceased}
            />
          )}
          {tabValue === 4 && (
            <DeceasedImages
              form={form}
              deleteImage={deleteImage}
              handleImageUpload={handleImageUpload}
              type={type}
              handleNext={handleNext}
              handlePrev={handlePrev}
              tabValue={tabValue}
            />
          )}
          {tabValue === 5 && (
            <RelativesInfo
              form={form}
              errors={errors}
              validate={validate}
              validateField={validateField}
              handleNext={handleNext}
              handlePrev={handlePrev}
              tabValue={tabValue}
              handleRowChange={handleRowChange}
              addRelativeRow={addRelativeRow}
              removeRelativeRow={removeRelativeRow}
            />
          )}
        </form>
      }
      innerScroll
    />
  );
}

const mapStateToProps = ({ customerApp, ezone }) => {
  return {
    discounts: customerApp.discounts.discounts,
    services: customerApp.services.services.services,
    branches: ezone.branches.branches,
    deceasedByCustomer: customerApp.deceasedByCustomer
  };
};

export default withReducer(
  'customerApp',
  reducer
)(connect(mapStateToProps)(CreateCustomer));
