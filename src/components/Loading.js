import React from 'react';
import PropTypes from 'prop-types';
import { BounceLoader } from 'react-spinners';

const Loading = props => {
  var isLoading = 'flex center full-height full-width is-loading';

  if(props.loaded){
    isLoading = '';
  }

  return (
    <div id="loading-overlay" className={isLoading}>
      <BounceLoader
          color={'white'}
          loading={true}
        />
    </div>
  )
}

Loading.propTypes ={
  loaded: PropTypes.bool.isRequired
}

export default Loading
