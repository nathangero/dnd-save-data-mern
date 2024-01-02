import PropTypes from "prop-types";
import { Oval } from "react-loader-spinner";
import "./style.css";

export default function LoadingSpinner({ spinnerText, useModal = true, }) {

  return (
    <>
      {useModal ?
        <div className="modal" id="modal-loading-spinner" data-bs-backdrop="static" tabIndex="-1" aria-labelledby="modalLoadingSpinner" aria-hidden="true">
          <div className="modal-dialog modal-sm modal-dialog-centered">
            <div className="modal-content">
              <div className="p-3 spinner-proper">
                <Oval
                  visible={true}
                  height="80"
                  width="80"
                  color="#42B6E8"
                  secondaryColor="#009ee1"
                  ariaLabel="oval-loading"
                  strokeWidth={5}
                />

                <h2>{spinnerText}</h2>
              </div>
            </div>
          </div>
        </div>

        :
        <div className="p-3 spinner-proper">
          <Oval
            visible={true}
            height="80"
            width="80"
            color="#42B6E8"
            secondaryColor="#009ee1"
            ariaLabel="oval-loading"
            strokeWidth={5}
          />

          <h2>{spinnerText}</h2>
        </div>
      }
    </>
  )
}

LoadingSpinner.propTypes = {
  spinnerText: PropTypes.string,
  useModal: PropTypes.bool,
};