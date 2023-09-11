import { Spinner } from "./Spinner"
import PropTypes from 'prop-types'

const Button = ({ isLoading = false, children, ...rest }) => {
    return(
        <button disabled={isLoading} className="inline-flex items-center bg-primary-500 hover:bg-primary-700 hover:transition-all duration-300 text-white py-2 px-4 rounded focus:outline-none disabled:cursor-not-allowed disabled:bg-slate-300" {...rest}>
            {isLoading && <div className="mr-2"><Spinner color="fill-white" size={4} /></div>}
            {children}
        </button>
    )
}

Button.propTypes = {
    isLoading: PropTypes.bool,
    children: PropTypes.string
  };

export { Button }