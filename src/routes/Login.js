import {useState} from "react";
import podify_logo from "../assets/images/podify-green.png";
import TextInput from "../components/shared/TextInput";
import PasswordInput from "../components/shared/PasswordInput";
import {Link, useNavigate} from "react-router-dom";
import { makeUnauthenticatedPOSTRequest } from "../utils/ServerHelpers";
import {useCookies} from "react-cookie";
import { isLabelWithInternallyDisabledControl } from "@testing-library/user-event/dist/utils";
import LoadingSpinner from "../components/shared/LoadingSpinner";

const LoginComponent = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cookies, setCookie] = useCookies(["token"]);
    const [loading, setLoading]=useState(false);
    const navigate = useNavigate();

    const login = async () => {
        const data = {email, password};
        const response = await makeUnauthenticatedPOSTRequest(
            "/auth/login",
            data
        );
        if (response && !response.err) {
            const token = response.token;
            const date = new Date();
            date.setDate(date.getDate() + 30);
            setCookie("token", token, {path: "/", expires: date});
            //alert("Logged in successfully!");
            setLoading(false);
            navigate("/home");
        } else {
            setLoading(false);
            alert("Invalid Credentials");
        }
    };

    return (
        <div className="w-full h-full flex flex-col items-center">
            <div className="logo p-5 border-b border-solid border-gray-300 w-full flex justify-center">
            <img
                            src={podify_logo}
                            alt="podify logo"
                            width={125}
                        />
            </div>
            <div className="inputRegion w-1/3 py-10 flex items-center justify-center flex-col">
                <div className="font-bold mb-4">
                    To continue, log in to Podify.
                </div>
                <TextInput
                    label="Email address or username"
                    placeholder="Email address or username"
                    className="my-6"
                    value={email}
                    setValue={setEmail}
                />
                <PasswordInput
                    label="Password"
                    placeholder="Password"
                    value={password}
                    setValue={setPassword}
                />
                <div className=" w-full flex items-center justify-end my-8">
                    <button
                        className="bg-green-400 font-semibold p-3 px-10 rounded-full"
                        onClick={(e) => {
                            e.preventDefault();
                            if(!loading){
                                login();
                            }
                            setLoading(true);
                        }}
                    >
                        {loading?<LoadingSpinner/>: "LOG IN"}
                    </button>
                </div>
                <div className="w-full border border-solid border-gray-300"></div>
                <div className="my-6 font-semibold text-lg">
                    Don't have an account?
                </div>
                <div className="border border-gray-500 text-gray-500 w-full flex items-center justify-center py-4 rounded-full font-bold">
                    <Link to="/signup">SIGN UP TO PODIFY</Link>
                </div>
            </div>
        </div>
    );
};

export default LoginComponent;
