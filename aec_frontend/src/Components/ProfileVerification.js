import React, { useEffect, useState } from "react";
import "../componentsCSS/pdfpreview.css";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { profileverification, getUserRequest } from "../actions/userActions";
import { USER_PROFILEREQUEST_INDIVIDUAL_VIEW } from '../constants/userConstants'
import "../componentsCSS/pdfpreview.css";
import Status_Success from "../profileveri_components/Status_Success";
import StatusPending from "../profileveri_components/StatusPending";
import StatusRejected from "../profileveri_components/StatusRejected";


function ProfileVerification() {
    const [reload, setReload] = useState(false);
    const [image, setImage] = useState('');
    const [cv, setCv] = useState('');
    const [certi, setCertifi] = useState('');
    const {
        register,
        handleSubmit,
        watch,
        control,
        formState: { errors },
    } = useForm({
        mode: "onChange",
    });

    const handleImageUpload = (e) => {
        let file = e.target.files[0]
        setImage(file)
    }
    const handleCVUpload = (e) => {
        let file = e.target.files[0]
        setCv(file)
    }
    const handleCertiUpload = (e) => {
        let file = e.target.files[0]
        setCertifi(file)
    }
    const registerOptions = {
        role: {
            required: "Your category is required",

        },
        dob: {
            required: "Date of birth is required",
        },
        id_image: {
            required: "Government ID is  is required",
        },
        cv_pdf: {
            required: "C V is required",
        },
        certipdf: {
            required: "Certificate is required",
        },
        location: {
            required: "Location is required",
            pattern: {
                value: /^[A-Za-z]+$/,
                message: "Enter valid Location",
            },
        },
        description: {
            required: "About yourself is required",
            pattern: {
                value: /^[a-zA-Z!”$%&'()*\+,\/;\[\\\]\^_`{|}~. ]+$/,
                message: "Enter valid description about yourself",
            },
        },
        website: {
            required: "Portfolio website is is required",
            pattern: {
                value: /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
                message: 'Portfolio website is not valid.'
            }
        },
        experience: {
            required: "Experience is required",
            maxLength: {
                value: 2,
                message: "Enter Valid experience",
            },
            minLength: {
                value: 1,
                message: "Enter Valid experience",
            },
        },
        cerificate: { required: "Certificate is required" },
        cv: { required: "C V is required" },

        id_proof: {
            required: "ID Proof is required",
            // validate: {
            //     lessThan10MB: (id_proof) => id_proof[0]?.size < 10000000 || "Max 10MB",
            //     acceptedFormats: (id_proof) =>
            //         ["image/jpeg", "image/png", "image/gif"].includes(
            //             id_proof[0]?.type
            //         ) || "Only PNG, JPEG e GIF",
            // },
        }
    };
    const productImageRegister = register("id_image", registerOptions.id_image)
    const CVRegister = register("cv_pdf", registerOptions.cv_pdf)
    const CertiRegister = register("certipdf", registerOptions.certipdf)

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin




    const Profileinfo = useSelector((state) => state.userProfileVerification);
    let { loading, fullProfileInfo, error, status, prof_request, prof_request_error } = Profileinfo;


    useEffect(() => {
        dispatch(getUserRequest())
    }, [reload]);


    const submitHandler = (e) => {
        const user = userInfo.id;
        const role = e.role;
        const location = e.location;
        const experience = e.experience;
        const description = e.description;
        const dob = e.dob;
        const website = e.website;
        const id_image = image;
        const cv_pdf = cv;
        const certi_pdf = certi;
        dispatch(
            profileverification(user,role,location,experience,description,dob,website,id_image,cv_pdf,certi_pdf)
        ).then(() => {
            setReload(!reload);
        });
    };
    return (
        <div>
            {!prof_request && 
            <div className="row justify-content-center h-100 align-items-center">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-header">
                            <h4 className="card-title">Profile Verification</h4>
                        </div>
                        <div className="card-body">
                            <div className="form-validation">
                                <form
                                    className="needs-validation"
                                    onSubmit={handleSubmit(submitHandler)}
                                    
                                >
                                    <div className="row">
                                        <div className="col-xl-6">
                                            <div className="mb-3 row">
                                                <label
                                                    className="col-lg-4 col-form-label"
                                                    htmlFor="validationCustom01"
                                                >
                                                    Choose your category
                                                    <span className="text-danger">*</span>
                                                </label>
                                                <div className="col-lg-6">
                                                    <div className="form-check mt-2">
                                                        <input
                                                            className="form-check-input"
                                                            type="radio"
                                                            name="role"
                                                            value="ARCHITECT"
                                                            {...register('role', registerOptions.role)}
                                                        />
                                                        <label className="form-check-label">
                                                            Architect
                                                        </label>
                                                    </div>
                                                    <div className="form-check mt-2">
                                                        <input
                                                            className="form-check-input"
                                                            type="radio"
                                                            name="role"
                                                            value="ENGINEER"
                                                            {...register('role', registerOptions.role)}

                                                        />
                                                        <label className="form-check-label">
                                                            Engineer
                                                        </label>
                                                    </div>
                                                    <div className="form-check  mt-2">
                                                        <input
                                                            className="form-check-input"

                                                            type="radio"
                                                            name="role"
                                                            value="CONSTRUCTOR"
                                                            {...register('role', registerOptions.role)}

                                                        />
                                                        <label className="form-check-label">
                                                            Constructor
                                                        </label>
                                                    </div>
                                                    <small className="text-danger">
                                                        {errors?.role && errors.role.message}
                                                    </small>
                                                </div>
                                            </div>
                                            <div className="mb-3 row">
                                                <label
                                                    className="col-lg-4 col-form-label"
                                                    htmlFor="validationCustom02"
                                                >
                                                    Location <span className="text-danger">*</span>
                                                </label>
                                                <div className="col-lg-6">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="validationCustom02"
                                                        placeholder="Your Location"
                                                        name="location"
                                                        {...register('location', registerOptions.location)}
                                                    />
                                                    <small className="text-danger">
                                                        {errors?.location && errors.location.message}
                                                    </small>
                                                </div>
                                            </div>
                                            <div className="mb-3 row">
                                                <label
                                                    className="col-lg-4 col-form-label"
                                                    htmlFor="validationCustom10"
                                                >
                                                    Experience{" "}
                                                    <span className="text-danger">*</span>
                                                </label>
                                                <div className="col-lg-6">
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        id="validationCustom10"
                                                        placeholder="Your Experience(in years)"
                                                        name="experience"
                                                        {...register('experience', registerOptions.experience)}

                                                        min={0}
                                                    />
                                                    <small className="text-danger">
                                                        {errors?.experience && errors.experience.message}
                                                    </small>
                                                </div>
                                            </div>

                                            <div className="mb-3 row">
                                                <label
                                                    className="col-lg-4 col-form-label"
                                                    htmlFor="validationCustom04"
                                                >
                                                    About yourself{" "}
                                                    <span className="text-danger">*</span>
                                                </label>
                                                <div className="col-lg-6">
                                                    <textarea
                                                        className="form-control"
                                                        id="validationCustom04"
                                                        rows="8"
                                                        placeholder="Tell us more about yourself"
                                                        name="description"
                                                        {...register('description', registerOptions.description)}
                                                    ></textarea>
                                                    <small className="text-danger">
                                                        {errors?.description && errors.description.message}
                                                    </small>
                                                </div>
                                            </div>
                                            <div className="mb-3 row">
                                                <label
                                                    className="col-lg-4 col-form-label"
                                                    htmlFor="validationCustom06"
                                                >
                                                    Date of Birth
                                                    <span className="text-danger">*</span>
                                                </label>
                                                <div className="col-lg-6">
                                                    <input
                                                        type="date"
                                                        className="form-control"
                                                        id="validationCustom06"
                                                        name="dob"
                                                        {...register('dob', registerOptions.dob)}

                                                    />
                                                    <small className="text-danger">
                                                        {errors?.dob && errors.dob.message}
                                                    </small>
                                                </div>
                                            </div>
                                            <div className="mb-3 row">
                                                <label
                                                    className="col-lg-4 col-form-label"
                                                    htmlFor="validationCustom07"
                                                >
                                                    Portfolio Website
                                                    <span className="text-danger">*</span>
                                                </label>
                                                <div className="col-lg-6">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="validationCustom07"
                                                        placeholder="http://example.com"
                                                        name="website"
                                                        {...register('website', registerOptions.website)}
                                                    />
                                                    <small className="text-danger">
                                                        {errors?.website && errors.website.message}
                                                    </small>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xl-6">
                                            <div className="mb-3 row">
                                                <label
                                                    className="col-lg-4 col-form-label"
                                                    htmlFor="validationCustom08"
                                                >
                                                    Government ID Card
                                                    <span className="text-danger">*</span>
                                                </label>
                                                <div className="col-lg-6">
                                                    <div className="input-group mb-3">
                                                        <div className="form-file">
                                                            <input
                                                                control={control}
                                                                type="file"
                                                                className="form-file-input form-control"
                                                                id="validationCustom08"
                                                                name="id_image"
                                                                {...productImageRegister}
                                                                onChange={e => {
                                                                    productImageRegister.onChange(e);
                                                                    handleImageUpload(e);
                                                                }}
                                                            />

                                                        </div>

                                                    </div>
                                                    {image && <div className="input-group mb-3">
                                                        <img
                                                            alt="Preview"
                                                            width="200px"
                                                            height="200px"
                                                            src={URL.createObjectURL(
                                                                image
                                                            )}
                                                        ></img>

                                                    </div>}
                                                    <small className="text-danger">
                                                        {errors?.id_image && errors.id_image.message}
                                                    </small>
                                                </div>
                                            </div>
                                            <div className="mb-3 row">
                                                <label
                                                    className="col-lg-4 col-form-label"
                                                    htmlFor="validationCustom20"
                                                >
                                                    Curriculum Vitae
                                                    <span className="text-danger">*</span>
                                                </label>
                                                <div className="col-lg-6">
                                                    <div className="input-group mb-3">
                                                        <div className="submit-field">
                                                            <div className="attachments-container margin-top-0 margin-bottom-0">
                                                                <div className="attachment-box ripple-effect">
                                                                    <span>Curriculum Vitae</span>
                                                                    <i>PDF</i>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="input-group mb-3">
                                                        <div className="form-file">
                                                            <input
                                                                control={control}
                                                                type="file"
                                                                className="form-file-input form-control"
                                                                id="validationCustom20"
                                                                name="cv_pdf"
                                                                {...CVRegister}
                                                                onChange={e => {
                                                                    CVRegister.onChange(e);
                                                                    handleCVUpload(e);
                                                                }}
                                                            />

                                                        </div>

                                                    </div>
                                                    <small className="text-danger">
                                                        {errors?.cv_pdf && errors.cv_pdf.message}
                                                    </small>
                                                </div>
                                            </div>
                                            <div className="mb-3 row">
                                                <label
                                                    className="col-lg-4 col-form-label"
                                                    htmlFor="validationCustom21"
                                                >
                                                    Certificate
                                                    <span className="text-danger">*</span>
                                                </label>
                                                <div className="col-lg-6">
                                                    <div className="input-group mb-3">
                                                        <div className="submit-field">
                                                            <div className="attachments-container margin-top-0 margin-bottom-0">
                                                                <div className="attachment-box ripple-effect">
                                                                    <span>Certificate</span>
                                                                    <i>PDF</i>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="input-group mb-3">
                                                        <div className="form-file">
                                                            <input
                                                                control={control}
                                                                type="file"
                                                                className="form-file-input form-control"
                                                                id="validationCustom21"
                                                                name="certipdf"
                                                                {...CertiRegister}
                                                                onChange={e => {
                                                                    CertiRegister.onChange(e);
                                                                    handleCertiUpload(e);
                                                                }}
                                                            />

                                                        </div>

                                                    </div>
                                                    <small className="text-danger">
                                                        {errors?.certipdf && errors.certipdf.message}
                                                    </small>
                                                </div>
                                            </div>

                                            <div className="mb-3 row">
                                                <div className="col-lg-8 ms-auto">
                                                    <button
                                                        type="submit"
                                                        className="btn btn-primary"
                                                    >
                                                        Continue
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>}
            {(prof_request?.verif_send_status === true && prof_request?.is_verified === false && prof_request?.is_rejected === false)&&
            <StatusPending/>}
            {(prof_request?.verif_send_status === true && prof_request?.is_verified === true )&&
            <Status_Success/>}
            {(prof_request?.verif_send_status === true && prof_request?.is_rejected === true)&&
            <StatusRejected/>}
        </div>

    );
}

export default ProfileVerification;
