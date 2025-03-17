import { useNavigate, useParams, useLocation } from "react-router-dom";

// HOC to inject router props into class components
export function withRouter(Component) {
    return function WrapperComponent(props) {
        const params = useParams();   // Get URL parameters (like ID)
        const navigate = useNavigate(); // Used for navigation
        const location = useLocation(); // Get current route info

        return <Component {...props} params={params} navigate={navigate} location={location} />;
    };
}
