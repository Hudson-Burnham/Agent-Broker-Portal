import { Alert, Snackbar } from "@mui/material"
import { Dispatch, SetStateAction } from "react"

type Props = {
    showAlert: number,
    alertText: string,
    setShowAlert: Dispatch<SetStateAction<number>>
}
function AlertContainer(props: Props) {
  return (
    <Snackbar
    open={true}
    autoHideDuration={300}
    anchorOrigin={{ vertical: "top", horizontal: "center" }}
    sx={{ position: "absolute" }}
    style={{width: '100%'}}
  >
    <Alert
      severity={props.showAlert > 0 ? "success" : "error"}
      onClose={() => props.setShowAlert(0)}
    >
      {props.alertText}
    </Alert>
  </Snackbar>
  )
}

export default AlertContainer