import React, { useEffect } from 'react';
import { useDispatch } from "react-redux"
import { withRouter } from "react-router-dom"
import { FusePageCarded } from '@fuse';
import { withStyles } from '@material-ui/core/styles';
import withReducer from 'app/store/withReducer';
import reducer from '../store/reducers';
import * as Actions from '../store/actions';
import ItemsList from './ItemsList';
import ItemDetails from './ItemDetails';
import ItemsHeader from './ItemsHeader';
import ItemsToolbar from './ItemsToolbar';
import AddItem from './AddItem';
import ItemDialog from './ItemDialog';

const styles = (theme) => ({
  layoutRoot: {},
});

function Items(props) {
  const { classes, match } = props;
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(Actions.getItems())
  }, [dispatch])


  if(match.params.id === "new"){
    return <AddItem />
  }

  return (
    <div>
      <FusePageCarded
        classes={{
          root: classes.layoutRoot,
          content: 'flex',
          header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
        }}
        header={<ItemsHeader />}
        contentToolbar={
          props.match.params.id ? <ItemsToolbar /> : null
        }
        content={
          <div className='p-24'>
            {props.match.params.id ? <ItemDetails /> : <ItemsList />}
          </div>
        }
        innerScroll
      />

      <ItemDialog />
    </div>
  );
}

export default withReducer('inventoryApp', reducer)(withStyles(styles, { withTheme: true })(withRouter(Items)));
