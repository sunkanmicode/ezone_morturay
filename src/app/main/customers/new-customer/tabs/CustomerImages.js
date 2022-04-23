import React from 'react';
import _ from "@lodash";
import { FuseScrollbars, FuseAnimate } from '@fuse';
import { useSelector } from "react-redux"
import { withRouter } from 'react-router-dom';
import { Button } from "@material-ui/core"
import { Alert } from "@material-ui/lab"
import Dropzone from './Dropzone';

function CustomerImages(props) {
  const { form, handleImageUpload, deleteImage, type, handleNext, handlePrev, tabValue } = props;
  const serviceReducer = useSelector(({customerApp}) => customerApp.services);
  const services = serviceReducer.services.services;
  
  const serviceIds = form.service.map(s => s.service_id);
  const selectedServices = _.findByValues(services, "id", serviceIds)

  function canBeSubmitted() {
    return (
      form?.customer_image?.length > 0 &&
      form?.signature?.length > 0
    ) 
    || !_.some(selectedServices, {is_customer_image: true}) 
    || type === "returning"
  }

  return (
    <div className='md:w-4/12 max-w-4xl mx-auto'>
      <div>
        {type === "returning" &&
          <Alert severity="info">Image & Signature are not required for a returning customer</Alert>
        }
        {!_.some(selectedServices, {is_customer_image: true}) &&
          <Alert severity="info">Image & Signature are not required for the selected services</Alert>
        }
      </div>
      <div className='flex flex-col'>
        <FuseScrollbars className='flex-grow overflow-x-auto'>
          <Dropzone
            disabled={
              (_.some(selectedServices, {is_customer_image: true}) && type !== "returning")
            }
            name='customer_image'
            title='customer_image'
            form={form}
            deleteImage={deleteImage}
            handleImageUpload={handleImageUpload}
            icon='/assets/images/icons/picture.svg'
            format="image"
          />
          
          <Dropzone
            disabled={
              (_.some(selectedServices, {request_customer_signature: true}) && type !== "returning")
            }
            name='signature'
            title='signature'
            form={form}
            deleteImage={deleteImage}
            handleImageUpload={handleImageUpload}
            icon='/assets/images/icons/upload.svg'
            format="image"
          />
        </FuseScrollbars>
      </div>

      <div className="flex justify-end space-x-8 my-16 pb-16">
        {tabValue > 0 &&
          <FuseAnimate animation='transition.slideRightIn' delay={300}>
            <Button
              className='whitespace-no-wrap'
              variant='contained'
              color="default"
              disableElevation
              onClick={handlePrev}
            >
              Back
            </Button>
          </FuseAnimate>
        }
        {tabValue < 5 &&
          <FuseAnimate animation='transition.slideRightIn' delay={300}>
            <Button
              className='whitespace-no-wrap'
              variant='contained'
              disableElevation
              onClick={handleNext}
              disabled={!canBeSubmitted()}
            >
              Next
            </Button>
          </FuseAnimate>
        }
      </div>
    </div>
  );
}

export default withRouter(CustomerImages);
