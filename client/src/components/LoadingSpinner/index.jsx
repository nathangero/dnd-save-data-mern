import PropTypes from "prop-types";
import { Oval } from "react-loader-spinner";

export default function LoadingSpinner({ spinnerText }) {

  const styles = {
    spinner: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }
  }

  return (
    <>
      <div className="modal" id="modal-loading-spinner" data-bs-backdrop="static" tabIndex="-1" aria-labelledby="modalLoadingSpinner" aria-hidden="true">
        <div className="modal-dialog modal-sm modal-dialog-centered">
          <div className="modal-content">
            <div className="p-3" style={styles.spinner}>
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
    </>
  )
}

LoadingSpinner.propTypes = {
  spinnerText: PropTypes.string,
};