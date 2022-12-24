import React from 'react'
import { send_proposal, adminProposalAcceptedList } from '../../actions/premiumActions'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from "react-hook-form";




function SendProposalModal(props) {

  const dispatch = useDispatch()
  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: "onChange"
  });
  const registerOptions = {
    proposal_content: { required: "Proposal is required" },
    rate: { required: "Rate is required" },
    description: {
      required: "Description is required",
      pattern: {
        value: /^[a-zA-Z!”$%&'()*\+,\/;\[\\\]\^_`{|}~.0-9\ ]+$/,
        message: "Enter valid description about yourself",
      },
    },


  };

  const sendProposal = (e) => {
    dispatch(send_proposal(
      props.id,
      e.proposal_content[0],
      e.rate,
      e.description
    )).then(() => {
      props.handleModalClose()
      dispatch(adminProposalAcceptedList())
    })



  }

  return (

    <div class="modal fade show" id="exampleModalCenter" style={{ display: "block", paddingRight: "17px" }} aria-modal="true" role="dialog">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Send Proposal</h5>
            <button type="button" class="btn-close" onClick={() => props.handleModalClose()}>
            </button>
          </div>
          <form onSubmit={handleSubmit(sendProposal)}>
            <div class="modal-body">
              <div class="basic-form">
                <div class="mb-3 row">
                  <label class="col-sm-3 col-form-label">Design</label>
                  <div class="col-sm-9">
                    <div class="form-file">
                      <input type="file" name='proposal_content' class="form-file-input form-control" {...register('proposal_content', registerOptions.proposal_content)} />
                    </div>
                    <small className="text-danger">
                      {errors?.proposal_content && errors.proposal_content.message}
                    </small>
                  </div>
                </div>
                <div class="mb-3 row">
                  <label class="col-sm-3 col-form-label">Description</label>
                  <div class="col-sm-9">
                    <textarea name='description' class="form-control" rows="4" id="comment" {...register('description', registerOptions.description)}></textarea>
                    <small className="text-danger">
                      {errors?.description && errors.description.message}
                    </small>
                  </div>
                </div>
                <div class="mb-3 row">
                  <label class="col-sm-3 col-form-label">Rate</label>
                  <div class="col-sm-9">
                    <input type="number" min={0} name="rate" class="form-control" placeholder="Enter the Rate" {...register('rate', registerOptions.rate)} />
                    <small className="text-danger">
                      {errors?.rate && errors.rate.message}
                    </small>
                  </div>

                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-danger light" onClick={() => props.handleModalClose()}>Close</button>
              <button type="submit" class="btn btn-primary" >Send Proposal</button>
            </div>
          </form>

        </div>
      </div>
    </div>

  )
}

export default SendProposalModal