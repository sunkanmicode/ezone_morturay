import React from 'react';
import { Icon, IconButton } from '@material-ui/core';
import { FuseAnimate } from '@fuse';
import { withRouter } from 'react-router-dom';

function ReportsToolbar(props) {
  // const [anchorEl, setAnchorEl] = useState(null);

  // function handleClick(event) {
  //   setAnchorEl(event.currentTarget);
  // }

  // function handleClose() {
  //   setAnchorEl(null);
  // }

  // const open = Boolean(anchorEl);
  // const id = open ? 'simple-popover' : null;

  return (
    <div className='flex flex-1 items-center justify-between overflow-hidden sm:px-16 py-2'>
      <div className='flex items-start space-x-8'></div>

      <div className='flex items-center justify-start' aria-label='Toggle star'>
        <FuseAnimate animation='transition.expandIn' delay={100}>
          <IconButton onClick={() => {}}>
            <Icon>print</Icon>
          </IconButton>
        </FuseAnimate>
        {/* <FuseAnimate animation='transition.expandIn' delay={100}>
          <div className='ml-16'>
            <Button
              aria-describedby={id}
              variant='contained'
              size='small'
              disableElevation
              onClick={handleClick}
            >
              <span className='whitespace-no-wrap'>Export as</span>{' '}
              <Icon>expand_more</Icon>
            </Button>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
            >
              <MenuItem>PDF</MenuItem>
              <MenuItem>PNG</MenuItem>
            </Popover>
          </div>
        </FuseAnimate> */}
      </div>
    </div>
  );
}

export default withRouter(ReportsToolbar);
