import React from 'react';
import { useSelector } from "react-redux"
import _ from "lodash";
import {
  Button,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  TextField,
  IconButton
} from '@material-ui/core';
import {Autocomplete} from '@material-ui/lab';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import { FuseScrollbars, FuseAnimate } from '@fuse';
import { withRouter } from 'react-router-dom';

function SelectServices(props) {
  const { form, handleMultiChange, handleSelectChange, addServiceRow, removeServiceRow, handleNext, handlePrev, tabValue } = props;
  const serviceReducer = useSelector(({customerApp}) => customerApp.services);
  const discountsReducer = useSelector(({customerApp}) => customerApp.discounts);
  
  console.log(props, 'props456');

  const services = serviceReducer.services.services;
  const discounts = discountsReducer.discounts;

  function canBeSubmitted() {
    return form.service.length > 0 && form.service.every(s => (s.rate  || s.rate === 0 && s.qty))

  }

  return (
    <div className='w-full flex flex-col'>
      <FuseScrollbars className='flex-grow overflow-x-auto'>
        <Table className='' aria-labelledby='tableTitle'>
          <TableHead>
            <TableRow>
              <TableCell>Services</TableCell>
              <TableCell>Rate</TableCell>
              <TableCell>Days/Qty</TableCell>
              <TableCell>Discount</TableCell>
              <TableCell align='right'>
                <IconButton onClick={addServiceRow}>
                  <AddIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {form.service.map((n, i) => {
              const isSelected = form.service.indexOf(n.id) !== -1;
              return (
                <TableRow
                  className='h-48'
                  aria-checked={isSelected}
                  tabIndex={-1}
                  key={i}
                  selected={isSelected}
                  onClick={() => {}}
                >
                  <TableCell component='th' scope='row'>
                    <Autocomplete
                      className='min-w-192'
                      id={`service_id-${i}`}
                      value={n.service_id ? _.find(services, {id: n.service_id}) : null}
                      onChange={(ev, value) => handleSelectChange(value, 'service_id', i)}
                      placeholder='Select services'
                      options={services}
                      getOptionLabel={(option) => option.service_name}
                      renderInput={(params) => <TextField {...params} label="Services" variant="outlined" />}
                    />
                  </TableCell>

                  <TableCell className='truncate' component='th' scope='row'>
                    <TextField
                      className=''
                      required
                      disabled
                      label='Rate'
                      id={`rate-${i}`}
                      name='rate'
                      value={n.rate}
                      variant='outlined'
                      fullWidth
                    />
                  </TableCell>

                  <TableCell className='truncate' component='th' scope='row'>
                    <TextField
                      className='w-128'
                      required
                      type="number"
                      label='Days/Qty'
                      id={`qty-${i}`}
                      name='qty'
                      value={n.qty}
                      onChange={handleMultiChange(i)}
                      variant='outlined'
                      disabled={_.find(services, {id: n.service_id})?.service_type === "2"}
                      fullWidth
                    />
                  </TableCell>

                  <TableCell component='th' scope='row' align='left' className="min-w-96">
                    <Autocomplete
                      className=''
                      value={n.discount}
                      onChange={(ev, value) => handleSelectChange(value, 'discount', i)}
                      placeholder='Select discount type'
                      options={discounts}
                      getOptionLabel={(option) => (`${option.amount}%`)}
                      renderInput={(params) => <TextField {...params} label="Discount types" variant="outlined" />}
                    />
                  </TableCell>

                  <TableCell align='right'>
                    <IconButton onClick={removeServiceRow(i)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </FuseScrollbars>

      <div className="flex justify-end space-x-8 my-16">
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

export default withRouter(SelectServices);
