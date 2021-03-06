import React from 'react';
import Logo from "../Basics/Logo";
import '../Basics/Button.scss';
import './Styles/EditProfile.scss';
import Button from "../Basics/Button";
import InputField from "../Basics/InputField";
import ProfileForm from "./Profile";
import DeleteProfile from "../Basics/DeleteProfile";
import LoginForm from "./Login";
import axios from "axios";

class EditProfileForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.data.Name,
            surname: this.props.data.Surname,
            username: this.props.data.Username,
            email: this.props.data.Email,
            address: this.props.data.Address,
            phoneNumber: this.props.data.PhoneNumber,
            bios: this.props.data.Bios,
            error: null,
            popUp: null
        };
    }

    render() {
        return (
            <div className={'eProfileContainer'}>
                <div className={"eProfileText"}>Edit profile</div>
                <Logo class={"eProfileLogo"} width={"8rem"} height={"8rem"}/>
                <InputField class={"eProfile-Input eProfile-Left"} onChange={this.updateName} type={"text"}
                            value={this.state.name} placeholder={"Name"} width={"100%"}/>
                <InputField class={"eProfile-Input"} onChange={this.updateSurname} type={"text"}
                            value={this.state.surname} placeholder={"Surname"} width={"100%"}/>
                <InputField class={"eProfile-Input eProfile-Left"} onChange={this.updateUsername} type={"text"}
                            value={this.state.username} placeholder={"Username"} width={"100%"}/>
                <InputField class={"eProfile-Input"} onChange={this.updateEmail} type={"text"}
                            value={this.state.email} placeholder={"Email"} width={"100%"}/>
                <InputField class={"eProfile-Input eProfile-Left"} onChange={this.updateAddress} type={"text"}
                            value={this.state.address} placeholder={"Adress"} width={"100%"}/>
                <InputField class={"eProfile-Input"} onChange={this.updatePhoneNumber} type={"text"}
                            value={this.state.phoneNumber} placeholder={"Phone Number"} width={"100%"}/>
                <InputField class={"eProfile-Input eProfile-Bios"} onChange={this.updateShortBios} type={"area"}
                            value={this.state.bios} placeholder={"Bios"} width={"100%"} height={"8rem"}/>
                <div className={'eProfileContainerBT'}>
                    <Button color={'red'} clickHandler={this.popUp} text={"Delete profile"} width={"12rem"}/>
                    <Button clickHandler={this.saveChanges} text={"Save changes"} width={"13rem"}/>
                    <Button color={'orange'} clickHandler={this.cancelChanges} text={"Cancel changes"} width={"14rem"}/>
                </div>
                {this.state.popUp}
            </div>
        );
    }

    popUp = () => {
        this.setState({
            popUp: (<DeleteProfile type={"password"} call={"your profile?"} dynamic={"profile"}
                                   message={"Passwords do not match"}
                                   deleteClickHandler={this.deleteProfileConfirmed}
                                   cancelClickHandler={this.removeMessage} width={"20rem"}/>)
        });
    };

    removeMessage = () => {
        this.setState({popUp: null});
    };

    saveChanges = () => {
        const url = 'http://localhost:8090/updatePerson';
        axios({
            method: 'post',
            url: url,
            data: this.getUserData()
        })
            .then(response => {
                if (response.status === 200) {
                    this.props.clickHandler(9, <ProfileForm userId={this.props.userId}
                                                            stateUpdater={this.props.stateUpdater} clickHandler={this.props.clickHandler} />)
                }
            })
            .catch(err => console.log(err))
    };

    getUserData = () => {
        return {
            id: this.props.userId,
            username: this.state.username,
            name: this.state.name,
            surname: this.state.surname,
            email: this.state.email,
            address: this.state.address,
            phoneNumber: this.state.phoneNumber,
            shortBios: this.state.bios,
        };
    };

    deleteProfileConfirmed = () => {
        console.log("user id: " + this.props.userId);
        const url = 'http://localhost:8090/deleteUser';
        axios({
            method: 'post',
            url: url,
            params: {
                id: this.props.userId
            }
        })
            .then(this.props.stateUpdater({currentPage: (<LoginForm stateUpdater={this.props.stateUpdater}/>)}))
            .catch(err => console.log(err))
    };

    cancelChanges = () => {
        this.props.clickHandler(9, <ProfileForm userId={this.props.userId} stateUpdater={this.props.stateUpdater}/>);
    };

    updateName = (e) => {
        this.setState({name: e.target.value});
    };

    updateSurname = (e) => {
        this.setState({surname: e.target.value});
    };

    updateUsername = (e) => {
        this.setState({username: e.target.value});
    };

    updateEmail = (e) => {
        this.setState({email: e.target.value});
    };

    updateAddress = (e) => {
        this.setState({address: e.target.value});
    };

    updatePhoneNumber = (e) => {
        this.setState({phoneNumber: e.target.value});
    };

    updateShortBios = (e) => {
        this.setState({bios: e.target.value});
    };
}

export default EditProfileForm;