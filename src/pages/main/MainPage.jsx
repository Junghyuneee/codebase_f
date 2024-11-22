import VisitorIp from "../../components/admin/VisitorIp.jsx";
import {Button} from "reactstrap";
import {postSignOut} from "@/api/auth.js";

const MainPage = () => {
  return (
    <div className="container-fluid">
      MainPage
        <Button onClick={postSignOut}>
            Logout
        </Button>
      <VisitorIp />
    </div>
  )
}

export default MainPage