import React from 'react';
import { useSelector } from 'react-redux';
import _ from '@lodash';
import { FuseScrollbars, FuseAnimate } from '@fuse';
import { withRouter } from 'react-router-dom';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from '@material-ui/core';
import InfoIcon from '@material-ui/icons/InfoOutlined';
import Dropzone from './Dropzone';

function DeceasedImages(props) {
  const {
    form,
    handleImageUpload,
    deleteImage,
    handleNext,
    handlePrev,
    tabValue,
  } = props;
  console.log(props, 'deceasedIMG');
  
  const serviceReducer = useSelector(({ customerApp }) => customerApp.services);
  const services = serviceReducer.services.services;

  const serviceIds = form.service.map((s) => s.service_id);
  const selectedServices = _.findByValues(services, 'id', serviceIds);

  function canBeSubmitted() {
    return (
      (form.deceased?.deceased_image?.length > 0 &&
        form.deceased?.supporting_document?.length > 0) ||
      !_.some(selectedServices, { is_admisson: true })
    );
  }

  return (
    <div className='md:w-4/12 max-w-4xl mx-auto'>
      {_.some(selectedServices, { is_admisson: true }) ? (
        <div className='flex flex-col'>
          <FuseScrollbars className='flex-grow overflow-x-auto'>
            <Dropzone
              name='deceased.deceased_image'
              title='deceased_image'
              form={form}
              deleteImage={deleteImage}
              handleImageUpload={handleImageUpload}
              icon='/assets/images/icons/picture.svg'
              format='image'
              disabled='false'
            />
            <Dropzone
              name='deceased.record_of_death_from_hospital'
              title='record_of_death_from_hospital'
              form={form}
              deleteImage={deleteImage}
              handleImageUpload={handleImageUpload}
              icon='/assets/images/icons/upload.svg'
              format='pdf' // images
              disabled='false'
            />
            <Dropzone
              name='deceased.supporting_document'
              title='supporting_document'
              form={form}
              deleteImage={deleteImage}
              handleImageUpload={handleImageUpload}
              icon='/assets/images/icons/upload.svg'
              format='pdf' // images
              disabled='false'
            />
          </FuseScrollbars>
        </div>
      ) : (
        <div className='flex justify-center'>
          <Card elevation={1} className='w-400'>
            <CardHeader
              className='items-center'
              title='Deceased Images & Documents'
              titleTypographyProps={{ variant: 'h6' }}
              avatar={<InfoIcon color='action' />}
            />
            <CardContent className='text-justify'>
              <Typography>
                Deceased image & documents are not needed for services that
                doesn't require admission
              </Typography>
            </CardContent>
          </Card>
        </div>
      )}

      <div className='flex justify-end space-x-8 my-16 pb-16'>
        {tabValue > 0 && (
          <FuseAnimate animation='transition.slideRightIn' delay={300}>
            <Button
              className='whitespace-no-wrap'
              variant='contained'
              color='default'
              disableElevation
              onClick={handlePrev}
            >
              Back
            </Button>
          </FuseAnimate>
        )}
        {tabValue < 5 && (
          <FuseAnimate animation='transition.slideRightIn' delay={300}>
            <Button
              className='whitespace-no-wrap'
              variant='contained'
              disableElevation
              onClick={handleNext}
              // disabled={!canBeSubmitted()}
            >
              Next
            </Button>
          </FuseAnimate>
        )}
      </div>
    </div>
  );
}

export default withRouter(DeceasedImages);
