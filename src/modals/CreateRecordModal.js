import {useState} from "react";
import TextInput from "../components/shared/TextInput";
import {makeAuthenticatedPOSTRequest} from "../utils/ServerHelpers";

const CreateRecordModal = ({closeModal}) => {
    const [recordName, setRecordName] = useState("");
    const [recordThumbnail, setRecordThumbnail] = useState("");

    const createRecord = async () => {
        const response = await makeAuthenticatedPOSTRequest(
            "/record/create",
            {name: recordName, thumbnail: recordThumbnail, podcasts: []}
        );
        if (response._id) {
            closeModal();
        } 
    };  

    return (
        <div
            className="absolute bg-black w-screen h-screen bg-opacity-50 flex justify-center items-center"
            onClick={closeModal}
        >
            <div
                className="bg-app-black w-1/3 rounded-md p-8"
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                <div className="text-white mb-5 font-semibold text-lg">
                    Create Record
                </div>
                <div className="space-y-4 flex flex-col justify-center items-center">
                    <TextInput
                        label="Name"
                        labelClassName={"text-white"}
                        placeholder="Record Name"
                        value={recordName}
                        setValue={setRecordName}
                    />
                    <TextInput
                        label="Thumbnail"
                        labelClassName={"text-white"}
                        placeholder="Thumbnail"
                        value={recordThumbnail}
                        setValue={setRecordThumbnail}
                    />
                    <div
                        className="bg-white w-1/3 rounded flex font-semibold justify-center items-center py-3 mt-4 cursor-pointer"
                        onClick={createRecord}
                    >
                        Create
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateRecordModal;
