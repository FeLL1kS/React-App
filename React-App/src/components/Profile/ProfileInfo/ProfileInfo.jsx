import React from 'react'
import Preloader from '../../common/preloader/Preloader'
import classes from '../Profile.module.css'
import user from '../../../img/User.png'
import ProfileStatusWithHooks from './ProfileStatusWithHooks'
import { NavLink } from 'react-router-dom'

let ProfileInfo = (props) => {
    
    let savePhoto = e => {
        if(e.target.files.length) {
            props.savePhoto(e.target.files[0])
        }
    }

    let isOwner = props.profile.userId === props.currentUser
    
    if(!props.profileIsLoaded) return <div className="preloader"><Preloader /></div>
    
    return (
        <>
            <div className={classes.profileInfo + ' ' + classes.infoPanel}>
                { 
                    <>
                    <div className={classes.avatar}>
                        {isOwner && <>
                                        <span className={classes.mask}/>
                                        <div className={classes.fileUpload}>
                                            <label className={classes.label}>
                                                <i className="fa fa-upload" aria-hidden="true"></i>
                                                <span className={classes.title}>Обновить фотографию</span>
                                                <input type="file" onChange={savePhoto}/>
                                            </label>
                                        </div>
                                    </>}
                        <img src={props.profile.photo !== null ? props.profile.photo : user} alt={'avatar'}/>
                    </div>
                    <ProfileData userId={props.profile.userId} profile={props.profile} updateStatusText={props.updateStatusText} changeStatus={props.changeStatus} isOwner={isOwner}/>
                    </>
                }
            </div>
        </>
    )
}

const ProfileData = ({profile, updateStatusText, changeStatus, isOwner, userId}) => {
    return  (
    <>
        {isOwner && <NavLink to='edit'>Edit</NavLink>}
        {!isOwner && <NavLink to={`../dialogs/${userId}`}>Написать</NavLink>}
        <div className={classes.mainInfo}>
            <ul>
                <li><div>{profile.fullName}</div></li>
                <li><ProfileStatusWithHooks  status={profile.status} updateStatusText={updateStatusText} 
                                            changeStatus={changeStatus} isOwner={isOwner}/></li>
                <li>{profile.lookingForAJob ? <div>Ищет работу</div> : <div>Не ищет работу</div>}</li>
                {profile.lookingForAJobDescription !== null && <li><div>{profile.lookingForAJobDescription}</div></li>}
            </ul>
            
        </div>
        <div className={classes.contacts}>
            <div style={{fontWeight:'bold'}}>Контакты</div>
            {Object.keys(profile.contacts).map(key => {
                return key !== 'id' &&
                <Contact key={key} contactKey={key} contactValue={profile.contacts[key]}/>
            })}
        </div>
    </>)
}

const Contact = ({contactKey, contactValue}) => {
    return <div>{contactKey}: <a href={contactValue}>{contactValue}</a></div>
}


export default ProfileInfo