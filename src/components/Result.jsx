import './Result.css'

export default function Result(){
    const formData = JSON.parse(sessionStorage.getItem('formData'))
    return (
        <div className="result_con">
            <span>Attributes</span><span>Values</span>
            <span>First Name</span><span>{formData.f_name}</span>
            <span>Last Name</span><span>{formData.l_name}</span>
            <span>User Name</span><span>{formData.user_name}</span>
            <span>Password</span><span>{formData.password}</span>
            <span>Email</span><span>{formData.email}</span>
            <span>Phone Number</span><span>{formData.country_code} {formData.phone}</span>
            <span>Pan Number</span><span>{formData.pan}</span>
            <span>Aadhar Number</span><span>{formData.aadhar}</span>
            <span>Country</span><span>{formData.country}</span>
            <span>City</span><span>{formData.city}</span>
            
        </div>


    )
}