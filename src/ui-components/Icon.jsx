import PropTypes from 'prop-types'

export const Icon = ({name}) => {
    return(        
        <i className={`ri-${name}`} />        
    )
}

Icon.propTypes = {
    name: PropTypes.string
}