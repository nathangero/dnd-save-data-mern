import PropTypes from "prop-types";

export default function Alert({ centered, title, body }) {


  return (
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal fade" id="alertModal" tabIndex="-1" aria-labelledby="alertModalLabel" aria-hidden="true">
        <div className={`${centered ? "modal-dialog modal-dialog-centered" : "modal-dialog"}`}>
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{title}</h5>
            </div>
            <div className="modal-body custom-modal-body">
              <p className="modal-title text-center fs-5">
                {body}
              </p>
            </div>
            <div className="modal-body text-end">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Got it</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

Alert.propTypes = {
  title: PropTypes.string,
  body: PropTypes.string,
  centered: PropTypes.bool,
};