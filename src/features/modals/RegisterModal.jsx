import React, {Component} from 'react';
import {Modal} from 'semantic-ui-react';
import {connect} from 'react-redux';

import {closeModal} from "../modals/modalActions";
import RegisterForm from '../auth/Register/RegisterForm';


const mapDispatchToProps = (dispatch) => ({

    closeModal: () => dispatch(closeModal())
  });
  

class RegisterModal extends Component {
    render() {
        return (
            <Modal
                size='mini'
                open={true}
                onClose={this.props.closeModal}
            >
                <Modal.Header>
                    Sign Up to Rad5 Interns Manager!
                </Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <RegisterForm />
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        );
    }
}

export default connect(null, mapDispatchToProps)(RegisterModal);