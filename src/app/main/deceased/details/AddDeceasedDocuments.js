import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "@lodash";
import { FuseScrollbars, FuseAnimate, FuseUtils } from "@fuse";
import { withRouter } from "react-router-dom";
import * as Actions from "../store/actions";
import { useForm } from "@fuse/hooks";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
} from "@material-ui/core";
import InfoIcon from "@material-ui/icons/InfoOutlined";
import Dropzone from "../../customers/new-customer/tabs/Dropzone";




function AddDeceasedDocuments(props) {
  const dispatch = useDispatch();
 
  const defaultFormState = {

      deceased_id: "",
      deceased_image: "",
      record_of_death_from_hospital: "",
      supporting_document: "",
  };
  const { form, handleChange, setForm } = useForm(defaultFormState);
  

  const addDeceasedDocuments = useSelector(
    ({ deceasedApp }) => deceasedApp.deceased.addDeceasedDocuments
  );
  


  useEffect(() => {
    if (addDeceasedDocuments.data) {
      setForm((state) => ({
        ...state,
        ...defaultFormState,
        deceased_id: addDeceasedDocuments.data.id,
        deceased_image: addDeceasedDocuments.data.deceased_image,
      }));
    }
  }, [addDeceasedDocuments.data, useForm]);
   

    const handleImageUpload = (name, files) => {
      FuseUtils.toBase64(files[0]).then((data) => {
        setForm(_.set({ ...form }, name, data));
      });
    };

    const deleteImage = (name) => (e) => {
      setForm(_.set({ ...form }, name, ""));
    };

  function handleSubmit(event) {
    event.preventDefault();
    
    dispatch(Actions.addDocumentToDeceased(form));
    closeComposeDialog();
  }

  function closeComposeDialog() {
    dispatch(Actions.closeAddDceasedDocuments());

  }

  return (
    <Dialog
      classes={{
        paper: "m-24",
      }}
      open={addDeceasedDocuments.props.open}
      onClose={closeComposeDialog}
      fullWidth
      maxWidth="xs"
    >
      <form
        noValidate
        onSubmit={handleSubmit}
        className="flex flex-col overflow-hidden"
      >
        <DialogContent classes={{ root: "p-24" }}>
          <div className="md:w-4/12 max-w-4xl mx-auto">
            <div className="flex flex-col">
              <FuseScrollbars className="flex-grow overflow-x-auto">
                <Dropzone
                  name="deceased_image"
                  title="deceased_image"
                  form={form}
                  deleteImage={deleteImage}
                  handleImageUpload={handleImageUpload}
                  icon="/assets/images/icons/picture.svg"
                  format="image"
                  disabled="false"
                />
                <Dropzone
                  name="record_of_death_from_hospital"
                  title="record_of_death_from_hospital"
                  form={form}
                  deleteImage={deleteImage}
                  handleImageUpload={handleImageUpload}
                  icon="/assets/images/icons/upload.svg"
                  format="pdf" // images
                  disabled="false"
                />
                <Dropzone
                  name="supporting_document"
                  title="supporting_document"
                  form={form}
                  deleteImage={deleteImage}
                  handleImageUpload={handleImageUpload}
                  icon="/assets/images/icons/upload.svg"
                  format="pdf" // images
                  disabled="false"
                />
              </FuseScrollbars>
            </div>
          </div>
        </DialogContent>

        <DialogActions className="justify-end pr-24">
          <div className="flex justify-end space-x-8 my-16 pb-16">
            <FuseAnimate animation="transition.slideRightIn" delay={300}>
              <Button
                className="whitespace-no-wrap"
                variant="contained"
                onClick={handleSubmit}
                type="submit"
              >
                Save
              </Button>
            </FuseAnimate>
          </div>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default AddDeceasedDocuments;
