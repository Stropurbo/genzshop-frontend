import React, { useEffect, useState } from 'react';
import ProfileForm from '../components/Dashboard/Profile/ProfileForm';
import { useForm } from 'react-hook-form';
import ProfileEdit from '../components/Dashboard/Profile/ProfileEdit';
import PasswordChangeForm from '../components/Dashboard/Profile/PasswordChangeForm';
import useAuthContext from '../hooks/useAuthContext';
import ErrorAlert from '../components/ErrorAlert';

const Profile = () => {
    const [isEditing, setIsEditing] = useState(false)
    const {user, updateUserProfile, passwordChange, errMsg} = useAuthContext();
    const {register, watch, setValue, handleSubmit,formState:{errors, isSubmitting}} = useForm()
    const [errSuccess, setSuccess] = useState('')

    useEffect(() => {
		if (user && typeof user === 'object') {
			Object.keys(user).forEach((key) => setValue(key, user[key]))
		}
	}, [user, setValue])


    const onSubmit = async(data) => {
        try {
            // profile update
            const profilePayload = {
				first_name: data.first_name,
				last_name: data.last_name,
				address: data.address,
				phone_number: data.phone_number,
				email: data.email,
				profile_image: data.profile_image,
			}
            
            const result = await updateUserProfile(profilePayload)

            if (result.success) {
				setSuccess('Profile updated successfully!')
				setTimeout(() => {
					window.location.reload()
				}, 800) 
			}

            // password change
            if (data.current_password && data.new_password) {
                await passwordChange({
                    current_password: data.current_password, 
                    new_password: data.new_password,
                })
            }
            
        } catch (error) {
            console.log(error);
        }
    }


    return (
		<div className="card w-full max-w-2xl mx-auto bg-base-100 shadow-xl m-8">
			<div className="card-body">
				{errSuccess && (
					<p className="text-green-600 text-sm mb-2 p-5 bg-green-100 px-2 py-1 rounded">
						{errSuccess}
					</p>
				)}

				{errMsg && <ErrorAlert errormessage={errMsg} />}
				<h2 className="card-title text-2xl mb-4">Profile Information</h2>

				<form onSubmit={handleSubmit(onSubmit)}>
					<ProfileForm
						register={register}
						errors={errors}
						isEditing={isEditing}
					/>
					<PasswordChangeForm
						errors={errors}
						register={register}
						isEditing={isEditing}
						watch={watch}
					/>
					<ProfileEdit
						isEditing={isEditing}
						setIsEditing={setIsEditing}
						isSubmitting={isSubmitting}
					/>
				</form>
			</div>
		</div>
	)
};

export default Profile;
