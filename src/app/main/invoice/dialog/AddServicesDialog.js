import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import {
  CircularProgress,
  Button,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  TextField,
  IconButton,
  Dialog,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import { useForm } from "@fuse/hooks";
import * as Actions from "../store/actions";
import { Autocomplete } from "@material-ui/lab";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import { FuseScrollbars, FuseAnimate } from "@fuse";
import { withRouter } from "react-router-dom";



function AddServicesDialog(props) {
  const servicesDialog = useSelector(
    ({ invoicesApp }) => invoicesApp.invoices.addServiceDialog
  );
  const serviceReducer = useSelector(({ invoicesApp }) => invoicesApp.services);
  const discountsReducer = useSelector(
    ({ invoicesApp }) => invoicesApp.discounts
  );
  const invoices = useSelector(
    ({ invoicesApp }) => invoicesApp.invoices.invoice
  );

    const services = serviceReducer.services.services;
    const discounts = discountsReducer.discounts;

  

  const defaultFormState = {
    services: [
      {
        service_id: "",
        rate: "",
        qty: "",
        discount_amount: 0,
        org_key: "ORG-1593451692921",
        invoice_id: "",
        branch_id: "",
      },
    ],
  };


  const dispatch = useDispatch();
  const { form, handleChange, setForm } = useForm(defaultFormState);

  function handleSelectChange(value, name, i) {
    const newService = [...form.services];
    if (name === "service_id") {
      newService[i][name] = value ? value.id : null;
      newService[i].rate = value ? value.amount : "";
      // if (value?.service_type === '1' || value?.service_type === '2') {
      //   newService[i].qty = 1;
      // }
      newService[i].qty = 1;
      // newService[i].discount_amount = 0;
      newService[i].branch_id = invoices.branch_id;
      newService[i].invoice_id = invoices.id;
      console.log(newService, 'newserhandle');
    } else {
      newService[i][name] = value;
    }

    setForm({ ...form, services: newService });
  }

 function addServiceRow() {
   const newRole = {
     service_id: "",
     rate: "",
     qty: "",
     discount_amount: 0,
     org_key: "ORG-1593451692921",
     invoice_id: "",
     branch_id: "",
   };
   setForm({ ...form, services: [...form.services, newRole] });
 }

  const removeServiceRow = (i) => () => {
    setForm({ ...form, services: form.services.filter((s, k) => k !== i) });
  };

  const handleMultiChange = (i) => (event) => {
    const { name, value } = event.target;
    const { service } = form;
    if (name === "service_id") {
      const serv = services.find((s) => s.id === value);
      service[i][name] = serv.id;
      service[i].rate = serv.amount || "";
      if (
        _.find(services, { id: service[i].service_id })?.service_type === "2"
      ) {
        service[i].qty = 1;
      }
    } else {
      service[i][name] = value;
    }
    setForm({ ...form, service });
  };

  const initDialog = useCallback(() => {
    /**
     * Dialog type: 'new'
     */
    if (servicesDialog.data) {
      setForm({
        ...defaultFormState,
        ...servicesDialog.data,
      });
    }
  }, [servicesDialog.data, setForm]);

  useEffect(() => {
    /**
     * After Dialog Open
     */
    if (servicesDialog.props.open) {
      initDialog();
    }
  }, [servicesDialog.props.open, initDialog]);

  function closeComposeDialog() {
    dispatch(Actions.closeAddServiceDialog());
  }

  function handleSubmit(event) {
    event.preventDefault();

    dispatch(Actions.addService(form, invoices.id));
    
  }



  return (
    <Dialog
      classes={{
        paper: "m-24",
      }}
      {...servicesDialog.props}
      onClose={closeComposeDialog}
      fullWidth
      maxWidth="s"
    >
      <form
        noValidate
        onSubmit={handleSubmit}
        className="flex flex-col overflow-hidden"
      >
        <DialogContent>
          <div className="w-full flex flex-col">
            <FuseScrollbars className="flex-grow overflow-x-auto">
              <Table className="" aria-labelledby="tableTitle">
                <TableHead>
                  <TableRow>
                    <TableCell>Services</TableCell>
                    <TableCell>Rate</TableCell>
                    <TableCell>Days/Qty</TableCell>
                    <TableCell>Discount</TableCell>
                    <TableCell align="right">
                      <IconButton onClick={addServiceRow}>
                        <AddIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {form.services.map((n, i) => {
                    const isSelected = form.services.indexOf(n.id) !== -1;
                    return (
                      <TableRow
                        className="h-48"
                        aria-checked={isSelected}
                        tabIndex={-1}
                        key={i}
                        selected={isSelected}
                        onClick={() => {}}
                      >
                        <TableCell component="th" scope="row">
                          <Autocomplete
                            className="min-w-192"
                            id={`service_id-${i}`}
                            value={
                              n.service_id
                                ? _.find(services, { id: n.service_id })
                                : null
                            }
                            onChange={(ev, value) =>
                              handleSelectChange(value, "service_id", i)
                            }
                            placeholder="Select services"
                            options={services}
                            getOptionLabel={(option) => option.service_name}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="Services"
                                variant="outlined"
                              />
                            )}
                          />
                        </TableCell>

                        <TableCell
                          className="truncate"
                          component="th"
                          scope="row"
                        >
                          <TextField
                            className=""
                            required
                            disabled
                            label="Rate"
                            id={`rate-${i}`}
                            name="rate"
                            value={n.rate}
                            variant="outlined"
                            fullWidth
                          />
                        </TableCell>

                        <TableCell
                          className="truncate"
                          component="th"
                          scope="row"
                        >
                          <TextField
                            className="w-128"
                            required
                            type="number"
                            label="Days/Qty"
                            id={`qty-${i}`}
                            name="qty"
                            value={n.qty}
                            onChange={handleMultiChange(i)}
                            variant="outlined"
                            disabled={
                              _.find(services, { id: n.service_id })
                                ?.service_type === "2"
                            }
                            fullWidth
                          />
                        </TableCell>

                        <TableCell
                          component="th"
                          scope="row"
                          align="left"
                          className="min-w-96"
                        >
                          <Autocomplete
                            className=""
                            value={n.discount_amount}
                            onChange={(ev, value) =>
                              handleSelectChange(value, "discount_amount", i)
                            }
                            placeholder="Select discount type"
                            options={discounts}
                            getOptionLabel={(option) => `${option.amount}%`}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="Discount types"
                                variant="outlined"
                              />
                            )}
                          />
                        </TableCell>

                        <TableCell align="right">
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
          </div>
        </DialogContent>
        <div className="flex justify-end space-x-8 my-16">
          <FuseAnimate animation="transition.slideRightIn" delay={300}>
            <DialogActions className="justify-end pr-32 py-16">
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                type="submit"
                // disabled={loading ? loading : !canBeSubmitted()}
                // endIcon={loading && <CircularProgress />}
              >
                Save
              </Button>
            </DialogActions>
          </FuseAnimate>
        </div>
      </form>
    </Dialog>
  );
}

export default AddServicesDialog;
