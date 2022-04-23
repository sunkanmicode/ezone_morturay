import React, { useEffect } from 'react';
import { withRouter } from "react-router-dom"
import { useDispatch } from "react-redux"
import { FusePageCarded } from '@fuse';
import { withStyles } from '@material-ui/core/styles';
import withReducer from 'app/store/withReducer';
import reducer from '../store/reducers';
import * as Actions from '../store/actions';
import DiscountsList from './DiscountsList';
import DiscountsHeader from './DiscountsHeader';
import DiscountsToolbar from './DiscountsToolbar';
import AddDiscount from './AddDiscount';

const styles = (theme) => ({
  layoutRoot: {},
});

function Discounts(props) {
  const { classes, match } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(Actions.getDiscounts())
  }, [dispatch])

  if(match.params.id === "new"){
    return <AddDiscount />
  }

  return (
    <FusePageCarded
      classes={{
        root: classes.layoutRoot,
        content: 'flex',
        header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
      }}
      header={<DiscountsHeader />}
      contentToolbar={
        props.match.params.id ? <DiscountsToolbar /> : null
      }
      content={
        <div className='w-full'>
          <DiscountsList />
        </div>
      }
      innerScroll
    />
  );
}

export default withReducer('inventoryApp', reducer)(withStyles(styles, { withTheme: true })(withRouter(Discounts)));
