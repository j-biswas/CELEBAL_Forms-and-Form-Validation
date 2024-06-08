import { useEffect, useState } from 'react'
import TextField, { PhoneNumberField, Select } from './TextField'
import styles from './Form.module.css'
import Button from './Button'

function Form() {
	const [formData, setFormData] = useState({
		f_name: "",
		l_name: "",
		user_name: "",
		email: "",
		password: "",
		country_code: "+91",
		phone: "",
		pan: "",
		aadhar: "",

		country: "India",
		city: ""
	})

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		})
	}


	const [countryList, setCountryList] = useState([])
	const [cityList, setCityList] = useState([]);

	useEffect(() => {
		console.log(formData.country)
		fetch('https://countriesnow.space/api/v0.1/countries/cities', {
			method: "post",
			body: JSON.stringify({ country: formData.country || "india" }),
			headers: {
				"Content-Type": "application/json",

			},
		})
			.then(res => {
				if (res.status == 200) return res.json()
				else {
					alert("No city found in the country ")
					setCityList([])
					return
				}
			})
			.then(Data => {
				setCityList(Data.data)
			})
	}, [formData.country])

	useEffect(() => {
		fetch('https://countriesnow.space/api/v0.1/countries/capital', {
			method: "get",
		})
			.then(res => res.json())
			.then(Data => {
				setCountryList(Data.data)
			})
	}, [])





	const handleSubmit = (e) => {
		e.preventDefault()
		console.log(formData)
		sessionStorage.setItem('formData', JSON.stringify(formData))
		window.location.pathname = "/result";
	}

	return (
		<>
			<div className={styles.form_con}>
				<h2>FILL UP THE FORM</h2>
				<form onSubmit={handleSubmit}>
					<TextField label={"First Name"} name="f_name" value={formData.f_name} onChange={handleChange} required />
					<TextField label={"Last Name"} name="l_name" value={formData.l_name} onChange={handleChange} required />
					<TextField label={"User Name"} name="user_name" value={formData.user_name} onChange={handleChange} required />
					<TextField
						label={"Email"}
						name="email"
						value={formData.email}
						onChange={handleChange}
						type={"email"}
						title={"Enter valid Email address"}
						required
					/>

					<TextField label={"Password"} type="password" name="password" value={formData.password} onChange={handleChange} required />
					<PhoneNumberField
						label={"Phone Number"}
						name="phone"
						value={formData.phone}
						countryCode={formData.country_code}
						onChange={handleChange}
						onChangeCC={(e) => { setFormData({ ...formData, country_code: e.target.value }) }}
						pattern={"^[0-9]{10}$"}
						title={"Enter valid phone Number"}
						required
					/>
					<Select label={"country"} name="country" value={formData.country} onChange={handleChange} required >
						{countryList.map((e, i) => {
							return <option key={i} value={e.name}> {e.name}  </option>
						})}
					</Select>
					<Select label={"city"} name="city" value={formData.city} onChange={handleChange} required>
						{cityList.map((e, i) => {
							return <option key={i} value={e}> {e}  </option>
						})}
					</Select>

					<TextField label={"Pan Number"} name="pan" value={formData.pan} onChange={handleChange} required />
					<TextField
						label={"Aadhar No"}
						name="aadhar"
						value={formData.aadhar}
						onChange={handleChange}
						pattern={"^[0-9]{12}$"}
						title={"Enter valid Aadhar Number"}
						required
					/>

					<Button type='submit'>SUBMIT</Button>

				</form>
			</div>

		</>
	)
}

export default Form
