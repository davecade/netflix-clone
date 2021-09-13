import { connect } from 'react-redux'
import './banner.styles.scss'

const Banner = ({bannerImage}) => {

    return (
        <div className="banner__container">
            <img className="banner__image" alt="banner" src={bannerImage} style={{
            width: "100vw"
            }}></img>
            <div className="banner__bottom__blur"></div>
        </div>
    )
}

const mapStateToProps = state => ({
    bannerImage: state.film.bannerImage
})

export default connect(mapStateToProps)(Banner)
