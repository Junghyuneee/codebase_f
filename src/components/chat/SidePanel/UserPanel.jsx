import { useRef } from 'react'
import { IoIosChatboxes } from 'react-icons/io'
import Dropdown from 'react-bootstrap/Dropdown';
import Image from 'react-bootstrap/Image'
import { useDispatch, useSelector } from 'react-redux'
import firebase from '../../../firebase'
import { setPhotoURL } from '../../../redux/actions/user_action'
// import mime from 'mime-types'

const UserPanel = () => {

    const inputOpenImageRef = useRef();
    const user = useSelector(state => state.user.currentUser)
    const dispatch = useDispatch();

    // console.log('userpanel', user)

    const handleLogout = () => {
        firebase.auth().signOut();
    }

    const handleOpenImageRef = () => {
        inputOpenImageRef.current.click();
    }

    const handleUploadImage = async (event) => {
        console.log(event);
        const file = event.target.files[0];
        if (!file) return;
        const metadata = { contentType: file.type };
        // const metadata = {contentType: mime.lookup(file.name)};

        try {
            let uploadTaskSnapshot = await firebase.storage().ref()
                .child(`user_image/${user.uid}`)
                .put(file, metadata)
            let downloadURL = await uploadTaskSnapshot.ref.getDownloadURL();

            // 프로필 이미지 수정
            await firebase.auth().currentUser.updateProfile({
                photoURL: downloadURL
            })

            dispatch(setPhotoURL(downloadURL))

            await firebase.database().ref("users")
                .child(user.uid)
                .update({image: downloadURL})

            console.log('uploadtask', uploadTaskSnapshot)
        }
        catch (error) {
            console.log(error);
        }


    }

    return (
        <div>
            <h3 style={{ color: 'white' }}>
                <IoIosChatboxes />{" "} Chat App
            </h3>
            <div style={{ display: 'flex', marginBottom: '1rem' }}>
                <Image src={user && user.photoURL} roundedCircle
                       style={{ width: '30p', height: '30px', marginTop: '3px' }} />
                <Dropdown>
                    <Dropdown.Toggle
                        style={{ background: 'transparent', border: '0px' }}
                        id="dropdown-basic">
                        {user && user.displayName}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item onClick={handleOpenImageRef}>
                            프로필 사진 변경
                        </Dropdown.Item>
                        <Dropdown.Item onClick={handleLogout}>
                            로그아웃
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>

            <input type="file" accept="image/jpeg, image/png" ref={inputOpenImageRef} style={{ display: 'none' }} onChange={handleUploadImage} />


        </div>
    )
}

export default UserPanel