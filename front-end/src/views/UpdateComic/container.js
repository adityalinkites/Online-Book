import { connect } from 'react-redux';
import { PreFillDataAPI, UpdateComicAPI } from '../../store/updateComic/duck';
import AddComicComponent from './component'; 

const AddComicContainer = connect(
  // Map state to props
  (state) => ({
    updateComic: state?.updateComic
  }),
  // Map actions to dispatch and props
  {
    PreFillDataAPI,
    UpdateComicAPI,
  }
)(AddComicComponent)

export default AddComicContainer;