import React, {Component} from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import {  compose } from 'redux';
import { toastr } from 'react-redux-toastr';
import Dropzone from 'react-dropzone';
import Cropper from 'react-cropper';
import {Image, Segment, Header, Divider, Grid, Button, Card, Icon} from 'semantic-ui-react';
import 'cropperjs/dist/cropper.css';
import { uploadProfileImage, deletePhoto, setMainPhoto } from '../userActions';



const query = ({ auth }) => {
    return [
        {
            collection: 'users',
            doc:auth.uid,
            subcollections: [{collection: 'photos'}],
            storeAs: 'photos'  
        }
    ]
}



const mapDispatchToProps = {
    uploadProfileImage,
    deletePhoto,
    setMainPhoto
}

const mapStateToProps = (state) => ({
    auth: state.firebase.auth,
    profile:state.firebase.profile,
    photos: state.firestore.ordered.photos,
    loading: state.async.loading
})


class PhotosPage extends Component {


    state = {
        files: [],
        fileName: '',
        cropResult: null,
        mage: {}
    }


//method to drop image/upload image
    onDrop = (files) => {
        this.setState({
            files,
            fileName: files[0].name
        })
    }


    //method to crop image
    cropImage = () => {
        if(typeof this.refs.cropper.getCroppedCanvas() === 'undefined') {
            return;
        }
        this.refs.cropper.getCroppedCanvas().toBlob(blob => {
            let imageUrl = URL.createObjectURL(blob);
            this.setState({
                cropResult: imageUrl,
                image:blob
            })
        }, 'image/jpeg');
    }


    //method to upload the image to firebase/firestore on our app
    uploadImage = async () => {
        try {
            await this.props.uploadProfileImage(this.state.image, this.state.fileName);
            this.cancelCrop();
            toastr.success('Success!', 'Photo has been uploaded');
        }catch(error) {
            toastr.error('Oops!', error.message);
        }
    }

//method to delete photo
    handleDeletePhoto = (photo) => async () => {
        try {
           await this.props.deletePhoto(photo);
        }catch(error){
            toastr.error(error.message);
        }
    }

    //method to setmain photo
    handleSetMainPhoto = (photo) => async () => {
        try {
            await this.props.setMainPhoto(photo);
         }catch(error){
             toastr.error(error.message);
         }
    }


    //method to cancel photo upload 
    cancelCrop = () => {
        this.setState({
            files:[],
            image: {}
        })
    }


    render() {
        const { profile, photos, loading } = this.props;
        return (
            <Segment>
                <Header dividing size='large' content='Your Photos' />
                <Grid>
                    <Grid.Row />
                    <Grid.Column width={4}>
                        <Header color='teal' sub content='Step 1 - Add Photo'/>
                        <Dropzone onDrop={this.onDrop} multiple={false}>
                             <div style={{paddingTop:'30px', textAlign:"center"}}>
                                <Icon name="upload" size="huge"/>
                                <Header content="Drag photo here or click to add photo"/>
                            </div>
                        </Dropzone>
                    </Grid.Column>
                    <Grid.Column width={1} />
                    <Grid.Column width={4}>
                        <Header sub color='teal' content='Step 2 - Resize image' />

                         
                        {this.state.files[0] &&
                        <Cropper
                        style={{height:'200px',width:'100%'}}
                        ref='cropper'
                        src={this.state.files[0].preview}
                        aspectRatio={1}
                        viewMode={0}
                        dragMode="move"
                        guides={false}
                        scalable={true}
                        cropBoxMovable={true}
                        cropBoxResizable={true}
                        crop={this.cropImage}
                        
                        />  }


                    </Grid.Column>
                    <Grid.Column width={1} />
                    <Grid.Column width={4}>
                        <Header sub color='teal' content='Step 3 - Preview and Upload' />

                        {this.state.files[0] && 
                            <div>
                                <Image style={{minHeight:'200px', minWidth:'200px'}} src={this.state.cropResult} />
                           
                                    
                        
                                <div  className='ui two buttons'>
                                    <Button loading={loading} onClick={this.uploadImage} style={{width: '100px'}} positive icon='check' />
                                    <Button disabled={loading} onClick={this.cancelCrop} style={{width: '100px'}}  icon='close' />
                                </div>
                            </div>
                        }

                    </Grid.Column>

                </Grid>

                <Divider/>
                <Header sub color='teal' content='All Photos'/>

                <Card.Group itemsPerRow={5}>
                    <Card>
                        <Image src={profile.photoURL || 'assets/user.png'} />
                        <Button positive>Main Photo</Button>
                    </Card>

                        {photos && photos.map((photo) => (
                            <Card key={photo.id}>
                                <Image
                                    src={photo.url}
                                />
                                <div className='ui two buttons'>
                                    <Button loading={loading} onClick={this.handleSetMainPhoto(photo)} basic color='green'>Main</Button>
                                    <Button onClick={this.handleDeletePhoto(photo)} basic icon='trash' color='red' />
                                </div>
                        </Card>
                        ))}
                </Card.Group>
            </Segment>
        );
    }
}

export default compose(
    connect(mapStateToProps,mapDispatchToProps),
    firestoreConnect(auth => query(auth))
)(PhotosPage);