import React from 'react'
import background from '../../../img/background.jpg'
import Preloader from '../../common/preloader/Preloader'
import classes from '../Profile.module.css'
import user from '../../../img/User.png'
import ProfileStatus from './ProfileStatus'

let ProfileInfo = (props) => {
    return (
        <>
            <div className={classes.col}>
                <img src={background} alt='background'></img>
            </div>

            <div className={classes.col__other + ' ' + classes.infoPanel}>
                {
                    props.profile === null ? <Preloader /> : 
                    <>
                    <div className={classes.avatar}>
                        <img src={props.profile.photo !== null ? props.profile.photo : user} alt={'avatar'}/>
                    </div>
                    <div className={classes.mainInfo}>
                        <ul>
                            <li><div>{props.profile.fullName}</div></li>
                            <li><ProfileStatus  status={props.profile.status} updateStatusText={props.updateStatusText} 
                                                changeStatus={props.changeStatus} currentUser={props.currentUser}
                                                requestedUser={props.profile.userId}/></li>
                            <li>{props.profile.lookingForAJob ? <div>Ищет работу</div> : <div>Не ищет работу</div>}</li>
                            {props.profile.lookingForAJobDescription !== null && <li><div>{props.profile.lookingForAJobDescription}</div></li>}
                        </ul>
                        
                    </div>
                    <div className={classes.contacts}>
                        <div style={{fontWeight:'bold'}}>Контакты</div>
                        <div>github: <a href={props.profile.contacts.github}>{props.profile.contacts.github}</a></div>
                        <div>vk: <a href={props.profile.contacts.vk}>{props.profile.contacts.vk}</a></div>
                        <div>facebook: <a href={props.profile.contacts.facebook}>{props.profile.contacts.facebook}</a></div>
                        <div>instagram: <a href={props.profile.contacts.instagram}>{props.profile.contacts.instagram}</a></div>
                        <div>twitter: <a href={props.profile.contacts.twitter}>{props.profile.contacts.twitter}</a></div>
                        <div>website: <a href={props.profile.contacts.website}>{props.profile.contacts.website}</a></div>
                        <div>youtube: <a href={props.profile.contacts.youtube}>{props.profile.contacts.youtube}</a></div>
                    </div>
                    </>
                }
            </div>
        </>
    )
}

export default ProfileInfo