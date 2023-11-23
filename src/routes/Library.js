import LoggedInContainer from "../containers/LoggedInContainer";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { makeAuthenticatedGETRequest, makeAuthenticatedDELETERequest } from "../utils/ServerHelpers";


const Library = () => {

    const [myRecords, setMyRecords] = useState([]);
    useEffect(() => {
        const getData = async () => {
            const response = await makeAuthenticatedGETRequest(
                "/record/get/me"
            );
            setMyRecords(response.data);
        };
        getData();
    }, [myRecords]);

    const deleteRecord = async (recordId) => {
        try {
            const response = await makeAuthenticatedDELETERequest(`/record/delete/${recordId}`);
            console.log(response); // Log the response if needed
        } catch (error) {
            console.error('Error deleting record:', error);
            // Handle error scenarios here
        }
    };


    return (
        <LoggedInContainer curActiveScreen="library">
            <div className="text-white text-xl pt-8 font-semibold">
                My Records
            </div>
            <div className="py-5 grid gap-5 grid-cols-5">
                {myRecords.map((item) => {
                    return (
                        <Card
                            key={JSON.stringify(item)}
                            title={item.name}
                            owner={item.owner.firstName}
                            imgUrl={item.thumbnail}
                            recordId={item._id}
                            deleteRecord={deleteRecord}
                        />
                    );
                })}
            </div>
        </LoggedInContainer>
    );
}

const Card = ({ title, owner, imgUrl, recordId, deleteRecord }) => {
    const navigate = useNavigate();
    return (
        <div
            className="bg-black bg-opacity-40 w-full p-4 rounded-lg "

        >
            <div className="pb-4 pt-2 cursor-pointer" onClick={() => {
                navigate("/record/" + recordId);
            }}>
                <img className="w-full rounded-md" src={imgUrl} alt="label" />
            </div>
            <div className="text-white font-semibold py-3">{title}</div>
            <div className="flex justify-between py-3">
                <div className="text-gray-500 text-sm">{owner}</div>
                <Icon icon="ant-design:delete-filled" className="text-lg cursor-pointer text-gray-500" onClick={
                    () => {
                        //console.log("Delete Button");
                        deleteRecord(recordId);
                    }
                    
                } />
            </div>

        </div>
    );
};

export default Library;