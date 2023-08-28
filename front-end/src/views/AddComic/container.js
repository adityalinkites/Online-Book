import { connect } from 'react-redux';
import { AddComicAPI } from '../../store/AddComic/duck';
import AddComicComponent from './component'; 

const AddComicContainer = connect(
  // Map state to props
  (state) => ({
    addComic:state?.addComic,
  }),
  // Map actions to dispatch and props
  {
    AddComicAPI,
  }
)(AddComicComponent)

export default AddComicContainer;